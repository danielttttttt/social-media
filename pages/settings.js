import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersApi, handleApiError, authApi } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Toast from '../components/ui/Toast';

export default function SettingsPage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  const router = useRouter();
  const path = router.pathname;
  const section = path.startsWith('/settings/') ? path.split('/').pop() : '';
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState(null);

  // Profile
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [directMessages, setDirectMessages] = useState('everyone');
  const [blockedUsers, setBlockedUsers] = useState([]);

  // Preferences
  const [likesNotif, setLikesNotif] = useState(true);
  const [commentsNotif, setCommentsNotif] = useState(true);
  const [messagesNotif, setMessagesNotif] = useState(true);
  const [language, setLanguage] = useState('en');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setProfilePic(user.profilePic || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
      setProfileVisibility(user.privacy?.profileVisibility || 'public');
      setDirectMessages(user.privacy?.directMessages || 'everyone');
      setBlockedUsers(user.privacy?.blockedUsers || []);
      setLikesNotif(user.prefs?.notifications?.likes ?? true);
      setCommentsNotif(user.prefs?.notifications?.comments ?? true);
      setMessagesNotif(user.prefs?.notifications?.messages ?? true);
      setLanguage(user.prefs?.language || 'en');
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <Link href="/" className="btn-secondary px-3 py-2">Back to Home</Link>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Please sign in to manage your settings.</p>
      </div>
    );
  }

  const notify = (type, text) => setMessage({ type, text });

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSavingProfile(true);
    try {
      let profilePicToSave = profilePic;
      if (profilePicFile) {
        // Convert to data URL for demo; in real app, upload to storage and save URL
        if (!profilePicFile.type.startsWith('image/')) {
          notify('error', 'Please select a valid image file.');
          setSavingProfile(false);
          return;
        }
        profilePicToSave = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(profilePicFile);
        });
      }
      const res = await usersApi.updateProfile({ name, profilePic: profilePicToSave, username, email, bio, phone });
      if (res.success) {
        updateUser(res.user);
        notify('success', 'Profile updated successfully.');
        await router.replace('/profile');
      } else {
        notify('error', res.error || 'Failed to update profile.');
      }
    } catch (err) {
      const e = handleApiError(err);
      notify('error', e.general || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const savePrivacy = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSavingPrivacy(true);
    try {
      const res = await usersApi.updateProfile({ privacy: { profileVisibility, directMessages, blockedUsers } });
      if (res.success) {
        updateUser(res.user);
        notify('success', 'Privacy settings saved.');
      } else {
        notify('error', res.error || 'Failed to save privacy settings.');
      }
    } catch (err) {
      const e = handleApiError(err);
      notify('error', e.general || 'Failed to save privacy settings.');
    } finally {
      setSavingPrivacy(false);
    }
  };

  const savePreferences = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSavingPrefs(true);
    try {
      const themePref = isDark ? 'dark' : 'light';
      const res = await usersApi.updateProfile({
        prefs: {
          theme: themePref,
          language,
          notifications: { likes: likesNotif, comments: commentsNotif, messages: messagesNotif },
        },
      });
      if (res.success) {
        updateUser(res.user);
        notify('success', 'Preferences saved.');
      } else {
        notify('error', res.error || 'Failed to save preferences.');
      }
    } catch (err) {
      const e = handleApiError(err);
      notify('error', e.general || 'Failed to save preferences.');
    } finally {
      setSavingPrefs(false);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword !== confirmPassword) {
      notify('error', 'New password and confirmation do not match.');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      notify('error', 'New password must be at least 8 characters.');
      return;
    }
    setChangingPassword(true);
    try {
      const res = await usersApi.changePassword(currentPassword, newPassword);
      if (res.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        notify('success', 'Password changed successfully.');
        await router.replace('/profile');
      } else {
        notify('error', res.error || 'Failed to change password.');
      }
    } catch (err) {
      const e = handleApiError(err);
      notify('error', e.general || 'Failed to change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const logoutEverywhere = async () => {
    try {
      const res = await authApi.post ? authApi.post('/auth/logout-all') : fetch('/api/auth/logout-all', { method: 'POST' });
      notify('success', 'Logged out from all sessions (demo).');
    } catch {
      notify('error', 'Failed to logout everywhere.');
    }
  };

  // Root settings index
  if (!section && path === '/settings') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <Link href="/" className="btn-secondary px-3 py-2">Back to Home</Link>
        </div>
        <Toast type={message?.type} message={message?.text} onClose={() => setMessage(null)} />
        <div className="grid grid-cols-1 gap-4">
          <Link href="/settings/profile" className="card-bg border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">Profile</Link>
          <Link href="/settings/account" className="card-bg border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">Account & Security</Link>
          <Link href="/settings/privacy" className="card-bg border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">Privacy</Link>
          <Link href="/settings/preferences" className="card-bg border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">Preferences</Link>
        </div>
      </div>
    );
  }

  // Section pages
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold capitalize">{section}</h1>
        <div className="flex items-center gap-2">
          <Link href="/settings" className="btn-secondary px-3 py-2">All Settings</Link>
          <Link href="/" className="btn-secondary px-3 py-2">Home</Link>
        </div>
      </div>

      <Toast type={message?.type} message={message?.text} onClose={() => setMessage(null)} />

      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link href="/settings/profile" className={`px-3 py-1.5 rounded-md ${section==='profile'?'bg-blue-600 text-white':'bg-gray-200 dark:bg-gray-700'}`}>Profile</Link>
        <Link href="/settings/account" className={`px-3 py-1.5 rounded-md ${section==='account'?'bg-blue-600 text-white':'bg-gray-200 dark:bg-gray-700'}`}>Account</Link>
        <Link href="/settings/privacy" className={`px-3 py-1.5 rounded-md ${section==='privacy'?'bg-blue-600 text-white':'bg-gray-200 dark:bg-gray-700'}`}>Privacy</Link>
        <Link href="/settings/preferences" className={`px-3 py-1.5 rounded-md ${section==='preferences'?'bg-blue-600 text-white':'bg-gray-200 dark:bg-gray-700'}`}>Preferences</Link>
      </div>

      <div className="space-y-8">
        {/* Profile */}
        {section === 'profile' && (
        <form onSubmit={saveProfile} className="card-bg rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium mb-4">Profile</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Profile picture</span>
              <input type="file" accept="image/*" onChange={(e) => setProfilePicFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
            </label>
            {/* Removed URL input for better UX */}
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Display name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Username / Handle</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Bio</span>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" rows={3} />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Phone number</span>
              <input value={phone} onChange={(e) => {
                const onlyDigits = e.target.value.replace(/[^0-9+\-\s]/g, '');
                setPhone(onlyDigits);
              }} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
          </div>
          <div className="mt-4">
            <button disabled={savingProfile} className="btn-primary px-4 py-2">
              {savingProfile ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
        )}

        {/* Account & Security */}
        {section === 'account' && (
        <form onSubmit={submitPassword} className="card-bg rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium mb-4">Account & Security</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Current password</span>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">New password</span>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Confirm new password</span>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button disabled={changingPassword} className="btn-primary px-4 py-2">
              {changingPassword ? 'Changing...' : 'Change password'}
            </button>
            <button type="button" onClick={logoutEverywhere} className="btn-secondary px-4 py-2">Logout everywhere</button>
          </div>
        </form>
        )}

        {/* Preferences */}
        {section === 'preferences' && (
        <form onSubmit={savePreferences} className="card-bg rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium mb-4">Preferences</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setTheme('light')} className={`px-3 py-1 rounded-md ${!isDark ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Light</button>
                <button type="button" onClick={() => setTheme('dark')} className={`px-3 py-1 rounded-md ${isDark ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Dark</button>
                <button type="button" onClick={toggleTheme} className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700">Toggle</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={likesNotif} onChange={(e) => setLikesNotif(e.target.checked)} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notifications for likes</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={commentsNotif} onChange={(e) => setCommentsNotif(e.target.checked)} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notifications for comments</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={messagesNotif} onChange={(e) => setMessagesNotif(e.target.checked)} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notifications for messages</span>
              </label>
            </div>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Language</span>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </label>
          </div>
          <div className="mt-4">
            <button disabled={savingPrefs} className="btn-primary px-4 py-2">
              {savingPrefs ? 'Saving...' : 'Save preferences'}
            </button>
          </div>
        </form>
        )}

        {/* Privacy */}
        {section === 'privacy' && (
        <form onSubmit={savePrivacy} className="card-bg rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium mb-4">Privacy</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Profile visibility</span>
              <select value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                <option value="public">Public</option>
                <option value="friends">Friends only</option>
                <option value="private">Only me</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300">Who can message me</span>
              <select value={directMessages} onChange={(e) => setDirectMessages(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                <option value="everyone">Everyone</option>
                <option value="followers">Friends only</option>
                <option value="no_one">No one</option>
              </select>
            </label>
            <div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Blocked users</div>
              {blockedUsers.length === 0 ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">No blocked users</div>
              ) : (
                <ul className="space-y-2">
                  {blockedUsers.map((u) => (
                    <li key={u} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{u}</span>
                      <button type="button" className="btn-secondary px-2 py-1" onClick={() => setBlockedUsers(blockedUsers.filter(b => b !== u))}>Unblock</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button disabled={savingPrivacy} className="btn-primary px-4 py-2">
              {savingPrivacy ? 'Saving...' : 'Save privacy'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}


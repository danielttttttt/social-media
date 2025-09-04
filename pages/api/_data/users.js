let users = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@campus.edu',
    password: 'password123',
    name: 'Demo User',
    profilePic: 'https://i.pravatar.cc/150?u=demo@campus.edu',
    bio: 'Hi, I am a demo user at Campus Connect.',
    phone: '',
    privacy: {
      profileVisibility: 'public',
      directMessages: 'everyone',
      blockedUsers: [],
    },
    prefs: {
      theme: 'system',
      notifications: { likes: true, comments: true, messages: true },
      language: 'en',
    },
  },
];

let nextUserId = 2;

export const getUsersStore = () => users;
export const setUsersStore = (next) => { users = next; };
export const getNextUserId = () => nextUserId++;

export const findUserById = (id) => users.find(u => u.id === id);
export const findUserByEmailOrUsername = (emailOrUsername) => users.find(u => u.email === emailOrUsername || u.username === emailOrUsername);


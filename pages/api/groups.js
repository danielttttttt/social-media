// Mock data for groups
const groups = [
  {
    id: 1,
    name: 'Computer Science Study Group',
    description: 'A collaborative study group for computer science students. We meet weekly to discuss coursework, share resources, and work on projects together.',
    category: 'Academic',
    location: 'Library Room 204',
    meetingSchedule: 'Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Sarah Johnson',
    adminProfilePic: 'https://i.pravatar.cc/150?u=sarah_johnson',
    members: 24,
    isJoined: false,
    createdAt: '2023-08-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Campus Basketball League',
    description: 'Join our competitive basketball league! Open to all skill levels. We play every Tuesday and Thursday evening at the campus gym.',
    category: 'Sports',
    location: 'Campus Gymnasium',
    meetingSchedule: 'Bi-weekly',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Mike Chen',
    adminProfilePic: 'https://i.pravatar.cc/150?u=mike_chen',
    members: 18,
    isJoined: true,
    createdAt: '2023-08-20T14:30:00Z'
  },
  {
    id: 3,
    name: 'Photography Club',
    description: 'Capture the beauty of campus life and beyond! We organize photo walks, workshops, and exhibitions. Perfect for beginners and experienced photographers.',
    category: 'Arts',
    location: 'Art Building Studio 3',
    meetingSchedule: 'Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Emma Wilson',
    adminProfilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
    members: 31,
    isJoined: false,
    createdAt: '2023-07-10T09:15:00Z'
  },
  {
    id: 4,
    name: 'Robotics and AI Society',
    description: 'Explore the future of technology! We build robots, discuss AI developments, and participate in competitions. Join us to innovate and learn.',
    category: 'Technology',
    location: 'Engineering Lab 101',
    meetingSchedule: 'Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'David Lee',
    adminProfilePic: 'https://i.pravatar.cc/150?u=david_lee',
    members: 42,
    isJoined: false,
    createdAt: '2023-09-01T16:45:00Z'
  },
  {
    id: 5,
    name: 'International Students Network',
    description: 'A welcoming community for international students and those interested in global cultures. We organize cultural events, language exchanges, and social gatherings.',
    category: 'Social',
    location: 'Student Center Lounge',
    meetingSchedule: 'Monthly',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Maria Garcia',
    adminProfilePic: 'https://i.pravatar.cc/150?u=maria_garcia',
    members: 67,
    isJoined: true,
    createdAt: '2023-08-05T11:20:00Z'
  },
  {
    id: 6,
    name: 'Campus Volunteer Corps',
    description: 'Make a difference in our community! We organize volunteer activities, charity drives, and community service projects. Every contribution counts.',
    category: 'Volunteer',
    location: 'Community Center',
    meetingSchedule: 'Bi-weekly',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Alex Rodriguez',
    adminProfilePic: 'https://i.pravatar.cc/150?u=alex_rodriguez',
    members: 89,
    isJoined: false,
    createdAt: '2023-07-25T13:10:00Z'
  },
  {
    id: 7,
    name: 'Drama and Theater Society',
    description: 'Lights, camera, action! Join our theater group to participate in plays, musicals, and drama workshops. All levels of experience welcome.',
    category: 'Arts',
    location: 'Theater Hall',
    meetingSchedule: 'Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'Lisa Park',
    adminProfilePic: 'https://i.pravatar.cc/150?u=lisa_park',
    members: 28,
    isJoined: false,
    createdAt: '2023-08-12T15:30:00Z'
  },
  {
    id: 8,
    name: 'Entrepreneurship Club',
    description: 'Turn your ideas into reality! We support aspiring entrepreneurs with mentorship, networking events, and startup competitions.',
    category: 'Academic',
    location: 'Business Building Room 305',
    meetingSchedule: 'Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    admin: 'James Wilson',
    adminProfilePic: 'https://i.pravatar.cc/150?u=james_wilson',
    members: 35,
    isJoined: false,
    createdAt: '2023-09-03T10:45:00Z'
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(groups);
    }, 500);
  } else if (req.method === 'POST') {
    // Create new group
    const { name, description, category, location, meetingSchedule, imageUrl, admin, adminProfilePic } = req.body;
    
    if (!name || !description || !category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const newGroup = {
      id: Date.now(),
      name,
      description,
      category,
      location: location || null,
      meetingSchedule: meetingSchedule || null,
      imageUrl: imageUrl || null,
      admin: admin || 'Current User',
      adminProfilePic: adminProfilePic || 'https://i.pravatar.cc/150?u=current_user',
      members: 1,
      isJoined: true,
      createdAt: new Date().toISOString()
    };

    // In a real app, this would save to database
    groups.unshift(newGroup);
    res.status(201).json(newGroup);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

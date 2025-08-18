// Mock data for individual group details
// We'll fetch the base groups data from the main groups API

// Extended mock data for group members and activity
const extendedGroupData = {
  1: {
    membersList: [
      {
        id: 'sarah_johnson',
        name: 'Sarah Johnson',
        profilePic: 'https://i.pravatar.cc/150?u=sarah_johnson',
        role: 'Admin',
        joinedAt: '2023-08-15T10:00:00Z',
        isOnline: true,
        bio: 'Computer Science major, passionate about algorithms and data structures.'
      },
      {
        id: 'mike_davis',
        name: 'Mike Davis',
        profilePic: 'https://i.pravatar.cc/150?u=mike_davis',
        role: 'Member',
        joinedAt: '2023-08-16T14:30:00Z',
        isOnline: false,
        bio: 'Software Engineering student, loves coding challenges.'
      },
      {
        id: 'emma_wilson',
        name: 'Emma Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
        role: 'Member',
        joinedAt: '2023-08-17T09:15:00Z',
        isOnline: true,
        bio: 'AI/ML enthusiast, working on research projects.'
      },
      {
        id: 'alex_chen',
        name: 'Alex Chen',
        profilePic: 'https://i.pravatar.cc/150?u=alex_chen',
        role: 'Moderator',
        joinedAt: '2023-08-18T11:45:00Z',
        isOnline: false,
        bio: 'Teaching assistant, here to help with coursework.'
      },
      {
        id: 'lisa_park',
        name: 'Lisa Park',
        profilePic: 'https://i.pravatar.cc/150?u=lisa_park',
        role: 'Member',
        joinedAt: '2023-08-20T13:20:00Z',
        isOnline: true,
        bio: 'Full-stack developer, loves web technologies.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'post',
        author: 'Sarah Johnson',
        authorId: 'sarah_johnson',
        authorPic: 'https://i.pravatar.cc/150?u=sarah_johnson',
        content: 'Don\'t forget about our study session tomorrow at 3 PM! We\'ll be covering algorithms and data structures. Bring your laptops and any questions you have.',
        timestamp: '2023-12-10T15:30:00Z',
        likes: 8,
        comments: 3,
        isLiked: false
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Alex Chen',
        authorId: 'alex_chen',
        authorPic: 'https://i.pravatar.cc/150?u=alex_chen',
        content: 'New study materials have been uploaded to our shared drive. Check them out! The materials include practice problems and solutions for the upcoming exam.',
        timestamp: '2023-12-09T10:15:00Z',
        likes: 12,
        comments: 5,
        isLiked: true
      },
      {
        id: 3,
        type: 'member_joined',
        author: 'System',
        content: 'Emma Wilson joined the group',
        timestamp: '2023-12-08T16:20:00Z'
      },
      {
        id: 4,
        type: 'post',
        author: 'Mike Davis',
        authorId: 'mike_davis',
        authorPic: 'https://i.pravatar.cc/150?u=mike_davis',
        content: 'Has anyone worked on the binary tree assignment? I\'m stuck on the traversal algorithms.',
        timestamp: '2023-12-07T20:45:00Z',
        likes: 5,
        comments: 8,
        isLiked: false
      },
      {
        id: 5,
        type: 'event',
        author: 'Sarah Johnson',
        authorId: 'sarah_johnson',
        authorPic: 'https://i.pravatar.cc/150?u=sarah_johnson',
        content: 'Scheduled: Group coding session - December 15th at 2 PM in Library Room 204',
        timestamp: '2023-12-06T11:30:00Z',
        likes: 15,
        comments: 2,
        isLiked: true
      }
    ]
  },
  2: {
    membersList: [
      {
        id: 'mike_chen',
        name: 'Mike Chen',
        profilePic: 'https://i.pravatar.cc/150?u=mike_chen',
        role: 'Admin',
        joinedAt: '2023-08-20T14:30:00Z',
        isOnline: true,
        bio: 'Basketball team captain, organizing campus leagues.'
      },
      {
        id: 'james_wilson',
        name: 'James Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=james_wilson',
        role: 'Member',
        joinedAt: '2023-08-21T16:45:00Z',
        isOnline: false,
        bio: 'Point guard, loves competitive basketball.'
      },
      {
        id: 'sarah_kim',
        name: 'Sarah Kim',
        profilePic: 'https://i.pravatar.cc/150?u=sarah_kim',
        role: 'Member',
        joinedAt: '2023-08-22T10:15:00Z',
        isOnline: true,
        bio: 'Former high school varsity player, excited to play again.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'post',
        author: 'Mike Chen',
        authorId: 'mike_chen',
        authorPic: 'https://i.pravatar.cc/150?u=mike_chen',
        content: 'Great game yesterday everyone! Next practice is Thursday at 6 PM.',
        timestamp: '2023-12-10T18:20:00Z',
        likes: 12,
        comments: 4,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Mike Chen',
        authorId: 'mike_chen',
        authorPic: 'https://i.pravatar.cc/150?u=mike_chen',
        content: 'Tournament registration is now open! Sign up by Friday.',
        timestamp: '2023-12-09T14:30:00Z',
        likes: 8,
        comments: 6,
        isLiked: false
      }
    ]
  }
};

// Base groups data (duplicated from groups.js for simplicity)
const baseGroups = [
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
    adminId: 'sarah_johnson',
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
    adminId: 'mike_chen',
    members: 18,
    isJoined: true,
    createdAt: '2023-08-20T14:30:00Z'
  }
];

export default function handler(req, res) {
  const { id } = req.query;
  const groupId = parseInt(id);

  if (req.method === 'GET') {
    // Find the base group data
    const baseGroup = baseGroups.find(group => group.id === groupId);
    
    if (!baseGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Get extended data for this group
    const extendedData = extendedGroupData[groupId] || {
      membersList: [],
      recentActivity: []
    };

    // Combine base group data with extended details
    const detailedGroup = {
      ...baseGroup,
      membersList: extendedData.membersList,
      recentActivity: extendedData.recentActivity
    };

    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(detailedGroup);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

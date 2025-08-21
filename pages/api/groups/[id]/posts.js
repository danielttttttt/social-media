// Mock data for group posts
const groupPosts = {
  // Computer Science Study Group (Group 1)
  1: [
    {
      id: 101,
      title: 'Study Session Tomorrow',
      content: 'Just a reminder about our study session tomorrow at 3 PM in the library. We\'ll be covering algorithms and data structures. Bring your laptops and any questions you have!',
      author: 'Sarah Johnson',
      authorId: 'sarah_johnson',
      profilePic: 'https://i.pravatar.cc/150?u=sarah_johnson',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 8,
      comments: 3,
      timestamp: '2023-12-10T15:30:00Z',
      category: 'Academic',
      tags: ['study', 'algorithms', 'data structures'],
      isLiked: false,
      groupId: 1
    },
    // ... (keep existing posts for group 1)
  ],

  // Campus Basketball League (Group 2)
  2: [
    {
      id: 201,
      title: 'Game Schedule Update',
      content: 'Our next game is rescheduled to Friday at 6 PM due to gym maintenance. Please update your calendars!',
      author: 'James Wilson',
      authorId: 'james_wilson',
      profilePic: 'https://i.pravatar.cc/150?u=james_wilson',
      imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 12,
      comments: 3,
      timestamp: '2023-12-10T16:45:00Z',
      category: 'Update',
      tags: ['schedule', 'game'],
      isLiked: false,
      groupId: 2
    },
    // ... (keep existing posts for group 2)
  ],

  // Photography Club (Group 3)
  3: [
    {
      id: 301,
      title: 'Photo Walk This Weekend',
      content: 'Join us this Saturday at 9 AM for a photo walk in the city park. Bring your camera and let\'s capture the autumn colors!',
      author: 'Emma Wilson',
      authorId: 'emma_wilson',
      profilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
      imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 15,
      comments: 7,
      timestamp: '2023-12-09T10:30:00Z',
      category: 'Event',
      tags: ['photo walk', 'outdoor', 'nature'],
      isLiked: true,
      groupId: 3
    },
    // ... (add more posts for group 3)
  ],

  // Robotics and AI Society (Group 4)
  4: [
    {
      id: 401,
      title: 'Robotics Workshop Next Week',
      content: 'We\'re hosting a robotics workshop next Tuesday at 4 PM in the engineering lab. No experience required!',
      author: 'David Lee',
      authorId: 'david_lee',
      profilePic: 'https://i.pravatar.cc/150?u=david_lee',
      likes: 22,
      comments: 9,
      timestamp: '2023-12-08T13:20:00Z',
      category: 'Workshop',
      tags: ['robotics', 'workshop', 'beginners'],
      isLiked: false,
      groupId: 4
    },
    // ... (add more posts for group 4)
  ],

  // Add posts for remaining groups (5-15) following the same pattern
  // Each group should have 3-5 posts with relevant content

  // Example for Group 5 (Debate Club)
  5: [
    {
      id: 501,
      title: 'Upcoming Debate Tournament',
      content: 'Registration is now open for the winter debate tournament. Sign up by Friday to secure your spot!',
      author: 'Maria Garcia',
      authorId: 'maria_garcia',
      profilePic: 'https://i.pravatar.cc/150?u=maria_garcia',
      likes: 17,
      comments: 6,
      timestamp: '2023-12-07T11:15:00Z',
      category: 'Tournament',
      tags: ['debate', 'competition', 'public speaking'],
      isLiked: true,
      groupId: 5
    }
    // ... (add more posts for group 5)
  ],

  // Continue for groups 6-15 with similar structure
  // Each group should have posts that match its theme
};

export default function handler(req, res) {
  const { id } = req.query;
  const groupId = parseInt(id);

  if (req.method === 'GET') {
    // Get posts for this group
    const posts = groupPosts[groupId] || [];
    
    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(posts);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

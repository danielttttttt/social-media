// Mock data for the feed
const posts = [
  {
    id: 1,
    title: 'Beautiful sunset from my dorm window',
    content: 'Just captured this amazing sunset view from my dorm room. Campus life has its perks! 🌅',
    author: 'Sarah Chen',
    profilePic: 'https://i.pravatar.cc/150?u=sarah_chen',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 125,
    comments: 12,
    timestamp: '2023-09-01T10:30:00Z',
    category: 'Photos',
    tags: ['sunset', 'campus', 'photography'],
    commentsList: [
      {
        id: 1,
        author: 'Mike Johnson',
        profilePic: 'https://i.pravatar.cc/150?u=mike_johnson',
        content: 'Absolutely stunning! What camera did you use?',
        timestamp: '2023-09-01T11:00:00Z',
        likes: 5
      },
      {
        id: 2,
        author: 'Emma Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
        content: 'This makes me miss campus so much! 😍',
        timestamp: '2023-09-01T11:15:00Z',
        likes: 2
      }
    ]
  },
  {
    id: 2,
    title: 'My latest music cover - Acoustic vibes',
    content: 'Just finished recording this acoustic cover of my favorite song. Hope you enjoy it! 🎵 Let me know what you think in the comments.',
    author: 'Alex Rodriguez',
    profilePic: 'https://i.pravatar.cc/150?u=alex_rodriguez',
    likes: 210,
    comments: 31,
    timestamp: '2023-09-02T08:30:00Z',
    category: 'Music',
    tags: ['music', 'acoustic', 'cover'],
    commentsList: [
      {
        id: 3,
        author: 'Lisa Park',
        profilePic: 'https://i.pravatar.cc/150?u=lisa_park',
        content: 'Your voice is amazing! Do you have more covers?',
        timestamp: '2023-09-02T09:00:00Z',
        likes: 8
      },
      {
        id: 4,
        author: 'David Lee',
        profilePic: 'https://i.pravatar.cc/150?u=david_lee',
        content: 'This is so good! You should start a YouTube channel.',
        timestamp: '2023-09-02T09:30:00Z',
        likes: 3
      },
      {
        id: 5,
        author: 'Maria Garcia',
        profilePic: 'https://i.pravatar.cc/150?u=maria_garcia',
        content: 'Love the acoustic version! Keep it up! 🎸',
        timestamp: '2023-09-02T10:00:00Z',
        likes: 12
      }
    ]
  },
  {
    id: 3,
    title: 'Weekend hiking adventure vlog',
    content: 'Just uploaded my latest adventure vlog from this weekend\'s hiking trip! Beautiful trails and amazing views. Check it out! 🏔️',
    author: 'Adventure Jake',
    profilePic: 'https://i.pravatar.cc/150?u=adventure_jake',
    likes: 98,
    comments: 21,
    timestamp: '2023-09-02T06:30:00Z',
    category: 'Videos',
    tags: ['hiking', 'adventure', 'vlog'],
    commentsList: [
      {
        id: 6,
        author: 'Outdoor Enthusiast',
        profilePic: 'https://i.pravatar.cc/150?u=outdoor_enthusiast',
        content: 'Those views are incredible! What trail did you take?',
        timestamp: '2023-09-02T07:00:00Z',
        likes: 6
      },
      {
        id: 7,
        author: 'Nature Lover',
        profilePic: 'https://i.pravatar.cc/150?u=nature_lover',
        content: 'Adding this to my weekend plans! Thanks for sharing.',
        timestamp: '2023-09-02T07:30:00Z',
        likes: 4
      }
    ]
  },
  {
    id: 4,
    title: 'My morning routine for a productive day',
    content: 'Sharing my daily morning routine that helps me stay focused and energized throughout the day. What does your morning look like? ☀️',
    author: 'Wellness Maya',
    profilePic: 'https://i.pravatar.cc/150?u=wellness_maya',
    likes: 45,
    comments: 18,
    timestamp: '2023-09-01T04:30:00Z',
    category: 'Lifestyle',
    tags: ['morning', 'routine', 'wellness'],
    commentsList: [
      {
        id: 8,
        author: 'Healthy Living',
        profilePic: 'https://i.pravatar.cc/150?u=healthy_living',
        content: 'Love this! I need to be more consistent with my routine.',
        timestamp: '2023-09-01T05:00:00Z',
        likes: 3
      }
    ]
  },
  {
    id: 5,
    title: 'Short story: The Coffee Shop Chronicles',
    content: 'Just finished writing a short story inspired by the people I observe at my local coffee shop. Sometimes the best stories are right in front of us! ☕📖',
    author: 'Creative Writer',
    profilePic: 'https://i.pravatar.cc/150?u=creative_writer',
    likes: 12,
    comments: 5,
    timestamp: '2023-08-31T20:30:00Z',
    category: 'Stories',
    tags: ['writing', 'story', 'coffee'],
    commentsList: [
      {
        id: 9,
        author: 'Book Lover',
        profilePic: 'https://i.pravatar.cc/150?u=book_lover',
        content: 'This sounds intriguing! Would love to read it when you\'re ready to share.',
        timestamp: '2023-08-31T21:00:00Z',
        likes: 8
      }
    ]
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(posts);
    }, 500);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

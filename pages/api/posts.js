// Mock data for the feed
const posts = [
  {
    id: 1,
    title: 'Welcome to the new semester!',
    content: 'We are excited to have everyone back on campus. Please check the updated guidelines for campus access.',
    author: 'Admin Team',
    profilePic: 'https://i.pravatar.cc/150?u=admin_team',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 125,
    comments: 12,
    timestamp: '2023-09-01T10:30:00Z',
    category: 'Announcements',
    tags: ['semester', 'campus', 'guidelines'],
    commentsList: [
      {
        id: 1,
        author: 'Sarah Johnson',
        profilePic: 'https://i.pravatar.cc/150?u=sarah_johnson',
        content: 'Thanks for the update! Looking forward to the new semester.',
        timestamp: '2023-09-01T11:00:00Z',
        likes: 5
      },
      {
        id: 2,
        author: 'Mike Chen',
        profilePic: 'https://i.pravatar.cc/150?u=mike_chen',
        content: 'Where can I find the updated guidelines?',
        timestamp: '2023-09-01T11:15:00Z',
        likes: 2
      }
    ]
  },
  {
    id: 2,
    title: 'Club Fair Next Week!',
    content: 'Join us for the annual club fair next week! Discover new opportunities, meet like-minded students, and find your community on campus.',
    author: 'Student Activities',
    profilePic: 'https://i.pravatar.cc/150?u=student_activities',
    likes: 210,
    comments: 31,
    timestamp: '2023-09-02T08:30:00Z',
    category: 'Announcements',
    tags: ['clubs', 'fair', 'activities'],
    commentsList: [
      {
        id: 3,
        author: 'Emma Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
        content: 'Can\'t wait! What time does it start?',
        timestamp: '2023-09-02T09:00:00Z',
        likes: 8
      },
      {
        id: 4,
        author: 'David Lee',
        profilePic: 'https://i.pravatar.cc/150?u=david_lee',
        content: 'Will there be any tech clubs participating?',
        timestamp: '2023-09-02T09:30:00Z',
        likes: 3
      },
      {
        id: 5,
        author: 'Student Activities',
        profilePic: 'https://i.pravatar.cc/150?u=student_activities',
        content: '@Emma Wilson It starts at 10 AM! @David Lee Yes, we have several tech clubs joining us.',
        timestamp: '2023-09-02T10:00:00Z',
        likes: 12
      }
    ]
  },
  {
    id: 3,
    title: 'Annual Tech Fest - Innovate 2023',
    content: 'Get ready for the biggest tech event of the year! Join us for workshops, competitions, and networking opportunities with industry leaders.',
    author: 'Jane Doe',
    profilePic: 'https://i.pravatar.cc/150?u=jane_doe',
    likes: 98,
    comments: 21,
    timestamp: '2023-09-02T06:30:00Z',
    category: 'Events',
    tags: ['tech', 'innovation', 'competition'],
    commentsList: [
      {
        id: 6,
        author: 'Alex Rodriguez',
        profilePic: 'https://i.pravatar.cc/150?u=alex_rodriguez',
        content: 'This sounds amazing! How do I register for the competitions?',
        timestamp: '2023-09-02T07:00:00Z',
        likes: 6
      },
      {
        id: 7,
        author: 'Lisa Park',
        profilePic: 'https://i.pravatar.cc/150?u=lisa_park',
        content: 'Will there be any AI/ML workshops?',
        timestamp: '2023-09-02T07:30:00Z',
        likes: 4
      }
    ]
  },
  {
    id: 4,
    title: 'Study Group for Midterms',
    content: 'Organizing study groups for upcoming midterm exams. All students welcome! Let\'s help each other succeed this semester.',
    author: 'Study Buddy',
    profilePic: 'https://i.pravatar.cc/150?u=study_buddy',
    likes: 45,
    comments: 18,
    timestamp: '2023-09-01T04:30:00Z',
    category: 'Events',
    tags: ['study', 'midterms', 'group'],
    commentsList: [
      {
        id: 8,
        author: 'Maria Garcia',
        profilePic: 'https://i.pravatar.cc/150?u=maria_garcia',
        content: 'I\'m interested! What subjects are you covering?',
        timestamp: '2023-09-01T05:00:00Z',
        likes: 3
      }
    ]
  },
  {
    id: 5,
    title: 'Lost: MacBook Pro',
    content: 'I lost my MacBook Pro in the library yesterday. It has important project files. Please contact me if you find it!',
    author: 'Alex Student',
    profilePic: 'https://i.pravatar.cc/150?u=alex_student',
    likes: 12,
    comments: 5,
    timestamp: '2023-08-31T20:30:00Z',
    category: 'Lost & Found',
    tags: ['lost', 'laptop', 'library'],
    commentsList: [
      {
        id: 9,
        author: 'Campus Security',
        profilePic: 'https://i.pravatar.cc/150?u=campus_security',
        content: 'Please check with the library lost and found desk. We\'ll also keep an eye out.',
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

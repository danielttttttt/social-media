// Mock data for the feed
const posts = [
  {
    id: 1,
    title: 'Welcome Back to Campus - Fall 2023!',
    content: 'Welcome back everyone! We\'re excited to start the new semester. Please check your email for updated campus guidelines and don\'t forget to pick up your student ID cards at the main office.',
    author: 'Campus Administration',
    profilePic: 'https://i.pravatar.cc/150?u=campus_admin',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 125,
    comments: 12,
    timestamp: '2023-09-01T10:30:00Z',
    category: 'Announcements',
    tags: ['welcome', 'semester', 'guidelines'],
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
    title: 'Club Fair This Friday!',
    content: 'Join us this Friday from 10 AM - 4 PM in the Student Union for our annual Club Fair! Over 50 student organizations will be there. Come discover new opportunities and meet like-minded students! 🎉',
    author: 'Student Activities',
    profilePic: 'https://i.pravatar.cc/150?u=student_activities',
    likes: 210,
    comments: 31,
    timestamp: '2023-09-02T08:30:00Z',
    category: 'Events',
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
    title: 'Study Group for Calculus II',
    content: 'Looking for serious students to form a study group for Calculus II. We\'ll meet twice a week in the library. Already have 3 committed members. DM me if interested! 📚',
    author: 'Math Student',
    profilePic: 'https://i.pravatar.cc/150?u=math_student',
    likes: 98,
    comments: 21,
    timestamp: '2023-09-02T06:30:00Z',
    category: 'Academic',
    tags: ['study', 'calculus', 'math'],
    commentsList: [
      {
        id: 6,
        author: 'Study Buddy',
        profilePic: 'https://i.pravatar.cc/150?u=study_buddy',
        content: 'I\'m interested! What days work best for everyone?',
        timestamp: '2023-09-02T07:00:00Z',
        likes: 6
      },
      {
        id: 7,
        author: 'Academic Helper',
        profilePic: 'https://i.pravatar.cc/150?u=academic_helper',
        content: 'Great idea! Study groups really help with understanding concepts.',
        timestamp: '2023-09-02T07:30:00Z',
        likes: 4
      }
    ]
  },
  {
    id: 4,
    title: 'Pizza Party Tonight - Dorm 3B!',
    content: 'Hey everyone! We\'re having an impromptu pizza party in the Dorm 3B common room starting at 7 PM. Bring your friends and let\'s hang out! 🍕',
    author: 'Social Coordinator',
    profilePic: 'https://i.pravatar.cc/150?u=social_coordinator',
    likes: 45,
    comments: 18,
    timestamp: '2023-09-01T04:30:00Z',
    category: 'Social',
    tags: ['party', 'pizza', 'dorm'],
    commentsList: [
      {
        id: 8,
        author: 'Party Goer',
        profilePic: 'https://i.pravatar.cc/150?u=party_goer',
        content: 'I\'ll be there! Should I bring anything?',
        timestamp: '2023-09-01T05:00:00Z',
        likes: 3
      }
    ]
  },
  {
    id: 5,
    title: 'Best Study Spots on Campus',
    content: 'After 3 years here, I\'ve discovered the best quiet study spots on campus! The 4th floor of the library is amazing, and the garden area behind the science building is perfect for outdoor studying. What are your favorite spots? 📚',
    author: 'Campus Explorer',
    profilePic: 'https://i.pravatar.cc/150?u=campus_explorer',
    likes: 12,
    comments: 5,
    timestamp: '2023-08-31T20:30:00Z',
    category: 'Campus Life',
    tags: ['study', 'campus', 'tips'],
    commentsList: [
      {
        id: 9,
        author: 'Study Enthusiast',
        profilePic: 'https://i.pravatar.cc/150?u=study_enthusiast',
        content: 'The rooftop of the engineering building is also great! Thanks for sharing.',
        timestamp: '2023-08-31T21:00:00Z',
        likes: 8
      }
    ]
  },
  {
    id: 6,
    title: 'Selling: Calculus Textbook & Scientific Calculator',
    content: 'Selling my Calculus textbook (Stewart 8th edition) and TI-84 Plus calculator. Both in excellent condition! Textbook: $80, Calculator: $60, or $120 for both. Perfect for math/engineering students! 📐',
    author: 'Graduating Senior',
    profilePic: 'https://i.pravatar.cc/150?u=graduating_senior',
    likes: 8,
    comments: 3,
    timestamp: '2023-08-30T15:30:00Z',
    category: 'Marketplace',
    tags: ['textbook', 'calculator', 'forsale'],
    commentsList: [
      {
        id: 10,
        author: 'Math Student',
        profilePic: 'https://i.pravatar.cc/150?u=math_student_buyer',
        content: 'Is the textbook still available? I\'m interested!',
        timestamp: '2023-08-30T16:00:00Z',
        likes: 2
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

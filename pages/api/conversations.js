// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: 'Jane Smith',
    avatar: null,
    isGroup: false,
    memberCount: 2,
    lastMessage: {
      id: 1,
      content: 'Hey, how are you doing?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      senderId: 2,
      senderName: 'Jane Smith'
    },
    unreadCount: 2
  },
  {
    id: 2,
    name: 'Study Group',
    avatar: null,
    isGroup: true,
    memberCount: 5,
    lastMessage: {
      id: 2,
      content: 'Meeting at 3 PM tomorrow',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      senderId: 3,
      senderName: 'Alex Johnson'
    },
    unreadCount: 0
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: null,
    isGroup: false,
    memberCount: 2,
    lastMessage: {
      id: 3,
      content: 'Did you finish the assignment?',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      senderId: 3,
      senderName: 'Alex Johnson'
    },
    unreadCount: 0
  },
  {
    id: 4,
    name: 'Campus Events',
    avatar: null,
    isGroup: true,
    memberCount: 150,
    lastMessage: {
      id: 4,
      content: 'New event: Career Fair 2023',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      senderId: 4,
      senderName: 'Campus Events Bot'
    },
    unreadCount: 0
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // In a real app, you would:
    // 1. Verify the user is authenticated
    // 2. Fetch conversations from database where user is a member
    // 3. Sort by last message timestamp
    
    try {
      // Sort conversations by last message timestamp (most recent first)
      const sortedConversations = mockConversations.sort((a, b) => {
        const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp) : new Date(0);
        const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp) : new Date(0);
        return bTime - aTime;
      });

      res.status(200).json(sortedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
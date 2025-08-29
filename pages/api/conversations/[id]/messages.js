// Mock messages storage (shared with messages.js)
let mockMessages = {
  1: [
    {
      id: 1,
      conversationId: 1,
      content: 'Hey, how are you doing?',
      senderId: 2,
      senderName: 'Jane Smith',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      conversationId: 1,
      content: "I'm doing great! How about you?",
      senderId: 1,
      senderName: 'Current User',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      conversationId: 1,
      content: 'That\'s awesome! Are you ready for the exam tomorrow?',
      senderId: 2,
      senderName: 'Jane Smith',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    }
  ],
  2: [
    {
      id: 4,
      conversationId: 2,
      content: 'Hey everyone! Don\'t forget about our study session tomorrow.',
      senderId: 3,
      senderName: 'Alex Johnson',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      conversationId: 2,
      content: 'Meeting at 3 PM tomorrow',
      senderId: 3,
      senderName: 'Alex Johnson',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      conversationId: 2,
      content: 'Perfect! I\'ll be there.',
      senderId: 1,
      senderName: 'Current User',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 23.5 * 60 * 60 * 1000).toISOString()
    }
  ],
  3: [
    {
      id: 7,
      conversationId: 3,
      content: 'Did you finish the assignment?',
      senderId: 3,
      senderName: 'Alex Johnson',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      conversationId: 3,
      content: 'Yes, I submitted it yesterday. How about you?',
      senderId: 1,
      senderName: 'Current User',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  4: [
    {
      id: 9,
      conversationId: 4,
      content: 'New event: Career Fair 2023',
      senderId: 4,
      senderName: 'Campus Events Bot',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 10,
      conversationId: 4,
      content: 'Join us on March 15th at the main campus hall for networking opportunities with top companies!',
      senderId: 4,
      senderName: 'Campus Events Bot',
      senderAvatar: null,
      timestamp: new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const conversationId = parseInt(id);
      
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: 'Invalid conversation ID' });
      }

      // In a real app, you would:
      // 1. Verify the user is authenticated
      // 2. Check if user has access to this conversation
      // 3. Fetch messages from database
      
      const messages = mockMessages[conversationId] || [];
      
      // Sort messages by timestamp (oldest first)
      const sortedMessages = messages.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );

      res.status(200).json(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
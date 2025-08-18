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
  },
  3: {
    membersList: [
      {
        id: 'emma_wilson',
        name: 'Emma Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=emma_wilson',
        role: 'Admin',
        joinedAt: '2023-07-10T09:15:00Z',
        isOnline: true,
        bio: 'Professional photographer and art student, passionate about visual storytelling.'
      },
      {
        id: 'david_kim',
        name: 'David Kim',
        profilePic: 'https://i.pravatar.cc/150?u=david_kim',
        role: 'Moderator',
        joinedAt: '2023-07-12T14:20:00Z',
        isOnline: false,
        bio: 'Photography enthusiast specializing in landscape and street photography.'
      },
      {
        id: 'maya_patel',
        name: 'Maya Patel',
        profilePic: 'https://i.pravatar.cc/150?u=maya_patel',
        role: 'Member',
        joinedAt: '2023-07-15T11:30:00Z',
        isOnline: true,
        bio: 'Beginner photographer learning portrait and event photography.'
      },
      {
        id: 'carlos_rodriguez',
        name: 'Carlos Rodriguez',
        profilePic: 'https://i.pravatar.cc/150?u=carlos_rodriguez',
        role: 'Member',
        joinedAt: '2023-07-18T16:45:00Z',
        isOnline: false,
        bio: 'Film photography lover, enjoys developing photos in the darkroom.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Emma Wilson',
        authorId: 'emma_wilson',
        authorPic: 'https://i.pravatar.cc/150?u=emma_wilson',
        content: 'Photo walk this Saturday at 9 AM! We\'ll explore downtown and practice street photography techniques.',
        timestamp: '2023-12-11T10:30:00Z',
        likes: 15,
        comments: 7,
        isLiked: true
      },
      {
        id: 2,
        type: 'post',
        author: 'David Kim',
        authorId: 'david_kim',
        authorPic: 'https://i.pravatar.cc/150?u=david_kim',
        content: 'Check out these amazing sunset shots from yesterday\'s golden hour session! Tips in the comments.',
        timestamp: '2023-12-10T19:45:00Z',
        likes: 23,
        comments: 12,
        isLiked: false
      },
      {
        id: 3,
        type: 'announcement',
        author: 'Emma Wilson',
        authorId: 'emma_wilson',
        authorPic: 'https://i.pravatar.cc/150?u=emma_wilson',
        content: 'Our photography exhibition is confirmed for next month! Start selecting your best 3 photos to submit.',
        timestamp: '2023-12-09T13:15:00Z',
        likes: 31,
        comments: 18,
        isLiked: true
      }
    ]
  },
  4: {
    membersList: [
      {
        id: 'david_lee',
        name: 'David Lee',
        profilePic: 'https://i.pravatar.cc/150?u=david_lee',
        role: 'Admin',
        joinedAt: '2023-09-01T16:45:00Z',
        isOnline: true,
        bio: 'Robotics Engineering PhD student, specializing in autonomous systems and AI.'
      },
      {
        id: 'priya_sharma',
        name: 'Priya Sharma',
        profilePic: 'https://i.pravatar.cc/150?u=priya_sharma',
        role: 'Moderator',
        joinedAt: '2023-09-03T10:20:00Z',
        isOnline: true,
        bio: 'Computer Science major with focus on machine learning and neural networks.'
      },
      {
        id: 'kevin_wong',
        name: 'Kevin Wong',
        profilePic: 'https://i.pravatar.cc/150?u=kevin_wong',
        role: 'Member',
        joinedAt: '2023-09-05T14:30:00Z',
        isOnline: false,
        bio: 'Electrical Engineering student, loves building Arduino and Raspberry Pi projects.'
      },
      {
        id: 'sophia_martinez',
        name: 'Sophia Martinez',
        profilePic: 'https://i.pravatar.cc/150?u=sophia_martinez',
        role: 'Member',
        joinedAt: '2023-09-08T09:15:00Z',
        isOnline: true,
        bio: 'AI researcher working on computer vision and robotics applications.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'announcement',
        author: 'David Lee',
        authorId: 'david_lee',
        authorPic: 'https://i.pravatar.cc/150?u=david_lee',
        content: 'Exciting news! We\'ve been selected to participate in the National Robotics Competition. Team formation meeting this Friday!',
        timestamp: '2023-12-11T14:20:00Z',
        likes: 28,
        comments: 15,
        isLiked: true
      },
      {
        id: 2,
        type: 'post',
        author: 'Priya Sharma',
        authorId: 'priya_sharma',
        authorPic: 'https://i.pravatar.cc/150?u=priya_sharma',
        content: 'Successfully implemented object detection on our robot! The AI can now identify and navigate around obstacles.',
        timestamp: '2023-12-10T16:30:00Z',
        likes: 35,
        comments: 8,
        isLiked: false
      },
      {
        id: 3,
        type: 'event',
        author: 'Kevin Wong',
        authorId: 'kevin_wong',
        authorPic: 'https://i.pravatar.cc/150?u=kevin_wong',
        content: 'Arduino workshop this Wednesday at 7 PM! We\'ll build a line-following robot from scratch.',
        timestamp: '2023-12-09T11:45:00Z',
        likes: 19,
        comments: 11,
        isLiked: true
      }
    ]
  },
  5: {
    membersList: [
      {
        id: 'maria_garcia',
        name: 'Maria Garcia',
        profilePic: 'https://i.pravatar.cc/150?u=maria_garcia',
        role: 'Admin',
        joinedAt: '2023-08-05T11:20:00Z',
        isOnline: true,
        bio: 'International student from Spain, passionate about cultural exchange and community building.'
      },
      {
        id: 'yuki_tanaka',
        name: 'Yuki Tanaka',
        profilePic: 'https://i.pravatar.cc/150?u=yuki_tanaka',
        role: 'Moderator',
        joinedAt: '2023-08-07T15:30:00Z',
        isOnline: false,
        bio: 'Exchange student from Japan, loves sharing Japanese culture and learning about others.'
      },
      {
        id: 'ahmed_hassan',
        name: 'Ahmed Hassan',
        profilePic: 'https://i.pravatar.cc/150?u=ahmed_hassan',
        role: 'Member',
        joinedAt: '2023-08-10T09:45:00Z',
        isOnline: true,
        bio: 'Graduate student from Egypt, organizing Middle Eastern cultural events.'
      },
      {
        id: 'elena_petrov',
        name: 'Elena Petrov',
        profilePic: 'https://i.pravatar.cc/150?u=elena_petrov',
        role: 'Member',
        joinedAt: '2023-08-12T14:20:00Z',
        isOnline: true,
        bio: 'International student from Russia, studying business and economics.'
      },
      {
        id: 'carlos_mendoza',
        name: 'Carlos Mendoza',
        profilePic: 'https://i.pravatar.cc/150?u=carlos_mendoza',
        role: 'Member',
        joinedAt: '2023-08-15T16:10:00Z',
        isOnline: false,
        bio: 'Student from Mexico, loves cooking traditional dishes and language exchange.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Maria Garcia',
        authorId: 'maria_garcia',
        authorPic: 'https://i.pravatar.cc/150?u=maria_garcia',
        content: 'International Food Festival next Friday! Bring a dish from your home country to share. Let\'s celebrate our diversity!',
        timestamp: '2023-12-11T12:15:00Z',
        likes: 42,
        comments: 23,
        isLiked: true
      },
      {
        id: 2,
        type: 'post',
        author: 'Yuki Tanaka',
        authorId: 'yuki_tanaka',
        authorPic: 'https://i.pravatar.cc/150?u=yuki_tanaka',
        content: 'Thank you everyone who joined our Japanese tea ceremony workshop! The photos are now uploaded to our shared album.',
        timestamp: '2023-12-10T17:30:00Z',
        likes: 28,
        comments: 14,
        isLiked: false
      },
      {
        id: 3,
        type: 'announcement',
        author: 'Ahmed Hassan',
        authorId: 'ahmed_hassan',
        authorPic: 'https://i.pravatar.cc/150?u=ahmed_hassan',
        content: 'Language exchange partners needed! We\'re pairing up students to practice different languages. Sign up in the comments!',
        timestamp: '2023-12-09T10:45:00Z',
        likes: 35,
        comments: 19,
        isLiked: true
      }
    ]
  },
  6: {
    membersList: [
      {
        id: 'alex_rodriguez',
        name: 'Alex Rodriguez',
        profilePic: 'https://i.pravatar.cc/150?u=alex_rodriguez',
        role: 'Admin',
        joinedAt: '2023-07-25T13:10:00Z',
        isOnline: true,
        bio: 'Social Work major, dedicated to community service and making a positive impact.'
      },
      {
        id: 'jennifer_lee',
        name: 'Jennifer Lee',
        profilePic: 'https://i.pravatar.cc/150?u=jennifer_lee',
        role: 'Moderator',
        joinedAt: '2023-07-27T16:20:00Z',
        isOnline: true,
        bio: 'Pre-med student who believes in giving back to the community through volunteer work.'
      },
      {
        id: 'michael_brown',
        name: 'Michael Brown',
        profilePic: 'https://i.pravatar.cc/150?u=michael_brown',
        role: 'Member',
        joinedAt: '2023-07-30T11:45:00Z',
        isOnline: false,
        bio: 'Environmental Science student, passionate about sustainability and community gardens.'
      },
      {
        id: 'sarah_johnson_vol',
        name: 'Sarah Johnson',
        profilePic: 'https://i.pravatar.cc/150?u=sarah_johnson_vol',
        role: 'Member',
        joinedAt: '2023-08-02T14:30:00Z',
        isOnline: true,
        bio: 'Education major, volunteers at local schools and literacy programs.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Alex Rodriguez',
        authorId: 'alex_rodriguez',
        authorPic: 'https://i.pravatar.cc/150?u=alex_rodriguez',
        content: 'Community cleanup this Saturday at 8 AM! We\'ll be cleaning up the local park. Gloves and supplies provided.',
        timestamp: '2023-12-11T09:30:00Z',
        likes: 38,
        comments: 16,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Jennifer Lee',
        authorId: 'jennifer_lee',
        authorPic: 'https://i.pravatar.cc/150?u=jennifer_lee',
        content: 'Amazing news! We\'ve raised $2,500 for the local food bank through our charity drive. Thank you to everyone who contributed!',
        timestamp: '2023-12-10T15:45:00Z',
        likes: 67,
        comments: 28,
        isLiked: true
      },
      {
        id: 3,
        type: 'post',
        author: 'Michael Brown',
        authorId: 'michael_brown',
        authorPic: 'https://i.pravatar.cc/150?u=michael_brown',
        content: 'The community garden project is growing beautifully! Come help us harvest vegetables for donation this weekend.',
        timestamp: '2023-12-09T12:20:00Z',
        likes: 24,
        comments: 9,
        isLiked: false
      }
    ]
  },
  7: {
    membersList: [
      {
        id: 'lisa_park',
        name: 'Lisa Park',
        profilePic: 'https://i.pravatar.cc/150?u=lisa_park',
        role: 'Admin',
        joinedAt: '2023-08-12T15:30:00Z',
        isOnline: true,
        bio: 'Theater Arts major, director and actress with passion for dramatic storytelling.'
      },
      {
        id: 'marcus_williams',
        name: 'Marcus Williams',
        profilePic: 'https://i.pravatar.cc/150?u=marcus_williams',
        role: 'Moderator',
        joinedAt: '2023-08-14T10:45:00Z',
        isOnline: false,
        bio: 'Drama student specializing in stage management and lighting design.'
      },
      {
        id: 'isabella_garcia',
        name: 'Isabella Garcia',
        profilePic: 'https://i.pravatar.cc/150?u=isabella_garcia',
        role: 'Member',
        joinedAt: '2023-08-16T14:20:00Z',
        isOnline: true,
        bio: 'Musical theater enthusiast, loves singing and choreography.'
      },
      {
        id: 'ryan_thompson',
        name: 'Ryan Thompson',
        profilePic: 'https://i.pravatar.cc/150?u=ryan_thompson',
        role: 'Member',
        joinedAt: '2023-08-18T16:30:00Z',
        isOnline: false,
        bio: 'Aspiring playwright and actor, enjoys both comedy and drama performances.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'announcement',
        author: 'Lisa Park',
        authorId: 'lisa_park',
        authorPic: 'https://i.pravatar.cc/150?u=lisa_park',
        content: 'Auditions for our winter production of "Romeo and Juliet" start next week! All roles are open. Break a leg!',
        timestamp: '2023-12-11T11:15:00Z',
        likes: 32,
        comments: 18,
        isLiked: true
      },
      {
        id: 2,
        type: 'post',
        author: 'Marcus Williams',
        authorId: 'marcus_williams',
        authorPic: 'https://i.pravatar.cc/150?u=marcus_williams',
        content: 'The new lighting setup for our theater is incredible! Can\'t wait to see how it enhances our next performance.',
        timestamp: '2023-12-10T14:30:00Z',
        likes: 19,
        comments: 7,
        isLiked: false
      },
      {
        id: 3,
        type: 'event',
        author: 'Isabella Garcia',
        authorId: 'isabella_garcia',
        authorPic: 'https://i.pravatar.cc/150?u=isabella_garcia',
        content: 'Musical theater workshop this Thursday! We\'ll work on vocal techniques and stage presence. All levels welcome!',
        timestamp: '2023-12-09T16:45:00Z',
        likes: 26,
        comments: 12,
        isLiked: true
      }
    ]
  },
  8: {
    membersList: [
      {
        id: 'james_wilson',
        name: 'James Wilson',
        profilePic: 'https://i.pravatar.cc/150?u=james_wilson',
        role: 'Admin',
        joinedAt: '2023-09-03T10:45:00Z',
        isOnline: true,
        bio: 'Business major and startup founder, passionate about innovation and entrepreneurship.'
      },
      {
        id: 'natalie_chen',
        name: 'Natalie Chen',
        profilePic: 'https://i.pravatar.cc/150?u=natalie_chen',
        role: 'Moderator',
        joinedAt: '2023-09-05T13:20:00Z',
        isOnline: true,
        bio: 'Marketing student with experience in digital marketing and brand development.'
      },
      {
        id: 'daniel_kim',
        name: 'Daniel Kim',
        profilePic: 'https://i.pravatar.cc/150?u=daniel_kim',
        role: 'Member',
        joinedAt: '2023-09-08T15:30:00Z',
        isOnline: false,
        bio: 'Computer Science student developing a fintech startup focused on student finances.'
      },
      {
        id: 'olivia_martinez',
        name: 'Olivia Martinez',
        profilePic: 'https://i.pravatar.cc/150?u=olivia_martinez',
        role: 'Member',
        joinedAt: '2023-09-10T11:15:00Z',
        isOnline: true,
        bio: 'Economics major interested in social entrepreneurship and sustainable business models.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'James Wilson',
        authorId: 'james_wilson',
        authorPic: 'https://i.pravatar.cc/150?u=james_wilson',
        content: 'Pitch competition next Friday! $5,000 prize for the best startup idea. Registration closes tomorrow!',
        timestamp: '2023-12-11T13:45:00Z',
        likes: 45,
        comments: 22,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Natalie Chen',
        authorId: 'natalie_chen',
        authorPic: 'https://i.pravatar.cc/150?u=natalie_chen',
        content: 'Exciting news! We\'ve partnered with the local business incubator for mentorship opportunities. Applications open!',
        timestamp: '2023-12-10T10:30:00Z',
        likes: 38,
        comments: 15,
        isLiked: false
      },
      {
        id: 3,
        type: 'post',
        author: 'Daniel Kim',
        authorId: 'daniel_kim',
        authorPic: 'https://i.pravatar.cc/150?u=daniel_kim',
        content: 'Just launched the beta version of my app! Looking for feedback from fellow entrepreneurs. Link in bio.',
        timestamp: '2023-12-09T17:20:00Z',
        likes: 29,
        comments: 11,
        isLiked: true
      }
    ]
  },
  9: {
    membersList: [
      {
        id: 'tyler_chen',
        name: 'Tyler Chen',
        profilePic: 'https://i.pravatar.cc/150?u=tyler_chen',
        role: 'Admin',
        joinedAt: '2023-07-18T19:30:00Z',
        isOnline: true,
        bio: 'Esports enthusiast and game developer, organizing tournaments and gaming events.'
      },
      {
        id: 'jessica_wang',
        name: 'Jessica Wang',
        profilePic: 'https://i.pravatar.cc/150?u=jessica_wang',
        role: 'Moderator',
        joinedAt: '2023-07-20T14:15:00Z',
        isOnline: true,
        bio: 'Competitive gamer specializing in strategy games and team coordination.'
      },
      {
        id: 'alex_murphy',
        name: 'Alex Murphy',
        profilePic: 'https://i.pravatar.cc/150?u=alex_murphy',
        role: 'Member',
        joinedAt: '2023-07-22T16:45:00Z',
        isOnline: false,
        bio: 'Casual gamer who loves RPGs and indie games, also streams on weekends.'
      },
      {
        id: 'maya_singh',
        name: 'Maya Singh',
        profilePic: 'https://i.pravatar.cc/150?u=maya_singh',
        role: 'Member',
        joinedAt: '2023-07-25T11:30:00Z',
        isOnline: true,
        bio: 'Mobile gaming enthusiast and game design student, loves puzzle games.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Tyler Chen',
        authorId: 'tyler_chen',
        authorPic: 'https://i.pravatar.cc/150?u=tyler_chen',
        content: 'Epic LAN party this Saturday! Bring your setup for tournaments in League of Legends, CS2, and more. Prizes included!',
        timestamp: '2023-12-11T15:20:00Z',
        likes: 52,
        comments: 31,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Jessica Wang',
        authorId: 'jessica_wang',
        authorPic: 'https://i.pravatar.cc/150?u=jessica_wang',
        content: 'New gaming PCs have arrived in the game room! Now we can run the latest games at max settings. Come check them out!',
        timestamp: '2023-12-10T12:45:00Z',
        likes: 43,
        comments: 18,
        isLiked: false
      },
      {
        id: 3,
        type: 'post',
        author: 'Alex Murphy',
        authorId: 'alex_murphy',
        authorPic: 'https://i.pravatar.cc/150?u=alex_murphy',
        content: 'Just finished an amazing co-op session of It Takes Two! Looking for more people to play story-driven games with.',
        timestamp: '2023-12-09T20:30:00Z',
        likes: 27,
        comments: 14,
        isLiked: true
      }
    ]
  },
  10: {
    membersList: [
      {
        id: 'green_team',
        name: 'Green Team',
        profilePic: 'https://i.pravatar.cc/150?u=green_team',
        role: 'Admin',
        joinedAt: '2023-06-20T08:15:00Z',
        isOnline: true,
        bio: 'Environmental Science collective focused on campus sustainability and climate action.'
      },
      {
        id: 'emma_green',
        name: 'Emma Green',
        profilePic: 'https://i.pravatar.cc/150?u=emma_green',
        role: 'Moderator',
        joinedAt: '2023-06-22T10:30:00Z',
        isOnline: false,
        bio: 'Environmental Engineering student, passionate about renewable energy and waste reduction.'
      },
      {
        id: 'noah_forest',
        name: 'Noah Forest',
        profilePic: 'https://i.pravatar.cc/150?u=noah_forest',
        role: 'Member',
        joinedAt: '2023-06-25T14:45:00Z',
        isOnline: true,
        bio: 'Biology major studying ecosystem conservation and biodiversity protection.'
      },
      {
        id: 'lily_earth',
        name: 'Lily Earth',
        profilePic: 'https://i.pravatar.cc/150?u=lily_earth',
        role: 'Member',
        joinedAt: '2023-06-28T16:20:00Z',
        isOnline: true,
        bio: 'Sustainability advocate working on zero-waste campus initiatives.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Green Team',
        authorId: 'green_team',
        authorPic: 'https://i.pravatar.cc/150?u=green_team',
        content: 'Earth Day cleanup event planning meeting tomorrow! We need volunteers to help organize our biggest environmental action yet.',
        timestamp: '2023-12-11T09:15:00Z',
        likes: 41,
        comments: 19,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Emma Green',
        authorId: 'emma_green',
        authorPic: 'https://i.pravatar.cc/150?u=emma_green',
        content: 'Great news! The campus has approved our proposal for solar panels on the student center. Our advocacy is making a difference!',
        timestamp: '2023-12-10T13:30:00Z',
        likes: 68,
        comments: 25,
        isLiked: true
      },
      {
        id: 3,
        type: 'post',
        author: 'Noah Forest',
        authorId: 'noah_forest',
        authorPic: 'https://i.pravatar.cc/150?u=noah_forest',
        content: 'The campus bee garden is thriving! Come see the native plants we\'ve planted to support local pollinators.',
        timestamp: '2023-12-09T11:45:00Z',
        likes: 34,
        comments: 12,
        isLiked: false
      }
    ]
  },
  11: {
    membersList: [
      {
        id: 'chef_maria',
        name: 'Chef Maria',
        profilePic: 'https://i.pravatar.cc/150?u=chef_maria',
        role: 'Admin',
        joinedAt: '2023-08-28T12:00:00Z',
        isOnline: true,
        bio: 'Culinary Arts student and passionate home cook, loves teaching cooking techniques.'
      },
      {
        id: 'antonio_rossi',
        name: 'Antonio Rossi',
        profilePic: 'https://i.pravatar.cc/150?u=antonio_rossi',
        role: 'Moderator',
        joinedAt: '2023-08-30T15:20:00Z',
        isOnline: false,
        bio: 'Italian exchange student sharing authentic recipes from his grandmother\'s cookbook.'
      },
      {
        id: 'priya_patel',
        name: 'Priya Patel',
        profilePic: 'https://i.pravatar.cc/150?u=priya_patel',
        role: 'Member',
        joinedAt: '2023-09-02T10:45:00Z',
        isOnline: true,
        bio: 'Vegetarian cooking enthusiast, specializes in Indian and fusion cuisine.'
      },
      {
        id: 'jean_dubois',
        name: 'Jean Dubois',
        profilePic: 'https://i.pravatar.cc/150?u=jean_dubois',
        role: 'Member',
        joinedAt: '2023-09-05T14:30:00Z',
        isOnline: true,
        bio: 'French pastry lover and baking enthusiast, dreams of opening a bakery.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Chef Maria',
        authorId: 'chef_maria',
        authorPic: 'https://i.pravatar.cc/150?u=chef_maria',
        content: 'Pasta making workshop this Thursday! Learn to make fresh pasta from scratch. All ingredients provided!',
        timestamp: '2023-12-11T14:30:00Z',
        likes: 36,
        comments: 21,
        isLiked: true
      },
      {
        id: 2,
        type: 'post',
        author: 'Antonio Rossi',
        authorId: 'antonio_rossi',
        authorPic: 'https://i.pravatar.cc/150?u=antonio_rossi',
        content: 'Made my nonna\'s famous tiramisu recipe today! The secret ingredient is love (and a lot of espresso). Recipe shared!',
        timestamp: '2023-12-10T16:45:00Z',
        likes: 42,
        comments: 18,
        isLiked: false
      },
      {
        id: 3,
        type: 'announcement',
        author: 'Priya Patel',
        authorId: 'priya_patel',
        authorPic: 'https://i.pravatar.cc/150?u=priya_patel',
        content: 'International potluck dinner next week! Bring a dish from your culture to share. Let\'s taste the world together!',
        timestamp: '2023-12-09T13:20:00Z',
        likes: 48,
        comments: 26,
        isLiked: true
      }
    ]
  },
  12: {
    membersList: [
      {
        id: 'career_services',
        name: 'Career Services',
        profilePic: 'https://i.pravatar.cc/150?u=career_services',
        role: 'Admin',
        joinedAt: '2023-07-05T14:20:00Z',
        isOnline: true,
        bio: 'Professional career counselors helping students navigate their career paths.'
      },
      {
        id: 'linkedin_lisa',
        name: 'Lisa LinkedIn',
        profilePic: 'https://i.pravatar.cc/150?u=linkedin_lisa',
        role: 'Moderator',
        joinedAt: '2023-07-08T11:30:00Z',
        isOnline: true,
        bio: 'HR professional and networking expert, specializes in personal branding and job search strategies.'
      },
      {
        id: 'resume_ryan',
        name: 'Ryan Resume',
        profilePic: 'https://i.pravatar.cc/150?u=resume_ryan',
        role: 'Member',
        joinedAt: '2023-07-12T16:45:00Z',
        isOnline: false,
        bio: 'Recent graduate working in tech recruiting, helps students with resume optimization.'
      },
      {
        id: 'interview_ava',
        name: 'Ava Interview',
        profilePic: 'https://i.pravatar.cc/150?u=interview_ava',
        role: 'Member',
        joinedAt: '2023-07-15T09:20:00Z',
        isOnline: true,
        bio: 'Corporate trainer specializing in interview preparation and professional communication.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Career Services',
        authorId: 'career_services',
        authorPic: 'https://i.pravatar.cc/150?u=career_services',
        content: 'Virtual career fair next Tuesday! 50+ companies attending. Register now to secure your spot and prepare your elevator pitch!',
        timestamp: '2023-12-11T10:15:00Z',
        likes: 78,
        comments: 34,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Lisa LinkedIn',
        authorId: 'linkedin_lisa',
        authorPic: 'https://i.pravatar.cc/150?u=linkedin_lisa',
        content: 'LinkedIn profile optimization workshop was a huge success! 95% of attendees updated their profiles. Next session in 2 weeks!',
        timestamp: '2023-12-10T14:30:00Z',
        likes: 56,
        comments: 22,
        isLiked: false
      },
      {
        id: 3,
        type: 'post',
        author: 'Ryan Resume',
        authorId: 'resume_ryan',
        authorPic: 'https://i.pravatar.cc/150?u=resume_ryan',
        content: 'Pro tip: Tailor your resume for each job application! Generic resumes get 50% fewer responses. Need help? Book a 1-on-1 session!',
        timestamp: '2023-12-09T15:45:00Z',
        likes: 63,
        comments: 19,
        isLiked: true
      }
    ]
  },
  13: {
    membersList: [
      {
        id: 'dj_alex',
        name: 'DJ Alex',
        profilePic: 'https://i.pravatar.cc/150?u=dj_alex',
        role: 'Admin',
        joinedAt: '2023-08-01T16:45:00Z',
        isOnline: true,
        bio: 'Music Production major and DJ, specializes in electronic music and live mixing.'
      },
      {
        id: 'melody_maker',
        name: 'Melody Maker',
        profilePic: 'https://i.pravatar.cc/150?u=melody_maker',
        role: 'Moderator',
        joinedAt: '2023-08-03T12:20:00Z',
        isOnline: false,
        bio: 'Singer-songwriter and audio engineer, loves creating original compositions.'
      },
      {
        id: 'beat_boxer',
        name: 'Beat Boxer',
        profilePic: 'https://i.pravatar.cc/150?u=beat_boxer',
        role: 'Member',
        joinedAt: '2023-08-06T14:30:00Z',
        isOnline: true,
        bio: 'Hip-hop producer and beatboxer, creates beats and teaches rhythm techniques.'
      },
      {
        id: 'synth_sarah',
        name: 'Synth Sarah',
        profilePic: 'https://i.pravatar.cc/150?u=synth_sarah',
        role: 'Member',
        joinedAt: '2023-08-09T11:15:00Z',
        isOnline: true,
        bio: 'Synthesizer enthusiast and ambient music creator, loves experimental sounds.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'DJ Alex',
        authorId: 'dj_alex',
        authorPic: 'https://i.pravatar.cc/150?u=dj_alex',
        content: 'Beat making workshop this Friday! Learn to create your first track using Ableton Live. Bring headphones!',
        timestamp: '2023-12-11T17:30:00Z',
        likes: 44,
        comments: 27,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Melody Maker',
        authorId: 'melody_maker',
        authorPic: 'https://i.pravatar.cc/150?u=melody_maker',
        content: 'Our student album is complete! 12 original tracks produced by our members. Listening party next week!',
        timestamp: '2023-12-10T19:15:00Z',
        likes: 67,
        comments: 31,
        isLiked: true
      },
      {
        id: 3,
        type: 'post',
        author: 'Beat Boxer',
        authorId: 'beat_boxer',
        authorPic: 'https://i.pravatar.cc/150?u=beat_boxer',
        content: 'Just dropped a new beat! Check it out and let me know what you think. Collaboration opportunities welcome!',
        timestamp: '2023-12-09T21:45:00Z',
        likes: 38,
        comments: 16,
        isLiked: false
      }
    ]
  },
  14: {
    membersList: [
      {
        id: 'professor_smith',
        name: 'Professor Smith',
        profilePic: 'https://i.pravatar.cc/150?u=professor_smith',
        role: 'Admin',
        joinedAt: '2023-09-10T10:30:00Z',
        isOnline: true,
        bio: 'Philosophy professor and debate coach, expert in argumentation and critical thinking.'
      },
      {
        id: 'logic_lucy',
        name: 'Lucy Logic',
        profilePic: 'https://i.pravatar.cc/150?u=logic_lucy',
        role: 'Moderator',
        joinedAt: '2023-09-12T14:45:00Z',
        isOnline: false,
        bio: 'Pre-law student and debate team captain, specializes in constitutional law arguments.'
      },
      {
        id: 'rhetoric_rick',
        name: 'Rick Rhetoric',
        profilePic: 'https://i.pravatar.cc/150?u=rhetoric_rick',
        role: 'Member',
        joinedAt: '2023-09-15T16:20:00Z',
        isOnline: true,
        bio: 'Political Science major with passion for public speaking and policy debate.'
      },
      {
        id: 'argument_anna',
        name: 'Anna Argument',
        profilePic: 'https://i.pravatar.cc/150?u=argument_anna',
        role: 'Member',
        joinedAt: '2023-09-18T11:30:00Z',
        isOnline: true,
        bio: 'Communications student focusing on persuasive speaking and debate strategy.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Professor Smith',
        authorId: 'professor_smith',
        authorPic: 'https://i.pravatar.cc/150?u=professor_smith',
        content: 'Regional debate tournament this weekend! Our team is ready to compete. Come support us at the championship!',
        timestamp: '2023-12-11T08:45:00Z',
        likes: 28,
        comments: 14,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Lucy Logic',
        authorId: 'logic_lucy',
        authorPic: 'https://i.pravatar.cc/150?u=logic_lucy',
        content: 'New debate topic for next week: "Should social media platforms be regulated as public utilities?" Research starts now!',
        timestamp: '2023-12-10T13:20:00Z',
        likes: 22,
        comments: 18,
        isLiked: false
      },
      {
        id: 3,
        type: 'post',
        author: 'Rick Rhetoric',
        authorId: 'rhetoric_rick',
        authorPic: 'https://i.pravatar.cc/150?u=rhetoric_rick',
        content: 'Great practice session today! Working on our rebuttal techniques really paid off. Ready for the tournament!',
        timestamp: '2023-12-09T18:30:00Z',
        likes: 19,
        comments: 8,
        isLiked: true
      }
    ]
  },
  15: {
    membersList: [
      {
        id: 'fitness_coach',
        name: 'Fitness Coach',
        profilePic: 'https://i.pravatar.cc/150?u=fitness_coach',
        role: 'Admin',
        joinedAt: '2023-06-15T06:00:00Z',
        isOnline: true,
        bio: 'Certified personal trainer and nutrition specialist, passionate about holistic wellness.'
      },
      {
        id: 'cardio_carl',
        name: 'Carl Cardio',
        profilePic: 'https://i.pravatar.cc/150?u=cardio_carl',
        role: 'Moderator',
        joinedAt: '2023-06-17T07:30:00Z',
        isOnline: true,
        bio: 'Marathon runner and endurance athlete, leads our running and cycling groups.'
      },
      {
        id: 'strength_stella',
        name: 'Stella Strength',
        profilePic: 'https://i.pravatar.cc/150?u=strength_stella',
        role: 'Member',
        joinedAt: '2023-06-20T18:45:00Z',
        isOnline: false,
        bio: 'Powerlifter and strength training enthusiast, helps beginners with proper form.'
      },
      {
        id: 'yoga_yuki',
        name: 'Yuki Yoga',
        profilePic: 'https://i.pravatar.cc/150?u=yoga_yuki',
        role: 'Member',
        joinedAt: '2023-06-22T08:15:00Z',
        isOnline: true,
        bio: 'Certified yoga instructor focusing on mindfulness and flexibility training.'
      },
      {
        id: 'crossfit_chris',
        name: 'Chris CrossFit',
        profilePic: 'https://i.pravatar.cc/150?u=crossfit_chris',
        role: 'Member',
        joinedAt: '2023-06-25T17:20:00Z',
        isOnline: true,
        bio: 'CrossFit athlete and functional fitness trainer, loves high-intensity workouts.'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'event',
        author: 'Fitness Coach',
        authorId: 'fitness_coach',
        authorPic: 'https://i.pravatar.cc/150?u=fitness_coach',
        content: '30-day fitness challenge starts Monday! Join us for daily workouts, nutrition tips, and group motivation. All levels welcome!',
        timestamp: '2023-12-11T06:30:00Z',
        likes: 89,
        comments: 42,
        isLiked: true
      },
      {
        id: 2,
        type: 'announcement',
        author: 'Carl Cardio',
        authorId: 'cardio_carl',
        authorPic: 'https://i.pravatar.cc/150?u=cardio_carl',
        content: 'Amazing turnout for this morning\'s 5K run! 45 participants and everyone finished strong. Next run is Wednesday at 6 AM!',
        timestamp: '2023-12-10T08:15:00Z',
        likes: 67,
        comments: 28,
        isLiked: false
      },
      {
        id: 3,
        type: 'post',
        author: 'Yuki Yoga',
        authorId: 'yoga_yuki',
        authorPic: 'https://i.pravatar.cc/150?u=yoga_yuki',
        content: 'Sunset yoga session was magical today! The stress relief and flexibility gains are incredible. Join us tomorrow for morning flow!',
        timestamp: '2023-12-09T19:30:00Z',
        likes: 54,
        comments: 21,
        isLiked: true
      },
      {
        id: 4,
        type: 'post',
        author: 'Stella Strength',
        authorId: 'strength_stella',
        authorPic: 'https://i.pravatar.cc/150?u=strength_stella',
        content: 'Hit a new personal record on deadlifts today! 💪 Remember: progressive overload and proper form are key to strength gains.',
        timestamp: '2023-12-08T16:45:00Z',
        likes: 43,
        comments: 15,
        isLiked: true
      }
    ]
  }
};

// Base groups data (simplified - we'll fetch from main API in production)
const baseGroups = [
  { id: 1, name: 'Computer Science Study Group', description: 'A collaborative study group for computer science students. We meet weekly to discuss coursework, share resources, and work on projects together.', category: 'Academic', location: 'Library Room 204', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Sarah Johnson', adminProfilePic: 'https://i.pravatar.cc/150?u=sarah_johnson', adminId: 'sarah_johnson', members: 24, isJoined: false, createdAt: '2023-08-15T10:00:00Z' },
  { id: 2, name: 'Campus Basketball League', description: 'Join our competitive basketball league! Open to all skill levels. We play every Tuesday and Thursday evening at the campus gym.', category: 'Sports', location: 'Campus Gymnasium', meetingSchedule: 'Bi-weekly', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Mike Chen', adminProfilePic: 'https://i.pravatar.cc/150?u=mike_chen', adminId: 'mike_chen', members: 18, isJoined: true, createdAt: '2023-08-20T14:30:00Z' },
  { id: 3, name: 'Photography Club', description: 'Capture the beauty of campus life and beyond! We organize photo walks, workshops, and exhibitions. Perfect for beginners and experienced photographers.', category: 'Arts', location: 'Art Building Studio 3', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Emma Wilson', adminProfilePic: 'https://i.pravatar.cc/150?u=emma_wilson', adminId: 'emma_wilson', members: 31, isJoined: false, createdAt: '2023-07-10T09:15:00Z' },
  { id: 4, name: 'Robotics and AI Society', description: 'Explore the future of technology! We build robots, discuss AI developments, and participate in competitions. Join us to innovate and learn.', category: 'Technology', location: 'Engineering Lab 101', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'David Lee', adminProfilePic: 'https://i.pravatar.cc/150?u=david_lee', adminId: 'david_lee', members: 42, isJoined: false, createdAt: '2023-09-01T16:45:00Z' },
  { id: 5, name: 'International Students Network', description: 'A welcoming community for international students and those interested in global cultures. We organize cultural events, language exchanges, and social gatherings.', category: 'Social', location: 'Student Center Lounge', meetingSchedule: 'Monthly', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Maria Garcia', adminProfilePic: 'https://i.pravatar.cc/150?u=maria_garcia', adminId: 'maria_garcia', members: 67, isJoined: true, createdAt: '2023-08-05T11:20:00Z' },
  { id: 6, name: 'Campus Volunteer Corps', description: 'Make a difference in our community! We organize volunteer activities, charity drives, and community service projects. Every contribution counts.', category: 'Volunteer', location: 'Community Center', meetingSchedule: 'Bi-weekly', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Alex Rodriguez', adminProfilePic: 'https://i.pravatar.cc/150?u=alex_rodriguez', adminId: 'alex_rodriguez', members: 89, isJoined: false, createdAt: '2023-07-25T13:10:00Z' },
  { id: 7, name: 'Drama and Theater Society', description: 'Lights, camera, action! Join our theater group to participate in plays, musicals, and drama workshops. All levels of experience welcome.', category: 'Arts', location: 'Theater Hall', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Lisa Park', adminProfilePic: 'https://i.pravatar.cc/150?u=lisa_park', adminId: 'lisa_park', members: 28, isJoined: false, createdAt: '2023-08-12T15:30:00Z' },
  { id: 8, name: 'Entrepreneurship Club', description: 'Turn your ideas into reality! We support aspiring entrepreneurs with mentorship, networking events, and startup competitions.', category: 'Professional', location: 'Business Building Room 305', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'James Wilson', adminProfilePic: 'https://i.pravatar.cc/150?u=james_wilson', adminId: 'james_wilson', members: 35, isJoined: false, createdAt: '2023-09-03T10:45:00Z' },
  { id: 9, name: 'Gaming Society', description: 'Level up your gaming experience! We organize tournaments, LAN parties, and gaming nights. From casual mobile games to competitive esports.', category: 'Hobby', location: 'Student Center Game Room', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Tyler Chen', adminProfilePic: 'https://i.pravatar.cc/150?u=tyler_chen', adminId: 'tyler_chen', members: 56, isJoined: true, createdAt: '2023-07-18T19:30:00Z' },
  { id: 10, name: 'Environmental Action Group', description: 'Protect our planet! Join us in sustainability initiatives, campus clean-ups, and environmental awareness campaigns.', category: 'Volunteer', location: 'Environmental Science Building', meetingSchedule: 'Bi-weekly', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Green Team', adminProfilePic: 'https://i.pravatar.cc/150?u=green_team', adminId: 'green_team', members: 73, isJoined: false, createdAt: '2023-06-20T08:15:00Z' },
  { id: 11, name: 'Cooking Club', description: 'Discover flavors from around the world! We cook together, share recipes, and explore different cuisines. Perfect for food lovers!', category: 'Hobby', location: 'Culinary Arts Kitchen', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Chef Maria', adminProfilePic: 'https://i.pravatar.cc/150?u=chef_maria', adminId: 'chef_maria', members: 29, isJoined: false, createdAt: '2023-08-28T12:00:00Z' },
  { id: 12, name: 'Career Development Network', description: 'Advance your career! We offer resume workshops, interview prep, networking events, and connections with industry professionals.', category: 'Professional', location: 'Career Services Center', meetingSchedule: 'Monthly', imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Career Services', adminProfilePic: 'https://i.pravatar.cc/150?u=career_services', adminId: 'career_services', members: 94, isJoined: true, createdAt: '2023-07-05T14:20:00Z' },
  { id: 13, name: 'Music Production Society', description: 'Create amazing music! Learn about music production, sound engineering, and collaborate on original compositions and covers.', category: 'Arts', location: 'Music Studio Complex', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'DJ Alex', adminProfilePic: 'https://i.pravatar.cc/150?u=dj_alex', adminId: 'dj_alex', members: 38, isJoined: false, createdAt: '2023-08-01T16:45:00Z' },
  { id: 14, name: 'Debate Society', description: 'Sharpen your argumentation skills! Participate in formal debates, public speaking workshops, and competitive tournaments.', category: 'Academic', location: 'Debate Hall', meetingSchedule: 'Weekly', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Professor Smith', adminProfilePic: 'https://i.pravatar.cc/150?u=professor_smith', adminId: 'professor_smith', members: 22, isJoined: false, createdAt: '2023-09-10T10:30:00Z' },
  { id: 15, name: 'Fitness Enthusiasts', description: 'Stay fit and healthy! Join our workout sessions, fitness challenges, and wellness workshops. All fitness levels welcome!', category: 'Sports', location: 'Campus Fitness Center', meetingSchedule: 'Daily', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', admin: 'Fitness Coach', adminProfilePic: 'https://i.pravatar.cc/150?u=fitness_coach', adminId: 'fitness_coach', members: 112, isJoined: true, createdAt: '2023-06-15T06:00:00Z' }
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

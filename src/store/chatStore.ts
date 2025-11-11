import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  messages: Message[];
  addMessage: (conversationId: string, content: string, senderId: string, senderName: string, senderRole: 'patient' | 'doctor') => void;
  markAsRead: (conversationId: string, userId: string) => void;
  getConversationMessages: (conversationId: string) => Message[];
  getUserConversations: (userId: string, role: 'patient' | 'doctor') => Conversation[];
  initializeMockData: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: [],
      
      addMessage: (conversationId, content, senderId, senderName, senderRole) => {
        const newMessage: Message = {
          id: `msg_${Date.now()}`,
          conversationId,
          senderId,
          senderName,
          senderRole,
          content,
          timestamp: new Date(),
          read: false,
        };
        
        set((state) => {
          const updatedConversations = state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: content,
                  lastMessageTime: new Date(),
                  unreadCount: conv.unreadCount + 1,
                }
              : conv
          );
          
          return {
            messages: [...state.messages, newMessage],
            conversations: updatedConversations,
          };
        });
      },
      
      markAsRead: (conversationId, userId) => {
        set((state) => {
          const updatedMessages = state.messages.map((msg) =>
            msg.conversationId === conversationId && msg.senderId !== userId
              ? { ...msg, read: true }
              : msg
          );
          
          const updatedConversations = state.conversations.map((conv) =>
            conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
          );
          
          return {
            messages: updatedMessages,
            conversations: updatedConversations,
          };
        });
      },
      
      getConversationMessages: (conversationId) => {
        return get().messages.filter((msg) => msg.conversationId === conversationId);
      },
      
      getUserConversations: (userId, role) => {
        const conversations = get().conversations;
        if (role === 'patient') {
          return conversations.filter((conv) => conv.patientId === userId);
        } else if (role === 'doctor') {
          return conversations.filter((conv) => conv.doctorId === userId);
        }
        return [];
      },
      
      initializeMockData: () => {
        const mockConversations: Conversation[] = [
          {
            id: 'conv_1',
            patientId: '1',
            patientName: 'John Doe',
            doctorId: '2',
            doctorName: 'Dr. Sarah Smith',
            lastMessage: 'Thank you for the clarification, Doctor.',
            lastMessageTime: new Date(Date.now() - 3600000),
            unreadCount: 0,
          },
        ];
        
        const mockMessages: Message[] = [
          {
            id: 'msg_1',
            conversationId: 'conv_1',
            senderId: '1',
            senderName: 'John Doe',
            senderRole: 'patient',
            content: 'Hello Dr. Smith, I have a question about my recent blood test results.',
            timestamp: new Date(Date.now() - 7200000),
            read: true,
          },
          {
            id: 'msg_2',
            conversationId: 'conv_1',
            senderId: '2',
            senderName: 'Dr. Sarah Smith',
            senderRole: 'doctor',
            content: 'Hello John! I\'d be happy to help. What would you like to know about your results?',
            timestamp: new Date(Date.now() - 5400000),
            read: true,
          },
          {
            id: 'msg_3',
            conversationId: 'conv_1',
            senderId: '1',
            senderName: 'John Doe',
            senderRole: 'patient',
            content: 'My cholesterol levels seem a bit high. Should I be concerned?',
            timestamp: new Date(Date.now() - 4500000),
            read: true,
          },
          {
            id: 'msg_4',
            conversationId: 'conv_1',
            senderId: '2',
            senderName: 'Dr. Sarah Smith',
            senderRole: 'doctor',
            content: 'Your cholesterol is slightly elevated, but not in the danger zone. I recommend some dietary adjustments and we\'ll monitor it in 3 months.',
            timestamp: new Date(Date.now() - 3700000),
            read: true,
          },
          {
            id: 'msg_5',
            conversationId: 'conv_1',
            senderId: '1',
            senderName: 'John Doe',
            senderRole: 'patient',
            content: 'Thank you for the clarification, Doctor.',
            timestamp: new Date(Date.now() - 3600000),
            read: true,
          },
        ];
        
        set({ conversations: mockConversations, messages: mockMessages });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);

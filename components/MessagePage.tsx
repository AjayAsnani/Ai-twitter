"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, Search, Send } from 'lucide-react'

interface User {
  id: string
  name: string
  username: string
  avatar: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  user: User
  lastMessage: string
  timestamp: string
}

const conversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Alice Johnson',
      username: 'alice_j',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    lastMessage: 'Hey, how are you doing?',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Bob Smith',
      username: 'bob_smith',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    lastMessage: 'Did you see the latest AI news?',
    timestamp: 'Yesterday'
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Carol White',
      username: 'carol_w',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    lastMessage: 'Thanks for the information!',
    timestamp: '2 days ago'
  }
]

const messages: Message[] = [
  {
    id: '1',
    senderId: '101',
    receiverId: 'currentUser',
    content: 'Hey, how are you doing?',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    senderId: 'currentUser',
    receiverId: '101',
    content: "I'm good, thanks! How about you?",
    timestamp: '2 hours ago'
  },
  {
    id: '3',
    senderId: '101',
    receiverId: 'currentUser',
    content: "I'm doing well too. Did you hear about the new AI breakthrough?",
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    senderId: 'currentUser',
    receiverId: '101',
    content: "No, I haven't. What happened?",
    timestamp: '1 hour ago'
  },
  {
    id: '5',
    senderId: '101',
    receiverId: 'currentUser',
    content: "A new language model just beat all previous benchmarks. It's pretty exciting!",
    timestamp: '30 minutes ago'
  }
]

const ConversationItem = ({ conversation, isActive, onClick }: { conversation: Conversation, isActive: boolean, onClick: () => void }) => (
  <div
    className={`flex items-center space-x-4 p-4 hover:bg-accent cursor-pointer ${isActive ? 'bg-accent' : ''}`}
    onClick={onClick}
  >
    <Avatar>
      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
      <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <p className="font-semibold truncate">{conversation.user.name}</p>
      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
    </div>
    <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
  </div>
)

const ChatMessage = ({ message, isCurrentUser }: { message: Message, isCurrentUser: boolean }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] p-3 rounded-lg ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
      <p>{message.content}</p>
      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
    </div>
  </div>
)

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you would send this message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left sidebar - Conversations list */}
      <div className="w-1/3 border-r border-border">
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-130px)]">
          {conversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={selectedConversation?.id === conversation.id}
              onClick={() => setSelectedConversation(conversation)}
            />
          ))}
        </ScrollArea>
      </div>

      {/* Chat display */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.user.name}</p>
                  <p className="text-sm text-muted-foreground">@{selectedConversation.user.username}</p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              {messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === 'currentUser'}
                />
              ))}
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="mt-2 text-xl font-semibold">Select a conversation</h2>
              <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
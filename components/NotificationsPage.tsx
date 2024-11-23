"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Repeat, User } from 'lucide-react'

type NotificationType = 'like' | 'retweet' | 'reply' | 'follow'

interface Notification {
  id: string
  type: NotificationType
  user: {
    name: string
    username: string
    avatar: string
  }
  content?: string
  timestamp: string
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />
      case 'retweet':
        return <Repeat className="h-5 w-5 text-green-500" />
      case 'reply':
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case 'follow':
        return <User className="h-5 w-5 text-purple-500" />
    }
  }

  const getMessage = (type: NotificationType) => {
    switch (type) {
      case 'like':
        return 'liked your tweet'
      case 'retweet':
        return 'retweeted your tweet'
      case 'reply':
        return 'replied to your tweet'
      case 'follow':
        return 'followed you'
    }
  }

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-accent">
      <div className="mt-1">{getIcon(notification.type)}</div>
      <Avatar>
        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">{notification.user.name}</span>{' '}
          {getMessage(notification.type)}
        </p>
        {notification.content && (
          <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Alice Johnson',
        username: 'alice_j',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: 'Great insights on AI ethics!',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'retweet',
      user: {
        name: 'Bob Smith',
        username: 'bob_smith',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: 'Check out this amazing thread on machine learning!',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'reply',
      user: {
        name: 'Carol White',
        username: 'carol_w',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: 'I completely agree with your points on data privacy.',
      timestamp: 'Yesterday'
    },
    {
      id: '4',
      type: 'follow',
      user: {
        name: 'David Brown',
        username: 'david_b',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      timestamp: '2 days ago'
    },
  ])

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold p-4">Notifications</h1>
      <Tabs defaultValue="all">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="mentions" className="flex-1">Mentions</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </TabsContent>
        <TabsContent value="mentions">
          {notifications
            .filter(notification => notification.type === 'reply')
            .map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
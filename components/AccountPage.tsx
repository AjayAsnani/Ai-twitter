import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, LinkIcon } from "lucide-react"


const user = {
  name: "John Doe",
  username: "johndoe",
  avatar: "https://miro.medium.com/v2/resize:fit:1020/1*jZ9v-2QShwnfCwHlEZCmDw.png",
  banner: "https://as1.ftcdn.net/v2/jpg/03/52/39/00/1000_F_352390061_Bem8aYkzfGhIObTC4fXhf0PmKQjWM1wN.jpg",
  bio: "AI enthusiast | Prompt engineer | Coffee lover",
  location: "San Francisco, CA",
  website: "https://johndoe.com",
  joinDate: "September 2021"
}

const userPosts = [
  {
    id: 1,
    content: "Just created a new AI model that can generate poetry in the style of Shakespeare. What do you think? #AI #NLP",
    likes: 42,
    comments: 7,
    shares: 3,
    date: "2h"
  },
  {
    id: 2,
    content: "Exploring the ethical implications of AI in healthcare. It's a fascinating and complex topic. What are your thoughts? #AIEthics #HealthTech",
    likes: 31,
    comments: 12,
    shares: 5,
    date: "1d"
  }
]

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <img src={user.banner} alt="User banner" className="w-full h-48 object-cover" />
        <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 border-4 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-16 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
        <p className="mt-2">{user.bio}</p>
        <div className="flex items-center mt-2 space-x-4 text-muted-foreground">
          <span className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-1" />
            {user.location}
          </span>
          <span className="flex items-center">
            <LinkIcon className="w-4 h-4 mr-1" />
            <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary">{user.website}</a>
          </span>
          <span className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            Joined {user.joinDate}
          </span>
        </div>
      </div>
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {userPosts.map(post => (
            <Card key={post.id} className="mb-4">
              <CardContent className="pt-6">
                <p>{post.content}</p>
                <div className="flex justify-between mt-4 text-muted-foreground">
                  <span>{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                  <span>{post.shares} Shares</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        {/* Add content for other tabs as needed */}
      </Tabs>
    </div>
  )
}
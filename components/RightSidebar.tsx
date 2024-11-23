import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const RightSidebar = () => {
  const user = {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://miro.medium.com/v2/resize:fit:1020/1*jZ9v-2QShwnfCwHlEZCmDw.png",
    bio: "AI enthusiast | Prompt engineer | Coffee lover"
  }

  const trendingHashtags = [
    { tag: "AIPrompts", count: 1234 },
    { tag: "MachineLearning", count: 987 },
    { tag: "GPT4", count: 876 },
    { tag: "PromptEngineering", count: 765 },
    { tag: "AIEthics", count: 654 }
  ]

  const whoToFollow = [
    { name: "Alice Johnson", username: "alice_ai", avatar: "https://i.pravatar.cc/150?img=1", bio: "AI researcher | PhD candidate" },
    { name: "Bob Smith", username: "bob_prompt", avatar: "https://i.pravatar.cc/150?img=2", bio: "Prompt engineer | Tech writer" },
    { name: "Carol Davis", username: "carol_ml", avatar: "https://i.pravatar.cc/150?img=3", bio: "Machine learning expert | Speaker" }
  ]

  return (
    <div className="w-[25%] p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search prompts" className="pl-8" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <p className="mt-2 text-sm">{user.bio}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trending Hashtags</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {trendingHashtags.map((hashtag) => (
              <li key={hashtag.tag} className="flex justify-between items-center">
                <span className="text-sm font-medium">#{hashtag.tag}</span>
                <span className="text-xs text-muted-foreground">{hashtag.count} prompts</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Whom to Follow</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {whoToFollow.map((person) => (
              <li key={person.username} className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">@{person.username}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                  <p className="text-xs mt-1">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default RightSidebar
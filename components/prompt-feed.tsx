"use client"

import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeartIcon, MessageCircleIcon, ShareIcon, ImageIcon, BarChartIcon, SmileIcon, PlusIcon, XIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import EmojiPicker from 'emoji-picker-react'

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Poll {
  question: string;
  options: string[];
  votes: number[];
}

interface Prompt {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  shares: number;
  image?: string;
  poll?: Poll;
  likedBy: number[];
  category: 'forYou' | 'following' | 'communities' | 'groups';
}

const CURRENT_USER = "You";
const CURRENT_USER_AVATAR = "https://i.pravatar.cc/150?img=5";

export default function PromptFeed() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following' | 'communities' | 'groups'>('forYou')
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: 1,
      author: "Alice",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "Describe a world where AI and humans coexist harmoniously. What does daily life look like? 🤖🌍",
      likes: 42,
      comments: [
        { id: 1, author: "Bob", avatar: "https://i.pravatar.cc/150?img=2", content: "Fascinating prompt! I'd love to explore this idea.", timestamp: "2 hours ago" },
        { id: 2, author: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", content: "This reminds me of a sci-fi novel I read recently.", timestamp: "1 hour ago" }
      ],
      shares: 3,
      image: "https://miro.medium.com/v2/da:true/resize:fit:1200/0*Gy8rkiBG7vMAErWe",
      likedBy: [],
      category: 'forYou'
    },
    {
      id: 2,
      author: "Bob",
      avatar: "https://i.pravatar.cc/150?img=2",
      content: "Write a short story about a sentient AI that falls in love with a human. How does it express its feelings? ❤️🤖",
      likes: 28,
      comments: [
        { id: 3, author: "Alice", avatar: "https://i.pravatar.cc/150?img=1", content: "This could be a great premise for a romantic comedy!", timestamp: "30 minutes ago" }
      ],
      shares: 2,
      poll: {
        question: "What should the AI do?",
        options: ["Confess its love", "Keep it secret", "Seek advice", "Deactivate itself"],
        votes: [10, 5, 8, 2]
      },
      likedBy: [],
      category: 'following'
    },
    {
      id: 3,
      author: "Charlie",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "What are some ethical considerations when developing AI for healthcare applications? 🏥🤔",
      likes: 35,
      comments: [
        { id: 4, author: "David", avatar: "https://i.pravatar.cc/150?img=4", content: "Privacy and data security should be top priorities.", timestamp: "45 minutes ago" }
      ],
      shares: 5,
      image: "https://aiworldschool.com/wp-content/uploads/2017/09/AI-Healthcare-1200x600-Article1.png",
      likedBy: [],
      category: 'communities'
    },
    {
      id: 4,
      author: "Diana",
      avatar: "https://i.pravatar.cc/150?img=4",
      content: "How can we use AI to address climate change and promote sustainability? 🌱🌍",
      likes: 50,
      comments: [
        { id: 5, author: "Eve", avatar: "https://i.pravatar.cc/150?img=5", content: "AI could optimize energy consumption in smart cities!", timestamp: "1 hour ago" }
      ],
      shares: 8,
      likedBy: [],
      category: 'groups'
    },
    {
      id: 5,
      author: "Eve",
      avatar: "https://i.pravatar.cc/150?img=5",
      content: "Imagine an AI-powered education system. How would it personalize learning for each student? 📚🤖",
      likes: 45,
      comments: [
        { id: 6, author: "Frank", avatar: "https://i.pravatar.cc/150?img=6", content: "It could adapt to each student's learning style and pace.", timestamp: "2 hours ago" }
      ],
      shares: 7,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXg7L6LZniiiZuJzbXXif8ALmh8rZ4tvB1GQ&s",
      likedBy: [],
      category: 'forYou'
    },
    {
      id: 6,
      author: "Frank",
      avatar: "https://i.pravatar.cc/150?img=6",
      content: "What are the potential implications of AI in creative fields like art and music? 🎨🎵",
      likes: 33,
      comments: [
        { id: 7, author: "Grace", avatar: "https://i.pravatar.cc/150?img=7", content: "AI could revolutionize how we create and experience art!", timestamp: "3 hours ago" }
      ],
      shares: 4,
      likedBy: [],
      category: 'following'
    },
    {
      id: 7,
      author: "Grace",
      avatar: "https://i.pravatar.cc/150?img=7",
      content: "How might AI impact the job market in the next decade? Discuss potential new careers and obsolete ones. 💼🔮",
      likes: 55,
      comments: [
        { id: 8, author: "Henry", avatar: "https://i.pravatar.cc/150?img=8", content: "We'll need more AI ethicists and machine learning specialists.", timestamp: "4 hours ago" }
      ],
      shares: 9,
      poll: {
        question: "Will AI create more jobs than it eliminates?",
        options: ["Yes", "No", "It will balance out"],
        votes: [20, 15, 25]
      },
      likedBy: [],
      category: 'communities'
    },
    {
      id: 8,
      author: "Henry",
      avatar: "https://i.pravatar.cc/150?img=8",
      content: "Describe an AI-assisted scientific breakthrough that could revolutionize space exploration. 🚀🔬",
      likes: 48,
      comments: [
        { id: 9, author: "Ivy", avatar: "https://i.pravatar.cc/150?img=9", content: "AI could help us decode alien signals or optimize spacecraft trajectories!", timestamp: "5 hours ago" }
      ],
      shares: 7,
      image: "https://www.technology-innovators.com/wp-content/uploads/2024/04/Space-Intelligence-How-AI-is-Revolutionizing-Space-Exploration-Satellite-Communications-and-Astronaut-Assistance-min.jpg",
      likedBy: [],
      category: 'groups'
    }
  ])

  const [newPrompt, setNewPrompt] = useState('')
  const [newImage, setNewImage] = useState<string | null>(null)
  const [isPollActive, setIsPollActive] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [newComment, setNewComment] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPrompt.trim()) {
      const prompt: Prompt = {
        id: prompts.length + 1,
        author: CURRENT_USER,
        avatar: CURRENT_USER_AVATAR,
        content: newPrompt,
        likes: 0,
        comments: [],
        shares: 0,
        image: newImage || undefined,
        poll: isPollActive && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2
          ? {
              question: pollQuestion,
              options: pollOptions.filter(o => o.trim()),
              votes: new Array(pollOptions.filter(o => o.trim()).length).fill(0)
            }
          : undefined,
        likedBy: [],
        category: activeTab
      }
      setPrompts([prompt, ...prompts])
      setNewPrompt('')
      setNewImage(null)
      setIsPollActive(false)
      setPollQuestion('')
      setPollOptions(['', ''])
    }
  }

  const handleLike = (id: number) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id
        ? prompt.likedBy.includes(1)
          ? { ...prompt, likes: prompt.likes - 1, likedBy: prompt.likedBy.filter(userId => userId !== 1) }
          : { ...prompt, likes: prompt.likes + 1, likedBy: [...prompt.likedBy, 1] }
        : prompt
    ))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setNewPrompt(prev => prev + emojiObject.emoji)
  }

  const handleVote = (promptId: number, optionIndex: number) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === promptId && prompt.poll ? 
      {
        ...prompt,
        poll: {
          ...prompt.poll,
          votes: prompt.poll.votes.map((vote, index) => 
            index === optionIndex ? vote + 1 : vote
          )
        }
      } : prompt
    ))
  }

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ''])
    }
  }

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index))
    }
  }

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const handleAddComment = (promptId: number) => {
    if (newComment.trim()) {
      setPrompts(prompts.map(prompt =>
        prompt.id === promptId
          ? {
              ...prompt,
              comments: [
                ...prompt.comments,
                { 
                  id: prompt.comments.length + 1, 
                  author: CURRENT_USER, 
                  avatar: CURRENT_USER_AVATAR,
                  content: newComment.trim(),
                  timestamp: "Just now"
                }
              ]
            }
          : prompt
      ))
      setNewComment('')
    }
  }

  const handleShare = (promptId: number) => {
    setPrompts(prompts.map(prompt =>
      prompt.id === promptId
        ? { ...prompt, shares: prompt.shares + 1 }
        : prompt
    ))
    // In a real app, you would implement actual sharing functionality here
    alert("Prompt shared!")
  }

  const handleDelete = (promptId: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== promptId))
  }

  const renderPromptForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <h2 className="text-lg font-semibold text-primary">Share a new prompt</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="What's your LLM prompt?"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="h-4 w-4" />
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="icon">
                    <SmileIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </PopoverContent>
              </Popover>
              <Button type="button" variant="outline" size="icon" onClick={() => setIsPollActive(!isPollActive)}>
                <BarChartIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit">Share Prompt</Button>
          </div>
          {newImage && (
            <div className="mt-2 mb-2">
              <img src={newImage} alt="Uploaded preview" className="max-h-60 rounded-md" />
            </div>
          )}
          {isPollActive && (
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Ask a question..."
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                  />
                  {index > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePollOption(index)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {pollOptions.length < 4 && (
                <Button type="button" variant="outline" onClick={addPollOption}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )

  const renderPrompts = (category: 'forYou' | 'following' | 'communities' | 'groups') => (
    <>
      {prompts.filter(prompt => prompt.category === category).map(prompt => (
        <Card key={prompt.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={prompt.avatar} alt={prompt.author} />
                  <AvatarFallback>{prompt.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-primary">{prompt.author}</p>
                </div>
              </div>
              {prompt.author === CURRENT_USER && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDelete(prompt.id)}>
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary whitespace-pre-wrap">{prompt.content}</p>
            {prompt.image && (
              <img src={prompt.image} alt="Prompt image" className="mt-2 rounded-md max-h-80 w-full object-cover" />
            )}
            {prompt.poll && (
              <div className="mt-4">
                <p className="font-semibold mb-2">{prompt.poll.question}</p>
                {prompt.poll.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleVote(prompt.id, index)}
                    >
                      {option}
                      <span>{Math.round((prompt.poll!.votes[index] / prompt.poll!.votes.reduce((a, b) => a + b, 0)) * 100)}%</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleLike(prompt.id)}
                className={prompt.likedBy.includes(1) ? "text-red-500" : ""}
              >
                <HeartIcon className="mr-2 h-4 w-4" />
                {prompt.likes}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MessageCircleIcon className="mr-2 h-4 w-4" />
                    {prompt.comments.length}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[300px] w-full pr-4">
                    {prompt.comments.map(comment => (
                      <div key={comment.id} className="mb-4 flex items-start">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-semibold text-sm">{comment.author}</p>
                            <p className="text-xs text-muted-foreground ml-2">{comment.timestamp}</p>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="mt-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={() => handleAddComment(prompt.id)}>Post Comment</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={() => handleShare(prompt.id)}>
                <ShareIcon className="mr-2 h-4 w-4" />
                {prompt.shares}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  )

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Share Feed</h1>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="forYou" className="flex-1">For You</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
          <TabsTrigger value="communities" className="flex-1">Communities</TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="forYou">
          {renderPromptForm()}
          {renderPrompts('forYou')}
        </TabsContent>

        <TabsContent value="following">
          {renderPromptForm()}
          {renderPrompts('following')}
        </TabsContent>

        <TabsContent value="communities">
          {renderPromptForm()}
          {renderPrompts('communities')}
        </TabsContent>

        <TabsContent value="groups">
          {renderPromptForm()}
          {renderPrompts('groups')}
        </TabsContent>
      </Tabs>
    </div>
  )
}
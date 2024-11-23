"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Settings } from 'lucide-react'

interface TrendingTopic {
  title: string
  category: string
  tweetCount: string
}

interface Event {
  title: string
  description: string
  imageUrl: string
}

interface NewsItem {
  title: string
  source: string
  timeAgo: string
}

const trendingTopics: TrendingTopic[] = [
  { title: "AI Ethics", category: "Technology", tweetCount: "125K Tweets" },
  { title: "#MachineLearning", category: "Technology", tweetCount: "89.7K Tweets" },
  { title: "Data Science Jobs", category: "Careers", tweetCount: "52.3K Tweets" },
  { title: "Python Tips", category: "Programming", tweetCount: "34.1K Tweets" },
  { title: "Tech Innovations 2024", category: "Technology", tweetCount: "28.9K Tweets" },
]

const events: Record<string, Event[]> = {
  forYou: [
    {
      title: "AI Conference 2024",
      description: "Join the world's leading AI researchers and practitioners",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvZz376jECDtD1o1i4GwsV1U02OmM-iERjw&s"
    },
    {
      title: "Data Science Summit",
      description: "Explore the latest trends in data science and analytics",
      imageUrl: "https://ml.dssconf.pl/static/dssml24-og-en.png"
    },
  ],
  trending: [
    {
      title: "Blockchain Expo",
      description: "Discover the future of decentralized technologies",
      imageUrl: "https://moniwar.io/wp-content/uploads/2022/05/5.png"
    },
    {
      title: "Startup Pitch Night",
      description: "Watch innovative startups compete for funding",
      imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/et00363690-hlehvtcfhe-landscape.jpg"
    },
  ],
  news: [
    {
      title: "Tech Policy Forum",
      description: "Discussing the impact of technology on society and policy",
      imageUrl: "https://forum-europe.com/cms-data/news/Twitter%20Banner%20Final%2006.05-1396.jpg"
    },
    {
      title: "Cybersecurity Symposium",
      description: "Learn about the latest threats and defense strategies",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3f2Z-fPo4N0z8vCmVhtOdAAsY2oSomJCppw&s"
    },
  ],
  sports: [
    {
      title: "E-Sports Championship",
      description: "Watch top gamers compete in the biggest e-sports event of the year",
      imageUrl: "https://media.assettype.com/afkgaming%2F2023-09%2F145df742-d37d-4f19-aa7d-204ae82bc102%2FCover_Image___List_Of_Upcoming_Indian_Esports_Tournaments_In_September_2023.jpg?dpr=2.0&w=1200"
    },
    {
      title: "Sports Analytics Conference",
      description: "Explore how data is changing the world of sports",
      imageUrl: "https://news.mit.edu/sites/default/files/images/201703/MIT-SSAC-1.jpg"
    },
  ],
  entertainment: [
    {
      title: "VR Film Festival",
      description: "Experience the future of cinema in virtual reality",
      imageUrl: "https://i.ytimg.com/vi/X1VlshluO1c/maxresdefault.jpg"
    },
    {
      title: "AI in Music Showcase",
      description: "Listen to compositions created by artificial intelligence",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_a31s-hhG_oCXnaqDU3vKylmkhEfjKvCmg&s"
    },
  ],
}

const newsItems: NewsItem[] = [
  { title: "Breakthrough in Quantum Computing Announced", source: "Tech News Daily", timeAgo: "2 hours ago" },
  { title: "New AI Model Surpasses Human Performance in Medical Diagnosis", source: "AI Insider", timeAgo: "4 hours ago" },
  { title: "Global Tech Conference Highlights Emerging Technologies", source: "Innovation Today", timeAgo: "1 day ago" },
]

const sportsNews: NewsItem[] = [
  { title: "Local Team Wins Championship in Thrilling Finale", source: "Sports Central", timeAgo: "3 hours ago" },
  { title: "Star Player Signs Record-Breaking Contract", source: "Athletes Weekly", timeAgo: "6 hours ago" },
  { title: "Olympic Committee Announces New Events for 2028 Games", source: "Olympic News", timeAgo: "1 day ago" },
]

const entertainmentNews: NewsItem[] = [
  { title: "Blockbuster Movie Breaks Box Office Records", source: "Entertainment Tonight", timeAgo: "5 hours ago" },
  { title: "Celebrity Couple Announces Surprise Wedding", source: "Star Gazette", timeAgo: "8 hours ago" },
  { title: "Popular TV Series Renewed for Three More Seasons", source: "TV Guide", timeAgo: "1 day ago" },
]

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const renderTrendingTopics = () => (
    <div className="bg-accent rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">Trends for you</h2>
      {trendingTopics.map((topic, index) => (
        <div key={index} className="py-2">
          <p className="text-xs text-muted-foreground">{topic.category}</p>
          <p className="font-semibold">{topic.title}</p>
          <p className="text-xs text-muted-foreground">{topic.tweetCount}</p>
        </div>
      ))}
    </div>
  )

  const renderEvents = (categoryEvents: Event[]) => (
    <>
      {categoryEvents.map((event, index) => (
        <div key={index} className="rounded-lg overflow-hidden border border-border mb-4">
          <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
        </div>
      ))}
    </>
  )

  const renderNewsItems = (items: NewsItem[]) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-b border-border pb-4 last:border-b-0">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.source} · {item.timeAgo}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 bg-background z-10 p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search LLM Prompts"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="for-you" className="mt-4">
        <TabsList className="w-full justify-start px-4">
          <TabsTrigger value="for-you">For you</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="p-4 space-y-4">
          {renderEvents(events.forYou)}
          {renderTrendingTopics()}
        </TabsContent>
        <TabsContent value="trending" className="p-4 space-y-4">
          {renderEvents(events.trending)}
          {renderTrendingTopics()}
        </TabsContent>
        <TabsContent value="news" className="p-4 space-y-4">
          {renderEvents(events.news)}
          <h2 className="font-bold text-xl mb-4">Top News</h2>
          {renderNewsItems(newsItems)}
        </TabsContent>
        <TabsContent value="sports" className="p-4 space-y-4">
          {renderEvents(events.sports)}
          <h2 className="font-bold text-xl mb-4">Sports News</h2>
          {renderNewsItems(sportsNews)}
        </TabsContent>
        <TabsContent value="entertainment" className="p-4 space-y-4">
          {renderEvents(events.entertainment)}
          <h2 className="font-bold text-xl mb-4">Entertainment News</h2>
          {renderNewsItems(entertainmentNews)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExplorePage
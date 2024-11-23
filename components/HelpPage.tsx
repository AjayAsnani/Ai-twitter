"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ChevronRight } from 'lucide-react'

const helpCategories = [
  { 
    title: "Getting started", 
    icon: "🚀",
    articles: [
      { title: "How to create an account", content: "To create an account, follow these steps: 1. Click on 'Sign Up'...", link: "#create-account" },
      { title: "Setting up your profile", content: "To set up your profile: 1. Go to Settings > Profile...", link: "#setup-profile" },
      { title: "Navigating the dashboard", content: "The dashboard is your central hub. Here you can find...", link: "#navigate-dashboard" },
    ]
  },
  { 
    title: "Account and profile", 
    icon: "👤",
    articles: [
      { title: "Changing your password", content: "To change your password: 1. Go to Settings > Security...", link: "#change-password" },
      { title: "Updating email preferences", content: "To update your email preferences: 1. Go to Settings > Notifications...", link: "#email-preferences" },
      { title: "Managing connected apps", content: "To manage apps connected to your account: 1. Go to Settings > Apps...", link: "#manage-apps" },
    ]
  },
  { 
    title: "Privacy and safety", 
    icon: "🔒",
    articles: [
      { title: "Understanding privacy settings", content: "Your privacy is important to us. Here's how our privacy settings work...", link: "#privacy-settings" },
      { title: "Blocking and muting users", content: "To block or mute a user: 1. Go to their profile...", link: "#block-mute" },
      { title: "Reporting inappropriate content", content: "If you see inappropriate content, here's how to report it...", link: "#report-content" },
    ]
  },
  { 
    title: "Prompts and interactions", 
    icon: "💬",
    articles: [
      { title: "Creating effective prompts", content: "To create effective prompts: 1. Be specific...", link: "#effective-prompts" },
      { title: "Interacting with AI responses", content: "When interacting with AI responses, keep in mind...", link: "#ai-interactions" },
      { title: "Sharing and saving prompts", content: "To share or save a prompt: 1. Click on the share button...", link: "#share-save-prompts" },
    ]
  },
  { 
    title: "Notifications", 
    icon: "🔔",
    articles: [
      { title: "Customizing your notifications", content: "To customize your notifications: 1. Go to Settings > Notifications...", link: "#customize-notifications" },
      { title: "Managing email alerts", content: "To manage your email alerts: 1. Go to Settings > Email...", link: "#email-alerts" },
      { title: "Push notifications on mobile", content: "To set up push notifications on mobile: 1. Open the app...", link: "#push-notifications" },
    ]
  },
  { 
    title: "Troubleshooting", 
    icon: "🔧",
    articles: [
      { title: "Common login issues", content: "If you're having trouble logging in, try these steps...", link: "#login-issues" },
      { title: "App performance problems", content: "If the app is running slowly, here are some things to try...", link: "#performance-issues" },
      { title: "Contacting support", content: "If you need further assistance, here's how to contact our support team...", link: "#contact-support" },
    ]
  },
]

const faqItems = [
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign Up' button on the homepage. Follow the prompts to enter your email, create a password, and set up your profile."
  },
  {
    question: "How can I change my password?",
    answer: "To change your password, go to Settings > Account > Password. You'll need to enter your current password and then your new password twice to confirm."
  },
  {
    question: "What are LLM prompts?",
    answer: "LLM prompts are text inputs given to large language models to generate responses. They can be questions, statements, or instructions that guide the AI in producing relevant and coherent text outputs."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "To report inappropriate content, click on the three dots (...) next to the prompt or comment, then select 'Report'. Choose the reason for reporting and submit the form."
  },
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for help"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {helpCategories.map((category, index) => (
          <Card key={index} className="hover:bg-accent cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2 text-2xl">{category.icon}</span>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0">
                    View articles <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{category.title}</DialogTitle>
                    <DialogDescription>Browse articles related to {category.title.toLowerCase()}.</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {category.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{article.content}</p>
                        <Button variant="link" className="p-0" asChild>
                          <a href={article.link}>Read more</a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
          <CardDescription>Contact our support team for further assistance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Home, 
  Bell, 
  Hash, 
  Mail, 
  User, 
  MoreHorizontal, 
  Feather,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [user] = useState({
    name: 'John Doe',
    username: 'johndoe',
    avatar: "https://miro.medium.com/v2/resize:fit:1020/1*jZ9v-2QShwnfCwHlEZCmDw.png",
  })

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Hash, label: 'Explore', href: '/explore' },
    { icon: Mail, label: 'Messages', href: '/messages' },
    { icon: User, label: 'Profile', href: '/account' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help Center', href: '/help' },
    { icon: ShieldCheck, label: 'Premium', href: '' },
  ]

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...')
    // For example:
    // logout().then(() => router.push('/login'))
  }

  const handleProfileClick = () => {
    router.push('/account')
  }

  const handleSettingsClick = () => {
    router.push('/settings')
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-background border-r border-border w-[30%]">
      <div className="flex-1">
        <div className="mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
              <Feather className="h-6 w-6 text-primary" />
            </Button>
          </Link>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start text-left font-normal"
              onClick={() => router.push(item.href)}
            >
              <item.icon className="mr-4 h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-left font-normal">
                <MoreHorizontal className="mr-4 h-5 w-5" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/help')}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Sidebar
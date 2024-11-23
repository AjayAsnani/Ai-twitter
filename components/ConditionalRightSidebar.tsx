'use client'

import { usePathname } from 'next/navigation'
import RightSidebar from '@/components/RightSidebar'

export default function ConditionalRightSidebar() {
  const pathname = usePathname()
  const isMessagePage = pathname.startsWith('/messages')

  if (isMessagePage) {
    return null
  }

  return <RightSidebar />
}
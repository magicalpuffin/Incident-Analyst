"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ChatLayout } from "@/components/incidents/chat-layout"
import { Nav } from "@/components/nav"
import { ChatProvider } from '@/lib/chat-context'
import {
  Archive,
  AlertCircle,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash,
  Users
} from "lucide-react";


export default function Home() {
  return (
    <ChatProvider>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full max-h-screen items-stretch"
        >
          <ResizablePanel defaultSize={265} minSize={200} maxSize={300}>
            <Nav
              isCollapsed={false}
              links={[
                {
                  title: "Inbox",
                  label: "128",
                  icon: "inbox",
                  variant: "default",
                },
                {
                  title: "Drafts",
                  label: "9",
                  icon: "file",
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "",
                  icon: "send",
                  variant: "ghost",
                },
                {
                  title: "Junk",
                  label: "23",
                  icon: "archive",
                  variant: "ghost",
                },
                {
                  title: "Trash",
                  label: "",
                  icon: "trash",
                  variant: "ghost",
                },
                {
                  title: "Archive",
                  label: "",
                  icon: "archive",
                  variant: "ghost",
                },
              ]}
            />
            <Separator />
            <Nav
              isCollapsed={false}
              links={[
                {
                  title: "Social",
                  label: "972",
                  icon: "users",
                  variant: "ghost",
                },
                {
                  title: "Updates",
                  label: "342",
                  icon: "alertCircle",
                  variant: "ghost",
                },
                {
                  title: "Forums",
                  label: "128",
                  icon: "messagesSquare",
                  variant: "ghost",
                },
                {
                  title: "Shopping",
                  label: "8",
                  icon: "shoppingCart",
                  variant: "ghost",
                },
                {
                  title: "Promotions",
                  label: "21",
                  icon: "archive",
                  variant: "ghost",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={855}>
            <ChatLayout defaultLayout={undefined} navCollapsedSize={8} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </ChatProvider>
  )
}
"use client"

import {
  AlertCircle,
  Archive,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: string
    variant: "default" | "ghost"
  }[]
}

const iconMap = {
  inbox: Inbox,
  file: File,
  send: Send,
  archive: Archive,
  trash: Trash,
  users: Users,
  alertCircle: AlertCircle,
  messagesSquare: MessagesSquare,
  shoppingCart: ShoppingCart,
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap]
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="#"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      link.variant === "default" && "bg-muted text-primary",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {!isCollapsed && (
                      <>
                        <span>{link.title}</span>
                        {link.label && (
                          <span
                            className={cn(
                              "ml-auto",
                              link.variant === "default" &&
                                "text-background dark:text-white"
                            )}
                          >
                            {link.label}
                          </span>
                        )}
                      </>
                    )}
                  </a>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {link.title}
                    {link.label && ` (${link.label})`}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </nav>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown } from "lucide-react"

interface AddToCalendarProps {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}

export function AddToCalendar({ title, description, location, startDate, endDate }: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Formatar datas para o formato ISO
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  // Google Calendar URL
  const googleCalendarUrl = () => {
    const baseUrl = "https://calendar.google.com/calendar/render"
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    })

    return `${baseUrl}?${params.toString()}`
  }

  // Outlook.com URL
  const outlookUrl = () => {
    const baseUrl = "https://outlook.live.com/calendar/0/deeplink/compose"
    const params = new URLSearchParams({
      subject: title,
      body: description,
      location,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      path: "/calendar/action/compose",
      rru: "addevent",
    })

    return `${baseUrl}?${params.toString()}`
  }

  // Yahoo Calendar URL
  const yahooUrl = () => {
    const baseUrl = "https://calendar.yahoo.com/"
    const params = new URLSearchParams({
      title,
      desc: description,
      in_loc: location,
      st: formatDate(startDate),
      et: formatDate(endDate),
      v: "60",
    })

    return `${baseUrl}?${params.toString()}`
  }

  // iCal file (for Apple Calendar)
  const generateICalFile = () => {
    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icalContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Adicionar ao Calendário
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => window.open(googleCalendarUrl(), "_blank")}>Google Calendar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(outlookUrl(), "_blank")}>Outlook.com</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(yahooUrl(), "_blank")}>Yahoo Calendar</DropdownMenuItem>
        <DropdownMenuItem onClick={generateICalFile}>Apple Calendar (iCal)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

type GridListToggleProps = {
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
}

export function GridListToggle({ view, setView }: GridListToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <Button
        variant={view === "list" ? "outline" : "ghost"}
        size="icon"
        onClick={() => setView("list")}
        className={
          view === "list" ? "bg-background shadow-sm" : ""
        }
      >
        <List className="h-5 w-5" />
      </Button>
      <Button
        variant={view === "grid" ? "outline" : "ghost"}
        size="icon"
        onClick={() => setView("grid")}
        className={
            view === "grid" ? "bg-background shadow-sm" : ""
        }
      >
        <LayoutGrid className="h-5 w-5" />
      </Button>
    </div>
  )
}

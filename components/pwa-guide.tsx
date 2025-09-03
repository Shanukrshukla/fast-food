"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Smartphone, Download, Share2, Home, Chrome, Globe, Monitor } from "lucide-react"

export default function PWAGuide() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Smartphone className="h-4 w-4" />
          How to Install
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-red-600" />
            Install Chinese Adda App
          </DialogTitle>
          <DialogDescription>
            Get the app-like experience with offline access and faster loading
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Android/Chrome */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Monitor className="h-4 w-4 text-blue-600" />
              <span>Android / Chrome</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
              <li>Tap the menu button (⋮) in Chrome</li>
              <li>Select "Add to Home screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>

          {/* iOS/Safari */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>iPhone / Safari</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
              <li>Tap the Share button (square with arrow)</li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>

          {/* Desktop */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Home className="h-4 w-4 text-green-600" />
              <span>Desktop / Windows</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
              <li>Click the install icon (📱) in the address bar</li>
              <li>Click "Install" in the popup</li>
              <li>The app will appear on your desktop</li>
            </ol>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              💡 Tip: Once installed, the app will work offline and load faster!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

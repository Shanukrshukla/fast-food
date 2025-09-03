"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Smartphone } from "lucide-react"

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)

    const onBeforeInstall = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setOpen(true)
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setOpen(false)
    setDeferredPrompt(null)
  }

  const handleIOSInstall = () => {
    setOpen(false)
    // Show iOS installation instructions
    alert("To install Chinese Adda:\n1. Tap the Share button (square with arrow)\n2. Tap 'Add to Home Screen'\n3. Tap 'Add'")
  }

  if (!open) return null

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 px-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-md rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl border-0 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white mb-1">Install Chinese Adda</div>
            <div className="text-sm text-red-100">
              {isIOS 
                ? "Add to home screen for app-like experience" 
                : "Get faster access and offline features"
              }
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-white hover:bg-white/20 p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Not now
          </Button>
          <Button
            size="sm"
            onClick={isIOS ? handleIOSInstall : handleInstall}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            {isIOS ? "How to Install" : "Install"}
          </Button>
        </div>
      </div>
    </div>
  )
}

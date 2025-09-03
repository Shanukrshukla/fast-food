const CACHE_NAME = "chinese-adda-v2"
const STATIC_CACHE = "chinese-adda-static-v2"
const DYNAMIC_CACHE = "chinese-adda-dynamic-v2"

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/images/chinese-adda-logo.png",
  "/hakka-noodles.png",
  "/veg-momos.png",
  "/fried-rice.png",
  "/chilli-paneer.png",
  "/hot-and-sour-soup.png",
  "/meal-combo.png",
  "/momos.png",
  "/noodles.png",
  "/dish.png",
  "/popular-dish.png"
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE)
    ])
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache when possible
self.addEventListener("fetch", (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== "GET") return
  
  // Handle different types of requests
  if (request.destination === "image") {
    // Cache images aggressively
    event.respondWith(cacheFirst(request))
  } else if (request.destination === "document") {
    // For HTML pages, try network first, fallback to cache
    event.respondWith(networkFirst(request))
  } else {
    // For other resources, try cache first, fallback to network
    event.respondWith(cacheFirst(request))
  }
})

// Cache first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    // Return a fallback response if available
    if (request.destination === "image") {
      return caches.match("/dish.png")
    }
    throw error
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    throw error
  }
}

// Background sync for offline orders
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle background sync for offline functionality
  console.log("Background sync triggered")
}

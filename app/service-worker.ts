/// <reference lib="webworker" />

// Este arquivo contém o código do Service Worker para cache e experiência offline
// Ele será compilado e disponibilizado em /service-worker.js

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "inpulse-cache-v1"

// Lista de recursos para pré-cache
const PRECACHE_ASSETS = ["/", "/blog", "/galeria", "/obrigado", "/manifest.json", "/favicon.ico", "/logo.png"]

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS)
    }),
  )
  // Força a ativação imediata do service worker
  self.skipWaiting()
})

// Ativação do Service Worker
self.addEventListener("activate", (event) => {
  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          }),
      )
    }),
  )
  // Tomar controle de clientes não controlados
  self.clients.claim()
})

// Estratégia de cache: Network First com fallback para cache
self.addEventListener("fetch", (event) => {
  // Ignorar requisições não GET ou para outros domínios
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Ignorar requisições para a API
  if (event.request.url.includes("/api/")) {
    return
  }

  // Estratégia para imagens: Cache First
  if (event.request.destination === "image" || event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(event.request).then((response) => {
          // Não armazenar em cache se a resposta não for válida
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Armazenar em cache uma cópia da resposta
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      }),
    )
    return
  }

  // Estratégia para HTML e outros recursos: Network First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Não armazenar em cache se a resposta não for válida
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Armazenar em cache uma cópia da resposta
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Se a rede falhar, tente o cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Se não estiver no cache e for uma página HTML, retorne a página offline
          if (event.request.headers.get("Accept")?.includes("text/html")) {
            return caches.match("/")
          }

          // Caso contrário, retorne um erro
          return new Response("Não foi possível carregar o recurso", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
  )
})

// Evento de sincronização em segundo plano
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-form-data") {
    event.waitUntil(syncFormData())
  }
})

// Função para sincronizar dados de formulários
async function syncFormData() {
  // Implementação da sincronização de dados de formulários
  // quando o usuário estiver offline
}

// Evento de push para notificações
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {}

  event.waitUntil(
    self.registration.showNotification(data.title || "INpulse Notification", {
      body: data.body || "Novidades do INpulse!",
      icon: "/logo.png",
      badge: "/favicon.ico",
      data: data.url || "/",
    }),
  )
})

// Evento de clique em notificação
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      // Se já tiver uma janela aberta, foque nela
      for (const client of clientList) {
        if (client.url === event.notification.data && "focus" in client) {
          return client.focus()
        }
      }
      // Caso contrário, abra uma nova janela
      if (self.clients.openWindow) {
        return self.clients.openWindow(event.notification.data)
      }
    }),
  )
})

export {}

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    // Registrar o service worker
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration.scope)
        })
        .catch((error) => {
          console.error("Falha ao registrar o Service Worker:", error)
        })
    })
  }
}

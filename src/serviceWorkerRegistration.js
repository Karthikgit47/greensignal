
// serviceWorkerRegistration.js

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = process.env.PUBLIC_URL + "/service-worker.js";
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker Registered:", registration);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }

            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("New content is available; please refresh.");
                } else {
                  console.log("Content is cached for offline use.");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("Service Worker Registration Failed:", error);
        });
    });
  }
}


// export function register() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker
//         .register('/service-worker.js')
//         .then(() => console.log('Service Worker Registered'))
//         .catch((err) => console.log('SW Error', err));
//     });
//   }
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then((registration) => {
//       registration.unregister();
//     });
//   }
// }

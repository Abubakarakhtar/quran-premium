const SHELL='quran-shell-v6',DATA='quran-offline-v6',RUNTIME='quran-runtime-v6';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const QURAN=['https://api.alquran.cloud/v1/quran/quran-uthmani','https://api.alquran.cloud/v1/quran/ur.jalandhry','https://api.alquran.cloud/v1/surah'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const shell=await caches.open(SHELL);await shell.addAll(FILES);const data=await caches.open(DATA);await Promise.all(QURAN.map(async u=>{try{if(!await data.match(u)){const r=await fetch(u);if(r.ok)await data.put(u,r.clone())}}catch(e){}}));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url);
if(u.origin===self.location.origin){event.respondWith(caches.match(event.request).then(x=>x||fetch(event.request).then(r=>{if(r.ok)caches.open(RUNTIME).then(c=>c.put(event.request,r.clone()));return r}).catch(()=>caches.match('./index.html'))));return}
if(u.hostname==='api.alquran.cloud'){event.respondWith(caches.open(DATA).then(async c=>{const cached=await c.match(event.request);if(cached)return cached;try{const r=await fetch(event.request);if(r.ok)c.put(event.request,r.clone());return r}catch(e){throw e}}));return}
if(u.hostname==='cdn.islamic.network'&&u.pathname.endsWith('.mp3')){event.respondWith(caches.match(event.request).then(x=>x||fetch(event.request)));return}
});
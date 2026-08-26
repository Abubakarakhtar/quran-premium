const SHELL='quran-shell-v4',RUNTIME='quran-runtime-v4',AUDIO='quran-audio-v1',FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
if(u.origin===location.origin){e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{const c=r.clone();caches.open(RUNTIME).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match('./index.html'))));return}
if(u.hostname==='cdn.islamic.network'&&u.pathname.endsWith('.mp3')){e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request)));return}
if(u.hostname==='api.alquran.cloud'||u.hostname==='api.aladhan.com'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(RUNTIME).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request)));}});

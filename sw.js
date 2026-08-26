const CACHE="alquran-premium-v5",QURAN="alquran-text-v3";
const SHELL=["./","./index.html","./manifest.json","./icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith("alquran-premium-")).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const r=e.request,u=new URL(r.url); if(r.method!=="GET")return;
 if(u.origin==="https://api.alquran.cloud"){
   e.respondWith(fetch(r).then(res=>{if(res.ok)caches.open(QURAN).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match(r))); return;
 }
 if(u.origin==="https://cdn.islamic.network"||u.origin==="https://everyayah.com"){
   e.respondWith(fetch(r)); return;
 }
 if(u.origin===self.location.origin){
   e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(x=>x.put(r,res.clone()));return res})));
 }
});
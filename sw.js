const C='wms-ghpages-20261120';
const FILES=['./','index.html','manifest.json','apple-touch-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const fromCache=()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'));
 e.respondWith(fetch(e.request).then(r=>{if(!r.ok)return fromCache().then(c=>c||r);const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(fromCache));});

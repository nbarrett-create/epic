// EPIC phone notifications. v1
var HQ='https://script.google.com/a/macros/epicbuilding.com/s/AKfycby8CQu3ZtGyFxNxF6R1qzG99e3ku-wlWG7wUe4A2_RU7dB8YUXVZEmdILzGEq2-4KKKdQ/exec';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(){});
self.addEventListener('push',function(e){var d={};try{d=e.data?e.data.json():{};}catch(x){d={body:e.data?e.data.text():''};}
 var show=self.registration.showNotification(d.title||'EPICBUILDING',{body:d.body||'',icon:'icon-192.png',badge:'badge-96.png',tag:d.tag||undefined,renotify:!!d.tag,data:d});
 var badge=self.navigator&&self.navigator.setAppBadge?self.navigator.setAppBadge().catch(function(){}):Promise.resolve();
 e.waitUntil(Promise.all([show,badge]));});
self.addEventListener('notificationclick',function(e){e.notification.close();var d=e.notification.data||{};
 if(d.app==='hq'){e.waitUntil(self.clients.openWindow(HQ));return;}
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
  if(cs.length){cs[0].postMessage({type:'open',data:d});return cs[0].focus();}
  return self.clients.openWindow('./'+(d.go?'?go='+encodeURIComponent(JSON.stringify(d.go)):''));}));});

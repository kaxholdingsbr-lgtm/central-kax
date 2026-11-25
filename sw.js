// Central KAX: recebe as notificações no celular
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { titulo: 'Central KAX', corpo: e.data ? e.data.text() : '' }; }
  var icone = 'https://kaxholdingsbr-lgtm.github.io/central-kax/icone-192.png';
  var opt = { body: d.corpo || '', icon: icone, badge: icone, tag: d.tag || undefined, data: { url: d.url || './' } };
  if (d.imagem) opt.image = d.imagem;
  if (d.urgente) { opt.requireInteraction = true; opt.vibrate = [300, 120, 300, 120, 300]; }
  e.waitUntil(self.registration.showNotification(d.titulo || 'Central KAX', opt));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (lista) {
    for (var i = 0; i < lista.length; i++) { if ('focus' in lista[i]) return lista[i].focus(); }
    return self.clients.openWindow(url);
  }));
});

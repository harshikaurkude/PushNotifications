console.log('Service Worker loaded..');

self.addEventListener('push',e=>{
    const data=e.data.json();
    //console.log(data);
    console.log('Push Received');

    self.registration.showNotification(data.title,{
        body:'My first Push Notification'
    });
});

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    //var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('http://www.google.com','_blank');
      notification.close();
    }
  });
  self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    //var primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
  });


const publicVapidKey="BGVenUUuf_co-qU6uZCMFAzZ23WOzzJ4HpBqtQeqkFSg6vYeR73yWtl3YSLYwOBagzROF60N4SKu5tIs87bCprI";

//Check for service Worker,navigator is an api
if('serviceWorker' in navigator)
{
    send().catch(err=>console.error(err));
}


//Register a service worker,Register push,Send push notification
async function send(){
//Register service worker
    console.log('Registering service worker...');
    const register=await navigator.serviceWorker.register('/worker.js',{scope:'/'});
    console.log('Sevice worker registered');


    //Register Push
    console.log('Registering Push..');

    const subscription=await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered..');

    //Send Push subscription object to the server
    console.log('Sending Push..');
    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'}
    });
    console.log('Push Sent...');



}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
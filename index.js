const express=require("express");
const webpush=require("web-push");
const bodyParser=require("body-parser"); 
const path=require("path");

const app=express();

//Set static path

app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

const publicVapidKey='BGVenUUuf_co-qU6uZCMFAzZ23WOzzJ4HpBqtQeqkFSg6vYeR73yWtl3YSLYwOBagzROF60N4SKu5tIs87bCprI';
const privateVapidKey='ZmLg8BznWP335QJeYjWBmkoVsDodKQP_8iBw1KOiU0c';

webpush.setVapidDetails('mailto:harshika_urkude@persistent.com',publicVapidKey,privateVapidKey);

//Subscribe Route

app.post('/subscribe',(req,res)=>{
    //Get push Subscription object from client
    const subscription=req.body;

    //Send 201 -resource created
    res.status(201).json({});
//Payload of notification
const payload=JSON.stringify({title:'Push Test'});
//Pass the object into sendNotofication
webpush.sendNotification(subscription,payload).catch(err=>console.error(err));





});

const port=5000;
app.listen(port,()=>console.log(`Server started on ${port}`));
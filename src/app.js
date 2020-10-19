const path = require('path');
const express = require('express');
const geocode= require('./../utils/geocode')
const forecast= require('./../utils/forecast')

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname,'../public')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/../public/index.html'));
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/../public/about.html'));
});

router.get('/help',function(req,res){
  res.sendFile(path.join(__dirname+'/../public/help.html'));
});

app.get('/weather',(req,res)=>{
  if(!req.query.address){
      return res.send('You must look for an address')
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error) {return res.send({error})}

  
   forecast(latitude,longitude,(error,forecastData)=>{
      if(error) return res.send({error})
      res.send({
          forcast: forecastData,
          location
      })
   })
  })
  
})

router.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/../pages/my404.html'));
  });

//add the router
app.use('/', router);

app.listen(4000,()=>{
    console.log('server is running')
})


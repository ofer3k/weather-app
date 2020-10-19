const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a86f414bbc17f839e3134cfe257a3069&query='+latitude+','+longitude+'&units=m'
    //http://api.weatherstack.com/current?access_key=a86f414bbc17f839e3134cfe257a3069&query=-40.7831,-73.9712&units=m
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('unable to connect')
        }else if(body.error){
            callback('unable to find location')
        }else{  
            callback(undefined,{
                name:body.location.name,
               temperature:body.current.temperature
               
            })  
        }
    })
}
module.exports=forecast
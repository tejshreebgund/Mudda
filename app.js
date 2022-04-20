var express = require("express");
var app = express();
const { translate } = require('bing-translate-api');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache(); 
const langArray = require('./translatelang.js');
app.get("/translate/:word/:language",  function (req, r)  { 
  var obj = {
    text : req.params.word,
    toTranslate : req.params.language,
}
 var str =  JSON.stringify(obj);
if(myCache.has(str)) { 
        console.log('cache value')
       r.json( myCache.get(str)) 
   }else{
        let ar=[];
        langArray.forEach(function (lang){
         if(lang.includes(req.params.language))  
         ar=lang;
        })
        if(ar!=null)
    {   smartCaching(req.params.word,ar);}
        try{  translate(req.params.word, null, req.params.language, true).then(res => {
            myCache.set(str, res.translation)
           r.json(res.translation);
 }).catch(err => {
            r.json(err);
          }
          )}
          catch(e){
            console.log(e);
            res.send(500);
          }
        }
   }
) 
function smartCaching(word,arr)
{arr.map(x=>{
    var obj = {
      text : word,
      toTranslate : x,
  }
   var str =  JSON.stringify(obj);
   try{  translate(word, null, x, true).then(res => {
  myCache.set(str, res.translation)
 
 }).catch(err => {
   console.log(err);
  }
  )}
  catch(e){
    console.log(e);
    res.send(500);
  }
  })
}
var server = app.listen(8600,function(req, res){
console.log("Server running on port 8600");
})
module.exports = server

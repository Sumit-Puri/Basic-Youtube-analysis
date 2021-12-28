const express = require('express');
const fs= require('fs');

const search = require('youtube-search');
const {google, GoogleApis}= require('googleapis');
const http = require('http');
const app = express();
app.set('view engine', 'ejs');
app.set('views',__dirname);
const ytsearch = require('youtube-search');
const { version } = require('os');
var data;
app.get('/',function(req,res){
    res.render("stats",{
      url:""
    });
});
var vdio;
app.get('/Search', async function(req,res){
    
    var idarr= req.query.link.split("=");
    
    var id=idarr[1];
    console.log(idarr[0]);
    console.log(id);
    vdio = await execute(id);
    console.log("itmes",vdio.data.items[0]);
    return res.render("stats",{
        viewCount:vdio.data.items[0].statistics.viewCount,
      likeCount: vdio.data.items[0].statistics.likeCount,
      favoriteCount: vdio.data.items[0].statistics.favoriteCount,
      commentCount: vdio.data.items[0].statistics.commentCount,
      url:req.query.link.replace("watch?v=","embed/")
    });
    
})
function execute(id) {
    var service = google.youtube({version: "v3",
    auth: 'AIzaSyCSDMKfx-hna0aJ5RfM-XmL8dP4juVOUDk'
})
    return service.videos.list({
      "part": [
        "statistics"
      ],
      "id": [
        id
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                
                return response;
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
app.listen(8000,function(err){
    if(err)
    console.log("error in running server");
    else
    console.log("Server Running");
})
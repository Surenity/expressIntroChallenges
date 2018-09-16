var express = require('express');
var app = express();
var fs = require('fs')
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.post('/create/:name/:age', function(req, res) {
 let stuff = {
   name: req.params.name,
   age :parseInt(req.params.age)
 }

 fs.readFile("./storage.json", "utf8", function(err, data) {
   let dataAsArr = JSON.parse(data);

   dataAsArr.push(stuff);

   fs.writeFile("./storage.json", JSON.stringify(dataAsArr), function(err) {
     res.sendStatus(200)
   })
 })
});


app.get('/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) {
    let parsedData = JSON.parse(data)
    let matchedUser = parsedData.filter((item)=> {
      return item.name == req.params.name
    })
    if(matchedUser.length >=1 ) {
      res.json(matchedUser[0])
    } else {
      res.sendStatus(400)
    }
  })
})

  fs.readFile('./storage.json' , 'utf8') , function(err, data){

  })


app.get('/' , (req, res) => {
  let rawContents = fs.readFileSync('./storage.json' , 'utf8');
  res.json(JSON.parse(rawContents));
})


app.listen(port, function() {
  console.log('Listening on port', port);
});

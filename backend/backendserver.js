//Requires
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
var config = require('./config');
const uri = 'mongodb+srv://'+config.db.user+':'+config.db.password+config.db.host;
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));

app.use(function (req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})

app.post('/addToFavorites', function(req, res) {
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db('movieDB');
      const favorites = database.collection('favorites');
      var id = new Date().getTime();
      var movie_id = parseInt(req.body.movie_id);
      var token = req.body.token;
  
      const query = {
        _id: id,
        movie_id: movie_id,
        token: token
      };

      const idFilter = {
        movie_id: movie_id,
        token: token
      };

      const idCheck = favorites.find(idFilter).toArray();

      //Checks if the record ID already exists
      if((await idCheck).length!=0){
        var rsp_obj = {};
        rsp_obj.movie_id = -1;
        rsp_obj.message = 'Already Favorited';
        await client.close();
        return res.status(200).send(rsp_obj);
      }
      //Successful add
      else{
        const out = await favorites.insertOne(query);
        console.log(out);
        var rsp_obj = {};
        rsp_obj.movie_id = movie_id;
        rsp_obj.message = 'Added to Favorites';
        await client.close();
        return res.status(201).send(rsp_obj);
      }
    } finally {
    }
  }
  run().catch(console.dir);
}); //end post method

app.delete('/removeFromFavorites', function(req, res) {
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db('movieDB');
      const favorites = database.collection('favorites');
      var movie_id = parseInt(req.body.movie_id);
      var token = req.body.token;

      const idFilter = {
        movie_id: movie_id,
        token: token
      };

      const idCheck = favorites.find(idFilter).toArray();

      //Checks to see if a record was found for the ID
      if((await idCheck).length!=0){
        await favorites.deleteOne(idFilter);
        console.log('Deleted From Favorites');
        var rsp_obj = {};
        rsp_obj.movie_id = idFilter.movie_id;
        rsp_obj.message = 'Favorites Deleted';
        await client.close();
        return res.status(200).send(rsp_obj);
      }else{
        var rsp_obj = {};
        rsp_obj.movie_id = -1;
        rsp_obj.message = 'Favorites Record Not Found';
        await client.close();
        return res.status(404).send(rsp_obj);
      }
    } finally {
      // Ensures that the client will close when you finish/error
      //await client.close();
    }
  }
  run().catch(console.dir);
});

app.get('/getFavorites', function(req, res) {
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db('movieDB');
      const favorites = database.collection('favorites');
      let token = req.query.token
      console.log("token: " + token);

      const idFilter = {
        token: token
      };

      var List= await favorites.find(idFilter).toArray();
      const Movies = new Array();
      const SentMovie = [];

      if(List.length == 0){
        var rsp_obj = {};
        rsp_obj.movie_id = -1;
        rsp_obj.message = 'Favorites Record(s) Not Found';
        await client.close();
        return res.status(404).send(rsp_obj);
      }
      else{
        await client.close();
        for (const element of List)
        {
          let link = 'https://api.themoviedb.org/3/movie/' + element.movie_id;
          let api_key = config.movies.api_key;
          let check = await axios.get(link,
            {
              params: {api_key}
            })
            .then(function (response) {
                Movies.push(response.data);
            })
            .catch(function (error) {
            })
        }
        return res.status(200).send(Movies);
      }
    } 

    finally {
      // Ensures that the client will close when you finish/error
      //await client.close();
    }
  }
  run().catch(console.dir);
});

app.get('/movie', function(req, res) {
  let api_key = config.movies.api_key;
  let query = req.query.query
  axios.get('https://api.themoviedb.org/3/search/movie',
  {
      params: { api_key, query }
  })
  .then(function (response) {
    if (response.data.total_results == 0)
    {
      var rsp_obj = {};
      rsp_obj.message = 'No Movies Found';
      return res.status(404).send(rsp_obj);    
    }
    return res.status(200).send(response.data);
  })
  .catch(function (error) {
    var rsp_obj = {};
    rsp_obj.record_id = -1;
    rsp_obj.message = 'An Error Occured' + error;
    return res.status(404).send(rsp_obj);
  })
  .then(function () {
  })
}); 

app.get('/popular', function(req, res) {
  let api_key = config.movies.api_key;
  axios.get('https://api.themoviedb.org/3/movie/popular',
  {
      params: { api_key }
  })
  .then(function (response) {
    return res.status(200).send(response.data);
  })
  .catch(function (error) {
    console.log("Starting Error")
    console.log(error)
    var rsp_obj = {};
    rsp_obj.record_id = -1;
    rsp_obj.message = 'An Error Occured' + error;
    return res.status(404).send(rsp_obj);
})
  .then(function () {
  })
}); 

//Starts the server
app.listen(5678); //start the servercd

console.log('Server is running...');
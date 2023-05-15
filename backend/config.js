var config = {};

config.app = {};
config.server= {};
config.db = {};
config.movies = {};

config.server.port = 5678;
config.db.host = '@moviedb.ggoxslt.mongodb.net/?retryWrites=true&w=majority';
config.db.port =  27017;
config.db.user= 'admin';
config.db.password = 'admin';
config.db.name = 'movieDB'
config.db.collection = 'favorites';

config.movies.api_key = "4fd8e5c05370d28ff1ac0a468123b839";

module.exports = config;
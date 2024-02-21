var mysql = require('mysql');

var connection = mysql.createConnection({
    debug: true,

    host: 'ndl.h.filess.io',
    port: 3307,
    user: 'foodTrace_pooldeeply',
    password: 'c385298034f8cb04d12d305571c3b80c27f94cb8',
    database: 'foodTrace_pooldeeply'
});

connection.on('error', function(err) {
    console.log('MySQL connection error:', err);
});

module.exports = connection;

/**
 * Created by Ditas on 9/1/16.
 */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser'),
    path = require('path'),
    _ = require('lodash');

app.use(function(req, res, next) {
    var allowedOrigins = ['https://madbid.herokuapp.com'],
        origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Serve static files
app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());

// Serve index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var isLocal = false;
if(isLocal) {
    // listen to requests at given port
    server.listen(process.env.PORT || 5000);
    console.log('Running on port: ' + server.address().port);
    return;
}

var db,
    ObjectID = mongodb.ObjectID;
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(error, database) {
    if(error) {
        console.log(error);
        process.exit(1);
    }

    db = database;
    console.log('Connected to db instance');

    // listen to requests at given port
    server.listen(process.env.PORT || 5000);
    console.log('Running on port: ' + server.address().port);
});

/** API Routes **/
// POST (insert new product) method route
app.post('/products', function (req, res) {
    var product = req.body;
    if(!hasValidKeys(product)) {
        handleError(res, 'Document is invalid', 'Document is invalid', 400);
    }
    db.collection('products').find({}).toArray(function(error, docs) {
        if(error) {
            handleError(res, error.message, 'Failed to get existing products', 404);
        } else {
            var doc = _.filter(docs, { name: product.name });
            if(!_.isEmpty(doc)) {
                handleError(res, 'Product already exists', 'Product already exists', 400);
            }
            product.price = product.price.toFixed(2);
            product.price+=.01;
            product.price = product.price.toFixed(2);
            db.collection('products').insertOne(product, function(err, doc) {
                if (err) {
                    handleError(res, err.message, 'Failed to create new product');
                } else {
                    res.status(201).json(doc.ops[0]);
                }
            });
        }
    });
});

app.post('/products/:id', function (req, res) {
    var product = req.body;
    if(!hasValidKeys(product)) {
        handleError(res, 'Document is invalid', 'Document is invalid', 400);
        return;
    }
    if(product.hasOwnProperty('_id'))
        delete product['_id'];
    product.price = product.price.toFixed(2);
    product.price+=.01;
    product.price = product.price.toFixed(2);
    db.collection('products').updateOne({_id: new ObjectID(req.params.id)}, product, function(error, doc) {
        if (error) {
            handleError(res, error.message, 'Failed to update product');
        } else {
            db.collection('products').findOne({ _id: new ObjectID(req.params.id) }, function(error, doc) {
                if(error) {
                    handleError(res, error.message, 'Failed to get product', 404);
                } else {
                    res.status(200).json(doc);
                }
            });
        }
    });
});

// GET product method route
app.get('/products/:id', function (req, res) {
    db.collection('products').findOne({ _id: new ObjectID(req.params.id)}, function(error, doc) {
        if(error) {
            handleError(res, error.message, 'Failed to get product', 404);
        } else {
            res.status(200).json(doc);
        }
    });
});

// GET products method route
app.get('/products', function(req, res) {
    db.collection('products').find({}).toArray(function(error, docs) {
        if(error) {
            handleError(res, error.message, 'Failed to get existing products', 404);
        } else {
            res.status(200).json(docs);
        }
    });
});

function handleError(response, reason, message, code) {
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({'error': message});
}

function hasValidKeys(doc) {
    var clone = _.clone(doc);
    if(clone.hasOwnProperty('_id'))
        delete clone['_id'];
    if(clone.hasOwnProperty('time'))
        delete clone.time;
    if(clone.hasOwnProperty('$$hashKey'))
        delete clone['$$hashKey'];

    var keys = Object.keys(clone),
        requiredKeys = ['name', 'category', 'price', 'winUser'];
    console.log(JSON.stringify(doc));
    return _.difference(keys, requiredKeys).length === 0;
}



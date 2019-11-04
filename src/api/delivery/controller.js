const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "retirement_db";
    
const deliveryController = {
    get: function(req, res) {
        const A = req.query.A;
        const B = parseInt(req.query.B);
        const client = new MongoClient(url);
        client.connect(function(error, result) {
            if (error) res.send(error)
            const event = result.db(dbName).collection("delivery");
            if (A && B) {
                event.find({"storeName": A} && {"stockNumber": B}).toArray(function(error, result) {
                    if (error) res.send(error);
                    else res.send(result);
                    client.close();
                    });   
            }
            else {
                event.find().toArray(function(error, result) {
                    if (error) res.send(error);
                    else res.send(result);
                    client.close();
                });   
            }
        });
    },

    post: (req, res) => {
        let newItem = req.body;
        const mongoClient = new MongoClient(url);
        mongoClient.connect(function (err, result) {
            if (err) res.status(500).send(err);

            const delivery = result.db(dbName).collection("delivery");
            delivery.insertOne(newItem, function (err, result) {
                if (err) 
                    res.status(500).send(err);
                else
                    res.send(newItem);

                mongoClient.close();
            });
        });
    },

    deleteByStockNumber: (req, res) => {
        const stockNumber1 = req.query.id;
        const mongoClient = new MongoClient(url);
        mongoClient.connect(function (err, result) {
            if (err) res.status(500).send(err);

            const delivery = result.db(dbName).collection("delivery");
            delivery.findOneAndDelete({stockNumber: stockNumber1}, function(err, result){
              
                if(err) return console.log(err);    
                let user = result.value;
                res.send(user);
                mongoClient.close();
            });
        });
    }
}

module.exports = {
	deliveryController
}
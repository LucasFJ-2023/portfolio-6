const express = require("express");
//npm install mysql2 --save
const mysql = require("mysql2");
//npm install cors --save
const cors = require("cors");


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

//Host, user, password database
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    port: 3306,
    password: "Rækkehus2023",
    database:"student_cafe"
});



// Returnere alle caféer //
app.get('/cafes', (req, res) => {
    connection.query('SELECT * FROM cafes', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});




//Lucas
//Så user kan logge ind
app.post('/user/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            // User found, respond with user data
            res.json(results[0]);
        } else {
            // No matching user found, respond with an error
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});




// Hente information på bestemt user_id //
app.get('/user/:id',(req, res)=>{
    const id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?',
        [id],(error,results)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
});





// Hente information på bestemt cafe_ide //
app.get('/cafe/:id',(req, res)=>{
    const id = req.params.id

    connection.query('SELECT * FROM cafes WHERE id = ?',
        [id],(error,results)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
});





// Find café ved søgning af by //
app.get('/cafes/search', (req,res)=>{
    const city = req.query.city;
    connection.query('SELECT * FROM cafes WHERE city = ?',
        [city],
        (error, results)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
});




//Lucas
// Oprette ny bruger //
app.post('/new/user',(req,res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const email = req.body.email
    const location = req.body.location
    const password = req.body.password

    connection.query(
        'INSERT INTO `users`(first_name, last_name, username, email, location, password) values (?,?,?,?,?,?)',
        [firstName, lastName, username, email, location, password],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})




// Oprette ny cafe //
app.post('/new/cafe', (req, res) => {
    // Get the data from the request body
    const cafeName = req.body.cafeName;
    const address = req.body.address;
    const city = req.body.city;
    const description = req.body.description;
    const wifi = req.body.wifi;
    const serveFood = req.body.serveFood;

    connection.query(
        'INSERT INTO `cafes`(cafe_name, address, city, description, wifi, serve_food) VALUES (?, ?, ?, ?, ?, ?)',
        [cafeName, address, city, description, wifi, serveFood],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        }
    );
});




// Oprette ny favorit //
app.post('/new/favorite',(req,res) => {
    //Get the data from the request body
    const userId = req.body.userId
    const cafeId = req.body.cafeId

    connection.query(
        'INSERT INTO `favorites`(user_id, cafe_id) values (?,?)',
        [userId, cafeId],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})





// Oprette nye åbningstider til caféer //
app.post('/new/openingHours',(req,res) => {
    //Get the data from the request body
    const cafeId = req.body.cafeId
    const hverdagOpeningTime = req.body.hverdagOpen
    const hverdagClosingTime = req.body.hverdagClosing
    const weekendOpeningTime = req.body.weekendOpen
    const weekendClosingTime = req.body.weekendClosing


    connection.query(
        'INSERT INTO `opening_hours`(cafe_id, hverdag_opening_time, hverdag_closing_time, weekend_opening_time, weekend_closing_time) values (?,?,?,?)',
        [cafeId, hverdagOpeningTime, hverdagClosingTime, weekendOpeningTime, weekendClosingTime],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})


// Oprette en kommentar til en café//
app.post('/New/comment',(req,res) => {
    //Get the data from the request body
    const comment = req.body.comment
    const cafeId = req.body.cafeId
    const userId = req.body.userId


    connection.query(
        'INSERT INTO `comments`(comment, cafe_id, user_id) values (?,?,?)',
        [comment, cafeId, userId],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})



// Oprette en rating til café//
app.post('/New/rating',(req,res) => {
    //Get the data from the request body
    const rating = req.body.rating
    const userId = req.body.userId
    const cafeId = req.body.cafeId



    connection.query(
        'INSERT INTO `ratings`(rating, user_id ,cafe_id) values (?,?,?)',
        [rating, cafeId, userId],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})

// Vis x mængde cafer tilfældigt
// victor
app.get('/all/cafes', (req, res) => {
    const limit = 6;

    connection.query('SELECT * FROM cafes ORDER BY RAND() LIMIT ?', [limit],
        (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




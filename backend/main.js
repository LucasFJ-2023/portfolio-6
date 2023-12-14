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
    password: "Storpenisdreng1",
    database:"student_cafe_portfolje6"
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


//Lucas
// Show user information
app.get('/user-info', (req, res) => {
    const username = req.query.username;

    let returnObject = {

    }

    // Query user information and favorite cafe name from the database based on username
    const query = (`
        SELECT first_name, last_name, users.username, users.email, users.location, cafes.cafe_name as favorite_cafe
        FROM users
        INNER JOIN favorites ON users.id = favorites.user_id
        INNER JOIN cafes ON favorites.cafe_id = cafes.id
        WHERE users.username = ?;
    `);

    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        returnObject.first_name = results[0].first_name
        returnObject.last_name = results[0].last_name
        returnObject.username = results[0].username
        returnObject.email = results[0].email
        returnObject.location = results[0].location

        let arrayOfCafes = []
        results.forEach((cafe) => {
            let currentCafeName = cafe.favorite_cafe
            arrayOfCafes.push(currentCafeName);
        })
        returnObject.favoriteCafe = arrayOfCafes
        console.log(returnObject)

       //  const user = results[0];
       //  const favorite_cafe = results.map((result) => result.favorite_cafe_name).filter(Boolean);
       //  user.favorite_cafes = favorite_cafe;

        res.send(returnObject);
    });
});


/*
//Lucas
//Get user favorites
app.get('/user-favorites', (req, res) => {
    const userId = req.session.userId;

    connection.query('SELECT cafe_id FROM favorite WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user favorites:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const favoriteCafeIds = results.map(result => result.cafe_id);
        res.json({ favoriteCafeIds });
    });
});
*/


// Oprette ny favorit //
app.post('/add-favorite', (req, res) => {
    const userId = req.body.userId;
    const cafeId = req.body.cafeId;

    connection.query(
        'INSERT INTO favorites (user_id, cafe_id) VALUES (?, ?)',
        [userId, cafeId],
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





/*
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
*/

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
    const limit = 20;

    connection.query('SELECT * FROM cafes ORDER BY RAND() ', [limit], (error, results, fields) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});


app.get('/cafes', (req, res) => {
    let city_request = ""
    let wifi_request = ""
    let food_request = ""

    if (req.query.city !== "Alle byer") city_request = req.query.city
    if (req.query.wifi !== undefined) wifi_request = req.query.wifi
    if (req.query.food !== undefined) food_request = req.query.food

    connection.query('SELECT * FROM cafes where city LIKE ? AND wifi LIKE ? AND serve_food LIKE ?',[city_request+"%", wifi_request+"%", food_request+"%"], (error, results, fields) => {
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




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
            res.json(results[0].id);
        } else {
            // No matching user found, respond with an error
            res.status(401).json({ error: "Invalid email or password" });
        }
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



//Lucas
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


        res.send(returnObject);
    });
});




// Lucas
// Tilføje en ny favorit café eller fjerne en café
app.post('/toggle-favorite', (req, res) => {
    const userId = req.body.userId;
    const cafeId = req.body.cafeId;

    // Check if the cafe is already a favorite for the user
    connection.query(
        'SELECT * FROM favorites WHERE user_id = ? AND cafe_id = ?',
        [userId, cafeId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length > 0) {
                // Cafe is already a favorite, so remove it
                connection.query(
                    'DELETE FROM favorites WHERE user_id = ? AND cafe_id = ?',
                    [userId, cafeId],
                    (deleteErr) => {
                        if (deleteErr) {
                            console.error(deleteErr);
                            return res.status(500).send('Internal Server Error');
                        }
                        res.send({ message: 'Cafe removed from favorites' });
                    }
                );
            } else {
                // Cafe is not a favorite, so add it
                connection.query(
                    'INSERT INTO favorites (user_id, cafe_id) VALUES (?, ?)',
                    [userId, cafeId],
                    (insertErr) => {
                        if (insertErr) {
                            console.error(insertErr);
                            return res.status(500).send('Internal Server Error');
                        }
                        res.send({ message: 'Cafe added to favorites' });
                    }
                );
            }
        }
    );
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




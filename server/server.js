const express = require('express');

const PORT = 8080
const LISTEN = "127.0.0.1"

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let citiesPerUsers = {
    "Max": [
        "Geneva",
        "MaxCity"
    ],
    "Florian": [
        "Geneva",
        "Vevey"
    ]
};


// Useful function to check if a user exists in the database
function userExists(user) {
    Object.keys(citiesPerUsers).indexOf(user) !== -1
}

// Useful function to check if a city exists in a users list
function cityExistsInUser (user, city) {
    if (userExists(user)) {
        citiesPerUsers[user].indexOf(city) !== -1
    }
    return false;
}

app.get('/', (req, res) => {
    res.send({
        "Hello World": "Try using the following route :)",
        "Usage" : [
            "GET /city/:user", 
            "POST /city/:user.:city", 
            "DELETE /city/:user.:city"
        ]
    })
});

// Get all the cities of a user
app.get('/city/:user', (req, res) => {

    let user = req.params["user"];

    /**
     * SQL : SELECT * FROM citiesPerUser WHERE user == :user;
     */
    if (!userExists(user)) {
        return res.send({
            "Error": `The user ${user} does not exist in the database`
        })
    } else {
        res.send(citiesPerUsers[user])
    }
});

// Add a city for a user
app.post("/city/:user.:city", (req, res) => {
    let user = req.params["user"];
    let city = req.params["city"];

    if (!userExists(user)) {
        res.send({
            "Error": `The user ${user} does not exist in the database`
        })
    }

    /**
     * SQL : UPDATE citiesPerUser SET (user = :user, city = :city);
     */

    if (!cityExistsInUser(user, city)) {
        citiesPerUsers[user].push(city);
        res.send({
            "Ok": `The city ${city} has been added to the list of the user ${user}`,
            "cities": citiesPerUsers[user]
        })
    } else {
        res.send({
            "Warning" : `The city ${city} already exists in the user's database`
        })
    }

});

// Delete the city of a user
app.delete("/city/:user.:city", (req, res) => {
    let user = req.params["user"];
    let city = req.params["city"];

    /**
     * SQL : DELETE FROM citiesPerUser WHERE user == :user AND city == :city;
     */
    if (userExists(user)) {
        if (cityExistsInUser(user, city)) {
            res.send({
                "Ok": `The city ${city} has been deleted for the lists of ${user}`,
                "cities": citiesPerUsers[user]
            })
        }
    }
});


app.listen(PORT, LISTEN, () => {
    console.log(`Server running and listening : ${LISTEN}:${PORT}`)
})

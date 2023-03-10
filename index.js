const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');

const PORT = 8080;
const app = express();
const hbs = exphbs.create();

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

    const teams = JSON.parse(fs.readFileSync('./data/teams.json'));
    const teamsAmount = teams.length;

    res.render('teams', {
        layout: 'home',
        data: {
            teams,
            teamsAmount,
        },
    });
});

app.get('/team/:tla/watch', (req, res) =>{
    
    const tlaTeam = req.params.tla;
    const dataTeam = JSON.parse(fs.readFileSync(`./data/teams/${tlaTeam}.json`));
    const {area, name, crestUrl, address, website, founded, venue} = dataTeam;
    
    res.render('team',{
        layout: 'home',
        data: {
            country: area.name,
            name,
            image: crestUrl,
            address,
            website,
            founded,
            venue
        },  
    });
});

app.listen(PORT)
console.log(`Listening in http://localhost:${PORT}`);
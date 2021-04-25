const Game = require('../Schemas/Game');
const Platform = require('../Schemas/Platform');

//GET
//Selects all records in the collection
const SelectGames = async (req, res) => {
    try {
        let game = await Game.find();

        if(game[0]) {
            res.send(game);
        }
        res.send("No games currently in the database");

    }catch (err)
    {
        res.send(err);
    }
};

//GET
//Searches for a list of records matching similar properties [name, platform]
const SearchGamesByName = async (req, res) => {
    if(req.query.name){

        let RegExName = RegExp(req.query.name);

        let games = await Game.find({name: {$regex: RegExName, $options: 'i'}});

        if(games[0]){
            res.send(games);
        }else {
            res.send({err:"No games found"});
        }

    }else{
        res.send("Error: name must be defined");
    }
}

//GET
//Searches for a single record with exact properties matching [name, platform]
const SelectGame = async (req, res) => {

    if(req.query.name){

        let platform = await Platform.findOne({name: req.query.platform});

        if(platform){
            let game = await Game.findOne({name: req.query.name, platform: platform._id});

            if(game){
                res.send(game);
            }
            res.send("Error: Game not found");
        }
        res.send("Error: Platform not found");
    }
    res.send("Error: name and platform must be defined");
}

//POST
//Creates a new record with properties [name, platform]
const CreateGame = async (req, res) => {

    if(req.body.name && req.body.platform) {

        let platform = await Platform.findOne({name: req.body.platform});

        if(platform){

            let game = await Game.findOne({name: req.body.name, platform: platform.name});

            if(!game){
                let newGame = new Game({
                    name: req.body.name,
                    platform: platform.name
                });

                try{
                    newGame.save();
                }
                catch(e){
                    res.send("Could not save game");
                }
                
                res.send("New game added");
            }
            res.send("Error: game record already exists");
        }
        res.send("Error: platform not found");
    }
    res.send("Error: name and platform must be defined");
}

exports.SelectGames = SelectGames;
exports.SelectGame = SelectGame;
exports.SearchGamesByName = SearchGamesByName;
exports.CreateGame = CreateGame;




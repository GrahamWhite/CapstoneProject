const Game = require('../Schemas/Game');

const SelectGames = (req, res) => {
    try {
        User.find({}).then(r => {
            if (!r[0]) {
                res.send("No games currently in the database");
            } else {
                res.send(r);
            }
            ;
        });
    } catch (err) {
        res.send(err);
    }
};

const SelectGame = (req, res) => {
    try{

        if(!req.body.name){
            res.send("name is required");
            return;
        }

        if(!req.body.platform){
            res.send("platform is required");
            return;
        }



        Game.find({name:req.body.name, platform: req.body.platform}).then(r => {
            if(!r[0]){
                res.send("Game: " + req.body.name + " not found in the database");
            }else {
                res.send(r);
            }
        });
    }
    catch (err){
        res.send({err});
    }
};

const GetGameId = (req, res) => {
    try{
        Game.find({name: req.body.name}).then(r => {
            res.send(r[0]._id);
        });
    }catch (err){
        res.send(err);
    }
};

const CreateGame = (req, res) => {
    try{

        if(!req.body.name){
            res.send("name is required");
        }
        else if(!req.body.platform){
            res.send("platform is required");
        }else {

            Game.find({name: req.body.name, platform: req.body.platform}).then(g => {

                if(!g[0]){
                    let game = new Game({
                        name: req.body.name,
                        platform: req.body.platform
                    });

                    game.save();

                    res.send({msg: "Game Saved", game: game});
                }
                else {
                    res.send("Game already exists")
                }

            });
        }



    }catch (err)
    {
        res.send({msg: "Error: " + err});
    }
};


const GameExists = (req, res) => {
    try {
        Game.exists({name: req.body.name}).then( r => {
            res.send(r);
        });
    } catch (err) {
        res.send(err);
    };
};


exports.SelectGames = SelectGames;
exports.SelectGame = SelectGame;
exports.CreateGame = CreateGame;
exports.GameExists = GameExists;
exports.GetGameId = GetGameId;


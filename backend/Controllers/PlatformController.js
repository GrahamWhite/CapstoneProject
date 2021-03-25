const Platform = require('../Schemas/Platform');

//GET
//Selects all records in the collection
const SelectPlatforms = async (req, res) => {
    try {
        let platform = await Platform.find({});

            if(platform) {
                res.send(platform);
            }
            res.send("No platforms currently in the database");

    }catch (err)
    {
        res.send(err);
    }
}

//GET
//Searches for a list of records with similar properties to [name]
const SelectPlatform = async (req, res) => {

    if(req.query.name){

        let p = await PlatformExists(req.query.name);

        if(p){
            let x = await Platform.findOne({name: req.query.name});

            res.send(x);
        }
        res.send("Error: Platform not found");

    }

    res.send("Error: name must be defined");

}

//POST
//Selects 1 record based on [name, platform] properties
const DeletePlatform = async (req, res) => {

    if(req.query.name){

        let p = await PlatformExists(req.query.name);

        if(p){
            let platform = await Platform.findOneAndRemove({name: req.query.name});

            res.send(platform.name + "removed");
        }

        res.send("Game not found");
    }

    res.send("Platform name must be defined");

}

//POST
//Creates a new record with properties [name]
const CreatePlatform = async (req, res) => {

    if(req.body.name){

    let r = await PlatformExists(req.body.name);

        if(r){
            res.send("Error: Platform already exists in the database.")
        }

        let platform = new Platform({
            name: req.body.name
        });

        try{
            platform.save();

            res.send(platform.name + " saved.")
        }catch (e){
            res.send("Error: Unable to save the platform to the database.")
        }
    }

    res.send("Platform name must be defined");

}

//Returns boolean for existing game (similar match)
const PlatformExists = async (name) => {

    try{
        let p = await Platform.findOne({name: name});

        if(p){
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

exports.SelectPlatforms = SelectPlatforms;
exports.SelectPlatform = SelectPlatform;
exports.PlatformExists = PlatformExists;
exports.CreatePlatform = CreatePlatform;
exports.DeletePlatform = DeletePlatform;
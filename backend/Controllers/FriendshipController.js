

const User = require('../Schemas/User');
const Friendship = require('../Schemas/Friendship');

const SelectFriendships = (req, res) => {

    try{
        Friendship.find({}).then(f => {
            if(f[0]){
                res.send(f);
            }else{
                res.send("No friendships in the databases")
            }
        });
    } catch (err){
        res.send(err);
    }

}

const CreateFriendship = (req, res) => {
    try{
        User.find({username1: req.body.username1}).then(u1 => {
            if(u1){
                User.find({username2: req.body.username2}).then(u2 => {
                    if(u2){
                        const friendship = new Friendship({
                            username1: u1,
                            username2: u2
                        });

                        friendship.save();

                        res.send("Friendship saved")

                    }else{
                        res.send("user 2 not found");
                    }
            }else{
                res.send("user 1 not found");
            }
        });
    }catch (err){
        res.send(err);
    }
}

exports.SelectFriendships = SelectFriendships;


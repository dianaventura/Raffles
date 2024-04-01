//use controller

const User = require('../models/User');
//const Entry = require('../models/Entry')

const bcrypt = require('bcrypt');


//controller for registering usrs
exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
  
   
    const existingUser = await User.findOne({ username });
     //  if user already exists
    if (existingUser) {
      return res.status(400).send('Girlie OOPS user already exists!!');
    }

    // else ave new user
    const user = new User({ username, password, email });

    const userSaved = await user.save();
     // res.status(201).json(userSaved)

    // log in user by starting session

    req.session.userId = userSaved._id;
    console.log(userSaved._id)
    req.session.loggedIn = true;

    console.log('girl this is the cookie ')
    console.log(req.session);

    req.session.save();
     
    return res.status(201).json({ loggedIn: true, user: userSaved });
    

  } catch (error) {
    console.error(error);
    res.status(500).send('Oops girlie server error: ' + error.message);
  }
};



//controller for sessuin info 

exports.session = async (req, res) => {

  try {
    if (req.session.loggedIn) {


      const user = await User.findById(req.session.userId);

      if (!user) {
        return res.status(404).json({ message: "ooop user not found." });

      }

      res.json({ loggedIn: true, username: user.username });

    } else {

      res.json({ loggedIn: false });
    }
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "internal server error", loggedIn: false });
  }
};


/*
exports.enterAsUser = async(req,res) => {
  const{raffleId} = req.body;
  console.log(req.body);
  try{
      const entry = new Entry({raffleId});
      const entrySaved = await entry.save();
      res.status(201).json(entrySaved)
  }catch(error){
      res.status(500).json({error: 'Error with Guest save'})
  }
}
*/


  

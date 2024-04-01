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

exports.login = async(req,res) =>{

  try{

    const {username, password} = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('user not found ');
    }

    //check if password is right

    if(user.password !== password){
      return res.status(400).json({ message: 'Incorrect password' });
    }

    //if user exists and password is crrect log in and start session

    req.session.userId = user._id;
    req.session.loggedIn = true;
    req.session.save();

    res.json({ message: 'LOGIN was a SUCCES. ', user: { id: user._id, email: user.email } });

  } catch (error) {

    console.error('error logging in:', error);
    res.status(500).json({ message: 'internal server error' });
  }
    
  };


//controller for sessuin info 

exports.session = async (req, res) => {

  
  if (req.session.userId) {

    try {

      const user = await User.findById(req.session.userId).exec();

      if (user) {

        res.json({ loggedIn: true, username: user.username, userId: user._id});
      } else {
        res.json({ loggedIn: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', loggedIn: false });
    }
  } else {
    res.json({ loggedIn: false });
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


  

const router = require('express').Router();
let User = require('./models/user.mod');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
   


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async(req, res) => {
 
  const{username,password,passwordVerify} = req.body;
  
   if(!username || !password || !passwordVerify)
   return res
    .status(400)
    .json({ errorMessage: "Please enter all required fields." });

 if (password.length < 6)
  return res.status(400).json({
    errorMessage: "Please enter a password of at least 6 characters.",
  });

if (password !== passwordVerify)
  return res.status(400).json({
    errorMessage: "Please enter the same password twice.",
  });


  const exist = await User.findOne({ username })
  if(exist){
    return res.status(400).json({
      errorMessage: "An account with this username already exists.",
    })
  }
 
  
 
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  
  const newUser = new User({
    username,
    passwordHash
    
  });
  

  const saved = await newUser.save()
   
   

    const token = jwt.sign(
      {
        user: saved._id,
        name: saved.username,
        status:true

      },
      process.env.JWT_SEC
       
    );
   
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  

});
router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate

    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong username or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong username or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
        name: existingUser.username,
        status:true
      },
      process.env.JWT_SEC
    );
    
    

    // send the token in a HTTP-only cookie

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        
        
      })
      .send();
      
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.route("/logout").get((req, res) => {
  res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    
    const token = req.cookies.token;
    if (!token) return res.json(false)
    
    
    
    const verify=jwt.verify(token, process.env.JWT_SEC);
    
    if(verify){
     
    res.send(verify)
   }
  } catch (err) {
    res.json(false);
  }
});

module.exports = router; 
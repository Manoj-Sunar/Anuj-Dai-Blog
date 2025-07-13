import UsersRegisterModel from "../Models/UsersRegisterModel.js";

export const UserRegister = async (req, res) => {
  try {
    const { profileImage,name, email, phone, address, password } = req.body;


    console.log(profileImage);

    // Check for all fields
    if (!profileImage||!name || !email || !phone || !address || !password) {
      return res.status(401).json({ msg: 'All Fields are Required' });
    }

    // Check if user already exists
    const isUserExist = await UsersRegisterModel.findOne({ email: email });

    if (isUserExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = await UsersRegisterModel.create({
      profileImage,
      name,
      email,
      phone,
      address,
      password,
    });



    return res.status(201).json({ msg: 'New user registered successfully',newUser,token: await newUser.generateToken() });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server Error', error: error.message });
  }
};



//user login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(404).json({ msg: 'All fields are Required' });
    }

    const isUserExist = await UsersRegisterModel.findOne({ email: email });

    if (!isUserExist) {
      return res.status(404).json({ msg: 'Invalid credential' });
    }

    const loginPassword = await isUserExist.comparePassword(password);

    if (!loginPassword) {
      return res.status(400).json({ msg: 'Invalid credential' })
    }

    return res.status(201).json({ msg: 'Login Successfully ✅',isUserExist, token: await isUserExist.generateToken()});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server Error', error: error.message });
  }
}


//Login User Details
export const LoginUserDetails = async (req, res) => {
  try {

    const { userId, email, isAdmin } = req.user;

     const authUserData=await UsersRegisterModel.findOne({_id:userId,email:email});

     if(!authUserData){
      return res.status(404).json({msg:'Unauthorized user!'});
     }

     

     return res.status(200).json({authUserData})

  } catch (error) {
    return res.status(500).json({ msg: 'Internal Error' });
  }
}
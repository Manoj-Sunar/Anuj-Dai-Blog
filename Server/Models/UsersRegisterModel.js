import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const {Types} =mongoose;

const userSchema = mongoose.Schema({

    profileImage:{
        type:String,
        required:true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    acoutInfo:{
       total_posts: {
         type:Number,
         default:0,
        },

        total_reads:{
              type:Number,
              default:0,
        },
       
    },

    

    isAdmin:{
        type:Boolean,
        default:false,
    }

});


// generate token
userSchema.methods.generateToken = async function () {
    try {

        const token = jwt.sign(
            {
                userId: this._id,
                email: this.email,
                isAdmin: this.isAdmin,
            },

            process.env.JWTSIGNATURE,

            {
                expiresIn: '7d',
            },
        );

        return token;

    } catch (error) {
        console.log(error)
    }
}



//hash password
userSchema.pre('save',async function(next) {
    const userData=this;
    if(!userData.isModified('password')){
        next();
    }

    const saltRound=await bcrypt.genSalt(12);
    const hashPassword=await bcrypt.hash(userData.password,saltRound);
    userData.password=hashPassword;
});



// compare password 
userSchema.methods.comparePassword=async function(password){
    try {
        const compare=bcrypt.compare(password,this.password);
        return compare;
        
    } catch (error) {
        console.log(error);
    }
}



export default mongoose.model('NewUser', userSchema);
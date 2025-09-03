import {Schema, model} from "mongoose"

const userSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  phoneNumber: {
    type: String,
  required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  cart:[{
    product:{
      type:Schema.Types.ObjectId,
      ref:"Product"
    },
    quantity:{
      type:Number,
      default:1
    }
  }]
})

const User = model("User", userSchema)  
export default User
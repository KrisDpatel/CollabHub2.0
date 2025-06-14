const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  // institute: { type: String, required: true },
  department: { type: String },
  mobile: { type: String },
  // er_no: { type: String ,required:true},
  city: { type: String },
  // role: { type: String, required: true,enum:['student','faculty'] },
  semester: { type: String },
  role: { type: String, required: true,enum:['student','faculty'] },
  // photo: { type: Buffer, required: true, }, // Store image as binary data (Buffer) 
  photo: { type: String }, 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

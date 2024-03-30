import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  firstNm: String,
  lastNm: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  primaryPhone: {
     type: String,
     required: true
  },
  
  secondaryPhone : String,
  
  address: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now(),
  },
});

// For Hashing the password field
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// For Comparing the Hashed Version of the Password with the external password.
userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match; 
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

// For Updating the Login
userSchema.methods.updateLoggedIn = function () {
  return this.model("User").findOneAndUpdate(
    {
      email: this.email,
    },
    { lastLoggedIn: new Date() }
  );
};

const User = model("User", userSchema);

export default User;

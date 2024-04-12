import mongoose from "mongoose";

const { Schema, models } = mongoose;
// create a schema for how users will look like
// schemas define how the data in a specific collection will look like
const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: String,
  id: String,
});
// so a model is a collection of like entities, and the shape of this model is determined by the schema
// Hence the schema defines how the shape of the data in a particular collection will look like...
// In next it is a good idea to check the models object which has a list of all defined models
// if we have a User model already defined then we go ahead and assign this value to the User model that is exported if not then we can creat a new model.
// to avoid recreating and replacing already existing models.
const User = models.User || mongoose.model("User", userSchema);

export default User;

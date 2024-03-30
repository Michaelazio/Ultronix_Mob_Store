import {Schema, model} from "mongoose";
const {ObjectId} = Schema.Types


const profilePictureSchema = new Schema({
    image: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    }
})

const ProfilePicture = model('ProfilePicture', profilePictureSchema);
export default ProfilePicture;
import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { generatePasswordHash } from '../utils'
import  differenceInMinutes from 'date-fns/differenceInMinutes'

export interface IUser extends Document {
    email?: string,
    fullname?: string,
    password?: string,
    confirmed?: boolean,
    avatar?: string,
    confirm_hash?: string,
    last_seen?: Date,
}

const UserSchema = new Schema({
    email: {
        type: String,
        validate: [isEmail, 'Invalid email'],
        unique: true,
        required: 'Email address is required'
    },
    avatar: String,
    fullname: {
        type: String,
        required: 'Fullname address is required'
    },
    password: {
        type: String,
        required: 'Password address is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    last_seen: {
        type: Date,

    },
},
{
    timestamps: true
});
UserSchema.virtual('isOnline').get(function(this: any) {
    return differenceInMinutes(new Date(), this.last_seen) < 5;
  });
  
  UserSchema.set('toJSON', {
    virtuals: true,
  });

UserSchema.pre('save', async function(next) {
    const user: any = this;
  
    if (!user.isModified('password')) {
        return next();
      }
    
      user.password = await generatePasswordHash(user.password);
      user.confirm_hash = await generatePasswordHash(new Date().toString());
  });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel
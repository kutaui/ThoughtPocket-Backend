import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    email: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

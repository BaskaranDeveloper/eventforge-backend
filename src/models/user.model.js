import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    { timestamps: true }
);

/* 🔐 HASH PASSWORD BEFORE SAVE (CORRECT) */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

/* 🔍 COMPARE PASSWORD */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

/* 🔁 GENERATE RESET TOKEN */
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;

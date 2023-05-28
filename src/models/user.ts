import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match : [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please input a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength : 6,
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    // Ensure that the email field exists and is a string
    if (this.email && typeof this.email === 'string') {
      // Convert the email to lowercase
      this.email = this.email.toLowerCase();
    }
    next();
});

const User = mongoose.model('User',userSchema);

export default User
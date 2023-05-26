import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
}, {
    timestamps: true
})

const Wallet = mongoose.model('Wallet',walletSchema);

export default Wallet
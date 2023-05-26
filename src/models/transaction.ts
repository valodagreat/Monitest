import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['Credit', 'Debit'],
        required: true
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction',transactionSchema);

export default Transaction
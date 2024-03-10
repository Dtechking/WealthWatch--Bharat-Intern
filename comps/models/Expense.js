const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String, // 'Expense' or 'Income'
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;

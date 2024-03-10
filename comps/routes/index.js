const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Expense = require('../models/Expense');
const expenseUtils = require('../expenseUtils')

// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard Page
router.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        // Fetch user-specific expenses
        const expenses = await Expense.find({ user: req.user._id }).sort('-date');

        // Render the dashboard with fetched expenses
        res.render('dashboard', { user: 
            req.user, 
            expenses,
            calculateTotalIncome: expenseUtils.calculateTotalIncome,
            calculateTotalExpenses: expenseUtils.calculateTotalExpenses,
            calculateBalance: expenseUtils.calculateBalance,
            getWeeklyExpenses: expenseUtils.getWeeklyExpenses, });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add Transaction
router.post('/addTransaction', isLoggedIn, async (req, res) => {
    const { description, amount, type } = req.body;

    // Create a new expense with user's identity
    const newExpense = new Expense({
        description,
        amount,
        type,
        user: req.user._id
    });

    // Save the expense to the database
    try {
        // Save the expense to the database
        await newExpense.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/transactions', isLoggedIn, async (req, res) => {
    try {
        // Fetch all expenses from the database for the user
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });

        // Render the transactions page with the fetched expenses
        res.render('transactions', {
            user: req.user,
            expenses,
        });
    } catch (err) {
        console.error(err);
        res.redirect('/'); // Redirect to the home page or handle the error as needed
    }
});

module.exports = router;

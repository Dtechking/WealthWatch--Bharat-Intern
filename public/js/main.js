// main.js

async function calculateTotalIncome(expenses) {
    try {
        const incomeEntries = await Expense.find({ user: expenses[0].user, type: 'Income' });
        return incomeEntries.reduce((total, entry) => total + entry.amount, 0);
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function calculateTotalExpenses(expenses) {
    try {
        const expenseEntries = await Expense.find({ user: expenses[0].user, type: 'Expense' });
        return expenseEntries.reduce((total, entry) => total + entry.amount, 0);
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function calculateBalance(expenses) {
    try {
        const totalIncome = await calculateTotalIncome(expenses);
        const totalExpenses = await calculateTotalExpenses(expenses);
        return totalIncome - totalExpenses;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function getWeeklyExpenses(expenses) {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyExpenses = await Expense.find({ user: expenses[0].user, date: { $gte: oneWeekAgo } });
        return weeklyExpenses;
    } catch (err) {
        console.error(err);
        return [];
    }
}


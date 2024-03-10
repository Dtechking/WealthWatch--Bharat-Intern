// expenseUtils.js

// Function to calculate total income
function calculateTotalIncome(expenses) {
    // Your logic to calculate total income
    return expenses.reduce((total, entry) => {
        if (entry.type === 'Income') {
            total += entry.amount;
        }
        return total;
    }, 0);
}

// Function to calculate total expenses
function calculateTotalExpenses(expenses) {
    // Your logic to calculate total expenses
    return expenses.reduce((total, entry) => {
        if (entry.type === 'Expense') {
            total += entry.amount;
        }
        return total;
    }, 0);
}

// Function to calculate balance
function calculateBalance(expenses) {
    // Your logic to calculate balance
    const totalIncome = calculateTotalIncome(expenses);
    const totalExpenses = calculateTotalExpenses(expenses);
    return totalIncome - totalExpenses;
}

// Function to get weekly expenses
function getWeeklyExpenses(expenses) {
    // Your logic to get weekly expenses
    // For example, return expenses from the last 7 days
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return expenses.filter(entry => new Date(entry.date) >= lastWeek);
}

module.exports = {
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateBalance,
    getWeeklyExpenses,
};

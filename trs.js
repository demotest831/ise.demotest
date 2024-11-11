let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let salary = parseFloat(localStorage.getItem('salary')) || 0;

function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!date || !category || !description || isNaN(amount) || amount <= 0) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const transaction = { date, category, description, amount };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    displayTransactions();
    updateTotal();
    document.getElementById('transaction-form').reset();
}

document.getElementById('budget-form').addEventListener('submit', function(event) {
    event.preventDefault();
    salary = parseFloat(document.getElementById('salary').value);
    if (isNaN(salary) || salary <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }
    localStorage.setItem('salary', salary);
    updateBudgetStatus();
});

document.getElementById('reset-form').addEventListener('click', function() {
    document.getElementById('transaction-form').reset();
});

function displayTransactions() {
    const transactionTable = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    transactionTable.innerHTML = '';

    transactions.forEach(transaction => {
        const row = transactionTable.insertRow();
        row.insertCell(0).textContent = transaction.date;
        row.insertCell(1).textContent = transaction.category;
        row.insertCell(2).textContent = transaction.description;
        row.insertCell(3).textContent = transaction.amount.toFixed(2);
    });
}

function updateTotal() {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

document.getElementById('submit-transactions').addEventListener('click', function() {
    updateChart();
    updateBudgetStatus();
});

function updateChart() {
    const categories = {};
    transactions.forEach(transaction => {
        categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    });

    const ctx = document.getElementById('transaction-chart').getContext('2d');
    const chartData = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Spending by Category',
            data: Object.values(categories),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
        }]
    };

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
    });
}

function updateBudgetStatus() {
    const totalSpending = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const budgetStatusElement = document.getElementById('budget-status');

    if (totalSpending > salary) {
        budgetStatusElement.textContent = `Over Budget: You have exceeded your budget by ${(totalSpending - salary).toFixed(2)}!`;
        budgetStatusElement.classList.add('over-budget');
        budgetStatusElement.classList.remove('saving');
    } else {
        budgetStatusElement.textContent = `Savings: You have saved ${(salary - totalSpending).toFixed(2)}!`;
        budgetStatusElement.classList.add('saving');
        budgetStatusElement.classList.remove('over-budget');
    }
}

document.getElementById('reset-history').addEventListener('click', function() {
    transactions = [];
    localStorage.removeItem('transactions');
    displayTransactions();
    updateTotal();
    updateChart();
    updateBudgetStatus();
});

document.getElementById('transaction-form').addEventListener('submit', addTransaction);
displayTransactions();
updateTotal();
updateBudgetStatus();
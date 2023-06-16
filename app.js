document.getElementById('expense-form').addEventListener('submit', addExpense);

function addExpense(e) {
  e.preventDefault();

  var expenseName = document.getElementById('expense-name').value;
  var expenseAmount = document.getElementById('expense-amount').value;

  var expense = {
    name: expenseName,
    amount: parseFloat(expenseAmount)
  };

  // Store expense data in local storage
  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear input fields
  document.getElementById('expense-name').value = '';
  document.getElementById('expense-amount').value = '';

  // Update expense list and total
  updateExpenseList();
  updateTotalAmount();
}

function updateExpenseList() {
  var expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  expenses.forEach(function(expense) {
    var li = document.createElement('li');
    li.textContent = expense.name + ' : Rs . ' + expense.amount.toFixed(2);
    expenseList.appendChild(li);
  });
}

function updateTotalAmount() {
  var totalAmount = document.getElementById('total-amount');
  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  var total = expenses.reduce(function(acc, expense) {
    return acc + expense.amount;
  }, 0);

  totalAmount.textContent = 'Total : ' + total.toFixed(2) + ' PKR';
}

function del() {
  var totalAmount = document.getElementById('total-amount');
  var expenses = JSON.parse(localStorage.clear('expenses')) || [];

  var total = expenses.reduce(function(acc, expense) {
    return acc + expense.amount;
  }, 0);

  totalAmount.textContent = 'Total : ' + total.toFixed(2) + ' PKR';
}

// Load expenses and total on page load
updateExpenseList();

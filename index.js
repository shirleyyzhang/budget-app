let expenses = []
const now = new Date()

// const entryContainer
const amountEl = document.getElementById("amount-el")
const budgetEl = document.getElementById("budget-section")
const budgetForm = document.getElementById("budget-form")
const budgetInput = document.getElementById("budget-input")
const mainApp = document.getElementById("main-app")
const entryForm = document.getElementById("entry-form")
const formDescriptionEl = document.getElementById('description-input')
const formAmountEl = document.getElementById('amount-input')
const personalTable = document.getElementById("personal-spending-table")
const monthlyTable = document.getElementById("monthly-expense-table")
const deleteBtn = document.getElementById("delete-btn")
const resetBtn = document.getElementById("reset-btn")

let budget = localStorage.getItem("budget") ? parseFloat(localStorage.getItem("budget")) : null
const expensesLocalStorage = JSON.parse(localStorage.getItem("expenses"))

startApp()


function startApp() {
    if (expensesLocalStorage) {
        expenses = expensesLocalStorage
    }

    if (budget !== null) {
        showApp();
    } else {
        hideApp();
    }
}


function showApp() {
    budgetEl.style.display = "none"
    mainApp.style.display = "block"
    render(expenses)
}


function hideApp() {
    budgetEl.style.display = "block"
    mainApp.style.display = "none"
}


function render(data) {
    let itemsPersonal = ''
    let itemsMonthly = ''
    let totalSpent = 0

    for (i = 0; i < data.length; i++) {
        console.log(i, ":", data[i].amount)
        totalSpent += parseFloat(data[i].amount)

        const entryDate = new Date(data[i].date);
        const sameMonth = entryDate.getFullYear() === now.getFullYear() && entryDate.getMonth() === now.getMonth();

        if (data[i].type === 'Personal' && sameMonth) {
            itemsPersonal += `
                <tr>
                    <td>${new Date(data[i].date).toLocaleDateString()}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].amount}</td>
                    <td><button class="delete-entry-btn" data-id="${data[i].id}">🗑️</button></td>
                </tr>
            `
        } else if (data[i].type === 'Monthly Expense' && sameMonth) {
            itemsMonthly += `
                <tr>
                    <td>${new Date(data[i].date).toLocaleDateString()}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].amount}</td>
                    <td><button class="delete-entry-btn" data-id="${data[i].id}">🗑️</button></td>
                </tr>
            `
        }
    }
    personalTable.innerHTML = itemsPersonal
    monthlyTable.innerHTML = itemsMonthly

    const deleteButtons = document.querySelectorAll(".delete-entry-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const idToDelete = parseInt(button.getAttribute("data-id"));
            expenses = expenses.filter(entry => entry.id !== idToDelete);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            render(expenses);
        });
    });

    const amountLeft = budget - totalSpent
    console.log("budget:", budget, "totalSpent:", totalSpent)
    amountEl.textContent = "Amount left: " + amountLeft.toFixed(2)
}


entryForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const formSelectedType = document.querySelector('input[name="type-input"]:checked');
    if (!formSelectedType) {
        alert("Please select a type of expense.");
        return;
    }

    const entry = {
        id: Date.now(),
        description: formDescriptionEl.value,
        amount: formAmountEl.value,
        type: formSelectedType.value,
        date: new Date().toISOString()
    }

    expenses.push(entry)
    formDescriptionEl.value = ''
    formAmountEl.value = ''

    localStorage.setItem("expenses", JSON.stringify(expenses))
    console.log(expenses)
    render(expenses)
})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem("expenses")
    expenses = []
    render(expenses)
})


resetBtn.addEventListener("dblclick", function() {
    localStorage.removeItem("budget")
    localStorage.removeItem("expenses")
    budget = null
    expenses = []
    amountEl.textContent = "Amount left: "
    startApp()
})


budgetForm.addEventListener("submit", function(event) {
    event.preventDefault()
    budget = parseFloat(budgetInput.value)
    localStorage.setItem("budget", budget)
    showApp()
})
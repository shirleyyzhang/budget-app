let budget = 0
let expenses = []

const entryForm = document.getElementById("entry-form")
const formDescriptionEl = document.getElementById('description-input')
const formAmountEl = document.getElementById('amount-input')
// const formSelectedType = document.querySelector('input[name="type-input"]:checked')
// const submitBtn = document.getElementById("submit-btn")
const personalTable = document.getElementById("personal-spending-table")
const monthlyTable = document.getElementById("monthly-expense-table")

const expensesLocalStorage = JSON.parse(localStorage.getItem("expenses"))


if (expensesLocalStorage) {
    console.log(expenses)
    expenses = expensesLocalStorage
    render(expenses)
}


function render(data) {
    let itemsPersonal = ''
    let itemsMonthly = ''
    for (i = 0; i < data.length; i++) {
        if (data[i].type === 'Personal') {
            itemsPersonal += `
                <tr>
                    <td>${data[i].date}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].amount}</td>
                </tr>
            `
        } else {
            itemsMonthly += `
                <tr>
                    <td>${data[i].date}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].amount}</td>
                </tr>
            `
        }
    }
    personalTable.innerHTML = itemsPersonal
    monthlyTable.innerHTML = itemsMonthly

    console.log(personalTable)
    console.log(monthlyTable)
}


entryForm.addEventListener("submit", function(event) {
    event.preventDefault
    const formSelectedType = document.querySelector('input[name="type-input"]:checked');

    const entry = {
        description: formDescriptionEl.value,
        amount: formAmountEl.value,
        type: formSelectedType.value,
        date: new Date().toLocaleDateString()
    }

    expenses.push(entry)
    formDescriptionEl.value = ''
    formAmountEl.value = ''

    localStorage.setItem("expenses", JSON.stringify(expenses))
    console.log(expenses)
    render(expenses)
})
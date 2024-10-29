let balance = 0;
let accountHolder = {};
let transactionHistory = [];

document
  .getElementById("createAccountBtn")
  .addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!firstName || !lastName || !email || !phone || !address) {
      displayError("Please fill in all fields.", "errorMessage");
      return;
    }

    accountHolder = { firstName, lastName, email, phone, address };
    document.getElementById(
      "accountInfo"
    ).innerText = `Account Holder: ${accountHolder.firstName} ${accountHolder.lastName}, Email: ${accountHolder.email}, Phone: ${accountHolder.phone}, Address: ${accountHolder.address}`;

    document.getElementById("accountSection").style.display = "none"; // Hide account creation section
    document.getElementById("transactionSection").style.display = "block"; // Show transaction section
    document.getElementById("transactionHistory").style.display = "block"; // Show transaction history section
    updateBalance(); // Initialize balance display
    clearError("errorMessage"); // Clear any previous error
  });

document.getElementById("depositBtn").addEventListener("click", function () {
  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    displayError("Please enter a valid amount.", "errorMessageTrans");
    return;
  }

  balance += amount;
  updateTransactionHistory("Deposit", amount);
  updateBalance();
  amountInput.value = ""; // Clear input
  clearError("errorMessageTrans"); // Clear any previous error
});

document.getElementById("withdrawBtn").addEventListener("click", function () {
  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    displayError("Please enter a valid amount.", "errorMessageTrans");
    return;
  }

  if (amount > balance) {
    displayError("Insufficient balance!", "errorMessageTrans");
    return;
  }

  balance -= amount;
  updateTransactionHistory("Withdraw", amount);
  updateBalance();
  amountInput.value = ""; // Clear input
  clearError("errorMessageTrans"); // Clear any previous error
});

document
  .getElementById("checkBalanceBtn")
  .addEventListener("click", function () {
    updateBalance();
    clearError("errorMessageTrans"); // Clear any previous error
  });

function updateBalance() {
  document.getElementById("balance").innerText = `Balance: $${balance.toFixed(
    2
  )}`;
}

function updateTransactionHistory(action, amount) {
  const transaction = `${action}: $${amount.toFixed(2)}`;
  transactionHistory.push(transaction);
  const historyList = document.getElementById("historyList");
  const listItem = document.createElement("li");
  listItem.textContent = transaction;
  historyList.appendChild(listItem);
}

function displayError(message, elementId) {
  document.getElementById(elementId).innerText = message;
}

function clearError(elementId) {
  document.getElementById(elementId).innerText = "";
}

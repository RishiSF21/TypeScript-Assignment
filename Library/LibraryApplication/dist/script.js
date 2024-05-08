"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CurrentUser;
let currentBook;
function CloseNavbar() {
    let nav = document.getElementById("navbar");
    nav.style.display = "none";
    let navHome = document.getElementById("home-page");
    navHome.style.display = "none";
    let openNav = document.getElementById("navbar2");
    openNav.style.display = "block";
}
//Close Functions
function CloseMainPages() {
    let showsignin = document.getElementById("signInForm");
    showsignin.style.display = "none";
    let showsignup = document.getElementById("signUpForm");
    showsignup.style.display = "none";
    let successMsg = document.getElementById("registerMsg");
    successMsg.style.display = "none";
}
//Hide LoggedHome
function HideHome() {
    let loggedhome = document.getElementById("loggedHome");
    loggedhome.style.display = "none";
    let borrowPage = document.getElementById("borrowPage");
    borrowPage.style.display = "none";
    let takeBook = document.getElementById("takeBook");
    takeBook.style.display = "none";
    let showHistory = document.getElementById("history");
    showHistory.style.display = "none";
    let returnPage = document.getElementById("returnBookPage");
    returnPage.style.display = "none";
    let returnBook = document.getElementById("page4");
    returnBook.style.display = "none";
    let wBalance = document.getElementById("balance");
    wBalance.style.display = "none";
}
//Displaying Pages
function DisplayHome() {
    CloseMainPages();
    HideHome();
    let openNav = document.getElementById("navbar2");
    openNav.style.display = "none";
    let nav = document.getElementById("navbar");
    nav.style.display = "block";
    let homep = document.getElementById("home-page");
    homep.style.display = "block";
}
//DisplayHomePage
function DisplayLoggedHomePage() {
    HideHome();
    let loggedhome = document.getElementById("loggedHome");
    loggedhome.style.display = "block";
    let welcome = document.getElementById("welcomeUser");
    welcome.innerHTML = `<em>${CurrentUser.userName}</em>`;
}
//DisplaySignIn
function DisplaySignIn() {
    CloseMainPages();
    let showsignin = document.getElementById("signInForm");
    showsignin.style.display = "block";
}
//DisplaySignUpPage
function DisplaySignUpPage() {
    CloseMainPages();
    let showsignup = document.getElementById("signUpForm");
    showsignup.style.display = "block";
}
//Functionalities
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let mailBox = document.getElementById("signInMail");
        let loggedUsers = yield fetchUsers();
        let isUser = true;
        for (let i = 0; i < loggedUsers.length; i++) {
            if (loggedUsers[i].mailID == mailBox.value) {
                CurrentUser = loggedUsers[i];
                isUser = false;
                CloseNavbar();
                CloseMainPages();
                DisplayLoggedHomePage();
                break;
            }
        }
        if (isUser) {
            alert("User not found");
        }
    });
}
//BorrowBook
function BorrowBook() {
    return __awaiter(this, void 0, void 0, function* () {
        HideHome();
        let borrowPage = document.getElementById("borrowPage");
        borrowPage.style.display = "block";
        let bookList = yield fetchBooks();
        let bookTable = `<table border='3'>`;
        bookTable += `<tr><th>Book ID</th><th>Book Name</th><th>Author Name</th><th>Book Count</th><th>Action</th></tr>`;
        for (let i = 0; i < bookList.length; i++) {
            bookTable += `<tr><td>${bookList[i].bookID}</td><td>${bookList[i].bookName}</td><td>${bookList[i].authorName}</td><td>${bookList[i].bookCount}</td><td><button style="background-color: white" onclick="ShowBook(${bookList[i].bookID})">Borrow</button></td></tr>`;
        }
        borrowPage.innerHTML = bookTable;
    });
}
function ShowBook(bID) {
    let takeBook = document.getElementById("takeBook");
    takeBook.style.display = "block";
    let bookBtn = document.getElementById("showBookBtn");
    let submitBtn = `<button id="bookSubmit" onclick="TakeBook(${bID})">Take Book</button>`;
    bookBtn.innerHTML = submitBtn;
}
let selectedBook;
function TakeBook(bID) {
    return __awaiter(this, void 0, void 0, function* () {
        let bCount = document.getElementById("bookCountNo");
        let histories = yield fetchBorrowHistory();
        //find number of book user already borrowed
        let alreadyBorrowedCount = 0;
        histories.forEach((info) => {
            if (CurrentUser.userID == info.userID && info.status == "Borrowed") {
                alreadyBorrowedCount += info.borrowBookCount;
            }
        });
        //Checking Book count availability
        let bookList = yield fetchBooks();
        for (let i = 0; i < bookList.length; i++) {
            if (bookList[i].bookID == bID) {
                selectedBook = bookList[i];
                if (bookList[i].bookCount >= parseInt(bCount.value)) {
                    //Check user book count in history
                    for (let i = 0; i < histories.length; i++) {
                        if (histories[i].userID == CurrentUser.userID) {
                            if (alreadyBorrowedCount < 3) {
                                let issueBook = {
                                    borrowID: undefined,
                                    bookID: selectedBook.bookID,
                                    userID: CurrentUser.userID,
                                    borrowedDate: new Date(),
                                    borrowBookCount: parseInt(bCount.value),
                                    status: "Borrowed",
                                    paidFineAmount: 0
                                };
                                addHistory(issueBook);
                                bookList[i].bookCount -= parseInt(bCount.value);
                                updateBook(selectedBook.bookID, selectedBook);
                                alert("Book issued successfully!!");
                                break;
                            }
                            else if (alreadyBorrowedCount == 3) {
                                alert("You have borrowed 3 books already");
                                break;
                            }
                            else { }
                        }
                    }
                }
                else {
                    alert("Books are not available for the selected count");
                    break;
                }
            }
        }
    });
}
//Show BorrowHistory
function BorrowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        HideHome();
        let showHistory = document.getElementById("history");
        showHistory.style.display = "block";
        let histories = yield fetchBorrowHistory();
        let historyTable = `<table border='3'>`;
        historyTable += `<tr><th>Borrow ID</th><th>Book ID</th><th>User ID</th><th>Borrowed Date</th><th>Borrowed Book Count</th><th>Status</th><th>Paid Fine Amount</th></tr>`;
        histories.forEach((data) => {
            if (data.userID == CurrentUser.userID) {
                historyTable += `<tr><td>${data.borrowID}</td><td>${data.bookID}</td><td>${data.userID}</td><td>${data.borrowedDate.toString().substring(0, 10)}</td><td>${data.borrowBookCount}</td><td>${data.status}</td><td>${data.paidFineAmount}</td></tr>`;
            }
        });
        showHistory.innerHTML = historyTable;
    });
}
//Return Book
function GoToReturn() {
    return __awaiter(this, void 0, void 0, function* () {
        HideHome();
        let showHistory = document.getElementById("returnBookPage");
        showHistory.style.display = "block";
        let histories = yield fetchBorrowHistory();
        let historyTable = `<table border='3'>`;
        historyTable += `<tr><th>Borrow ID</th><th>Book ID</th><th>User ID</th><th>Borrowed Date</th><th>Borrowed Book Count</th><th>Status</th><th>Paid Fine Amount</th><th>Action</th></tr>`;
        histories.forEach((data) => {
            if (data.userID == CurrentUser.userID && data.status == "Borrowed") {
                historyTable += `<tr><td>${data.borrowID}</td><td>${data.bookID}</td><td>${data.userID}</td><td>${data.borrowedDate.toString().substring(0, 10)}</td><td>${data.borrowBookCount}</td><td>${data.status}</td><td>${data.paidFineAmount}</td><td><button onclick="ReturnBook(${data.borrowID})">Return Book</button></td></tr>`;
            }
        });
        showHistory.innerHTML = historyTable;
    });
}
function ReturnBook(borID) {
    return __awaiter(this, void 0, void 0, function* () {
        let calculateFine;
        let borrowList;
        let histories = yield fetchBorrowHistory();
        let bookList = yield fetchBooks();
        histories.forEach((data) => {
            if (data.borrowID == borID) {
                borrowList = data;
                let returnDate = addDays(data.borrowedDate, 15);
                let orgDate = new Date(data.borrowedDate);
                let finalDate = new Date().getTime() - orgDate.getTime();
                let differenceInDate = Math.round(finalDate / (1000 * 3600 * 24));
                if (differenceInDate < 15) {
                    // let fine = 15 - differenceInDate
                    // borrowList.paidFineAmount = fine
                    borrowList.status = "Returned";
                    updateBorrow(borID, borrowList);
                    // CurrentUser.walletBalance -= fine
                    for (let i = 0; i < bookList.length; i++) {
                        if (bookList[i].bookID == borrowList.bookID) {
                            let currentBook = bookList[i];
                            bookList[i].bookCount += borrowList.borrowBookCount;
                            updateBook(currentBook.bookID, currentBook);
                            alert("Book returned successfully");
                            break;
                        }
                    }
                }
                else if (differenceInDate > 15) {
                    let fine = differenceInDate - 15;
                    borrowList.paidFineAmount = fine;
                    borrowList.status = "Returned";
                    updateBorrow(borID, borrowList);
                    CurrentUser.walletBalance -= fine;
                    for (let i = 0; i < bookList.length; i++) {
                        if (bookList[i].bookID == borrowList.bookID) {
                            let currentBook = bookList[i];
                            bookList[i].bookCount += borrowList.borrowBookCount;
                            updateBook(currentBook.bookID, currentBook);
                            alert("Book returned successfully");
                            break;
                        }
                    }
                }
            }
        });
    });
}
function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(new Date(date).getDate() + days);
    return newDate;
}
//Balance
function WalletBalance() {
    HideHome();
    let wBalance = document.getElementById("balance");
    wBalance.style.display = "block";
}
function TopUp() {
    let amount = document.getElementById("topUp");
    CurrentUser.walletBalance += parseInt(amount.value);
    updateBalance(CurrentUser.userID, CurrentUser);
    alert("Recharge Successfull !!");
}
//API calls
//Fetch functions
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5035/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5035/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        return yield response.json();
    });
}
function fetchBorrowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5035/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        return yield response.json();
    });
}
//Add function
function addHistory(history) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5035/api/BorrowDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history)
        });
        if (!response.ok) {
            throw new Error('Failed to add to borrow history');
        }
        // renderContacts();
    });
}
// Update Functions
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5035/api/BorrowDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        // renderContacts();
    });
}
function updateBook(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5035/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        // renderContacts();
    });
}
function updateBalance(id, topup) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5035/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topup)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        // renderContacts();
    });
}

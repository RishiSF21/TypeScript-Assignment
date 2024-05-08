let CurrentUser: UserDetails
let currentBook: BookDetails

interface UserDetails {
    userID: any
    userName: string
    gender: string
    department: string
    mobileNumber: string
    walletBalance: number
    mailID: string
}

interface BookDetails {
    bookID: any
    bookName: string
    authorName: string
    bookCount: number
}

interface BorrowDetails {
    borrowID: any
    bookID: number
    userID: number
    borrowedDate: Date
    borrowBookCount: number
    status: string
    paidFineAmount: number
}

function CloseNavbar() {
    let nav = document.getElementById("navbar") as HTMLDivElement
    nav.style.display = "none"

    let navHome = document.getElementById("home-page") as HTMLDivElement
    navHome.style.display = "none"

    let openNav = document.getElementById("navbar2") as HTMLDivElement
    openNav.style.display = "block"
}
//Close Functions
function CloseMainPages() {
    let showsignin = document.getElementById("signInForm") as HTMLDivElement
    showsignin.style.display = "none"

    let showsignup = document.getElementById("signUpForm") as HTMLDivElement
    showsignup.style.display = "none"

    let successMsg = document.getElementById("registerMsg") as HTMLDivElement
    successMsg.style.display = "none"
}

//Hide LoggedHome
function HideHome() {
    let loggedhome = document.getElementById("loggedHome") as HTMLDivElement
    loggedhome.style.display = "none"

    let borrowPage = document.getElementById("borrowPage") as HTMLDivElement
    borrowPage.style.display = "none"

    let takeBook = document.getElementById("takeBook") as HTMLDivElement
    takeBook.style.display = "none"

    let showHistory = document.getElementById("history") as HTMLDivElement
    showHistory.style.display = "none"

    let returnPage = document.getElementById("returnBookPage") as HTMLDivElement
    returnPage.style.display = "none"

    let returnBook = document.getElementById("page4") as HTMLDivElement
    returnBook.style.display = "none"

    let wBalance = document.getElementById("balance") as HTMLDivElement
    wBalance.style.display = "none"
}

//Displaying Pages
function DisplayHome() {
    CloseMainPages()
    HideHome()
    let openNav = document.getElementById("navbar2") as HTMLDivElement
    openNav.style.display = "none"
    let nav = document.getElementById("navbar") as HTMLDivElement
    nav.style.display = "block"
    let homep = document.getElementById("home-page") as HTMLDivElement
    homep.style.display = "block"
}

//DisplayHomePage
function DisplayLoggedHomePage() {
    HideHome()
    let loggedhome = document.getElementById("loggedHome") as HTMLDivElement
    loggedhome.style.display = "block"

    let welcome = document.getElementById("welcomeUser") as HTMLDivElement
    welcome.innerHTML = `<em>${CurrentUser.userName}</em>`
}

//DisplaySignIn
function DisplaySignIn() {
    CloseMainPages()

    let showsignin = document.getElementById("signInForm") as HTMLDivElement
    showsignin.style.display = "block"
}

//DisplaySignUpPage
function DisplaySignUpPage() {
    CloseMainPages()

    let showsignup = document.getElementById("signUpForm") as HTMLDivElement
    showsignup.style.display = "block"
}

//Functionalities
async function SignIn() {
    let mailBox = document.getElementById("signInMail") as HTMLInputElement

    let loggedUsers = await fetchUsers()

    let isUser: boolean = true

    for (let i = 0; i < loggedUsers.length; i++) {
        if (loggedUsers[i].mailID == mailBox.value) {
            CurrentUser = loggedUsers[i]
            isUser = false
            CloseNavbar()
            CloseMainPages()
            DisplayLoggedHomePage()
            break
        }
    }
    if (isUser) {
        alert("User not found")
    }
}

//BorrowBook
async function BorrowBook() {
    HideHome()
    let borrowPage = document.getElementById("borrowPage") as HTMLDivElement
    borrowPage.style.display = "block"

    let bookList = await fetchBooks()
    let bookTable = `<table border='3'>`
    bookTable += `<tr><th>Book ID</th><th>Book Name</th><th>Author Name</th><th>Book Count</th><th>Action</th></tr>`

    for (let i = 0; i < bookList.length; i++) {
        bookTable += `<tr><td>${bookList[i].bookID}</td><td>${bookList[i].bookName}</td><td>${bookList[i].authorName}</td><td>${bookList[i].bookCount}</td><td><button style="background-color: white" onclick="ShowBook(${bookList[i].bookID})">Borrow</button></td></tr>`
    }

    borrowPage.innerHTML = bookTable
}

function ShowBook(bID: any) {
    let takeBook = document.getElementById("takeBook") as HTMLDivElement
    takeBook.style.display = "block"

    let bookBtn = document.getElementById("showBookBtn") as HTMLDivElement

    let submitBtn = `<button id="bookSubmit" onclick="TakeBook(${bID})">Take Book</button>`
    bookBtn.innerHTML = submitBtn
}

let selectedBook: BookDetails

async function TakeBook(bID: any) {
    let bCount = document.getElementById("bookCountNo") as HTMLInputElement
    let histories = await fetchBorrowHistory()
    //find number of book user already borrowed
    let alreadyBorrowedCount: number = 0
    histories.forEach((info) => {
        if(CurrentUser.userID == info.userID && info.status == "Borrowed")
        {
            alreadyBorrowedCount += info.borrowBookCount
        }
    })
    //Checking Book count availability
    let bookList = await fetchBooks()
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].bookID == bID) {
            selectedBook = bookList[i]
            if (bookList[i].bookCount >= parseInt(bCount.value)) {
                //Check user book count in history
                for(let i=0; i<histories.length; i++)
                {
                    if(histories[i].userID == CurrentUser.userID)
                    {
                        if (alreadyBorrowedCount < 3) {
                            let issueBook: BorrowDetails = {
                                borrowID: undefined,
                                bookID: selectedBook.bookID,
                                userID: CurrentUser.userID,
                                borrowedDate: new Date(),
                                borrowBookCount: parseInt(bCount.value),
                                status: "Borrowed",
                                paidFineAmount: 0
                            }
                            addHistory(issueBook)
                            bookList[i].bookCount -= parseInt(bCount.value)
                            updateBook(selectedBook.bookID,selectedBook)
                            alert("Book issued successfully!!")
                            break
                        }
                        else if(alreadyBorrowedCount == 3)
                        {
                            alert("You have borrowed 3 books already")
                            break
                        }
                        else{}
                    }
                }
                
            }
            else {
                alert("Books are not available for the selected count")
                break
            }
        }
    }
}

//Show BorrowHistory
async function BorrowHistory()
{
    HideHome()
    let showHistory = document.getElementById("history") as HTMLDivElement
    showHistory.style.display = "block"

    let histories = await fetchBorrowHistory()

    let historyTable = `<table border='3'>`
    historyTable += `<tr><th>Borrow ID</th><th>Book ID</th><th>User ID</th><th>Borrowed Date</th><th>Borrowed Book Count</th><th>Status</th><th>Paid Fine Amount</th></tr>`
    histories.forEach((data) => {
        if(data.userID == CurrentUser.userID)
        {
            historyTable += `<tr><td>${data.borrowID}</td><td>${data.bookID}</td><td>${data.userID}</td><td>${data.borrowedDate.toString().substring(0,10)}</td><td>${data.borrowBookCount}</td><td>${data.status}</td><td>${data.paidFineAmount}</td></tr>`
        }
    })

    showHistory.innerHTML = historyTable
}

//Return Book
async function GoToReturn()
{
    HideHome()
    
    let showHistory = document.getElementById("returnBookPage") as HTMLDivElement
    showHistory.style.display = "block"

    let histories = await fetchBorrowHistory()

    let historyTable = `<table border='3'>`
    historyTable += `<tr><th>Borrow ID</th><th>Book ID</th><th>User ID</th><th>Borrowed Date</th><th>Borrowed Book Count</th><th>Status</th><th>Paid Fine Amount</th><th>Action</th></tr>`
    histories.forEach((data) => {
        if(data.userID == CurrentUser.userID && data.status == "Borrowed")
        {
            historyTable += `<tr><td>${data.borrowID}</td><td>${data.bookID}</td><td>${data.userID}</td><td>${data.borrowedDate.toString().substring(0,10)}</td><td>${data.borrowBookCount}</td><td>${data.status}</td><td>${data.paidFineAmount}</td><td><button onclick="ReturnBook(${data.borrowID})">Return Book</button></td></tr>`
        }
    })

    showHistory.innerHTML = historyTable
}

async function ReturnBook(borID: number)
{
    let calculateFine: any
    let borrowList: BorrowDetails
    let histories = await fetchBorrowHistory()
    let bookList = await fetchBooks()
    histories.forEach((data) => {
        if(data.borrowID == borID)
        {
            borrowList = data
            let returnDate = addDays(data.borrowedDate,15)
            let orgDate = new Date(data.borrowedDate)
            let finalDate = new Date().getTime() - orgDate.getTime()
            let differenceInDate = Math.round(finalDate/(1000*3600*24))
            if(differenceInDate < 15)
            {
                // let fine = 15 - differenceInDate
                // borrowList.paidFineAmount = fine
                borrowList.status = "Returned"
                updateBorrow(borID,borrowList)
                // CurrentUser.walletBalance -= fine
                for(let i=0; i<bookList.length; i++)
                {
                    if(bookList[i].bookID == borrowList.bookID)
                    {
                        let currentBook: BookDetails = bookList[i]
                        bookList[i].bookCount += borrowList.borrowBookCount
                        updateBook(currentBook.bookID, currentBook)
                        alert("Book returned successfully")
                        break
                    }
                }
            }
            else if(differenceInDate > 15)
            {
                let fine = differenceInDate - 15
                borrowList.paidFineAmount = fine
                borrowList.status = "Returned"
                updateBorrow(borID,borrowList)
                CurrentUser.walletBalance -= fine
                for(let i=0; i<bookList.length; i++)
                {
                    if(bookList[i].bookID == borrowList.bookID)
                    {
                        let currentBook: BookDetails = bookList[i]
                        bookList[i].bookCount += borrowList.borrowBookCount
                        updateBook(currentBook.bookID, currentBook)
                        alert("Book returned successfully")
                        break
                    }
                }
            }
        }
    })
}

function addDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(new Date(date).getDate() + days);
    return newDate;
}
//Balance
function WalletBalance()
{
    HideHome()
    let wBalance = document.getElementById("balance") as HTMLDivElement
    wBalance.style.display = "block"
}

function TopUp()
{
    let amount = document.getElementById("topUp") as HTMLInputElement
    CurrentUser.walletBalance += parseInt(amount.value)
    updateBalance(CurrentUser.userID,CurrentUser)
    alert("Recharge Successfull !!")
}

//API calls
//Fetch functions
async function fetchUsers(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5035/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function fetchBooks(): Promise<BookDetails[]> {
    const apiUrl = 'http://localhost:5035/api/BookDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch book details');
    }
    return await response.json();
}

async function fetchBorrowHistory(): Promise<BorrowDetails[]> {
    const apiUrl = 'http://localhost:5035/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }
    return await response.json();
}

//Add function
async function addHistory(history: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5035/api/BorrowDetails`, {
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
}

// Update Functions
async function updateBorrow(id: any, borrow: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5035/api/BorrowDetails/${id}`, {
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
  }

  async function updateBook(id: any, borrow: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5035/api/BookDetails/${id}`, {
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
  }

async function updateBalance(id: any, topup: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5035/api/UserDetails/${id}`, {
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
  }

//AutoIncrement Fields
// let cardNumberAI = 1000
// let TravelIDAI= 2000
// let ticketIDAI = 3000

//Object of Current Logged in user
let CurrentUser: UserDetails

//Classes
//UserDetails class
interface UserDetails
{
    cardNumber: number
    userName: string
    email: string
    password: string
    phoneNo: number
    balance: number

}

//TicketFairDetails
interface TicketFairDetails
{
    ticketID: number
    fromLocation: string
    toLocation: string
    fair: number
}

//TravelHistoryDetails Class
interface TravelHistoryDetails
{
    travelID: number
    cardNumber: number
    fromLocation: string
    toLocation: string
    dateOfTravel: Date
    travelCost: number
}

//DefaultData
//UserList
// let UserList: Array<UserDetails> = new Array<UserDetails>()
// UserList.push(new UserDetails("Rishi","rishi@gmail.com","rishi",7397688707))
// UserList.push(new UserDetails("Parkavi","paru@gmail.com","paru",8056788723))

//TicketFairList
// let TicketFairList: Array<TicketFairDetails> = new Array<TicketFairDetails>()
// TicketFairList.push(new TicketFairDetails("Airport","Egmore",55))
// TicketFairList.push(new TicketFairDetails("Airport","Koyembedu",25))
// TicketFairList.push(new TicketFairDetails("Alandur","Koyembedu",25))
// TicketFairList.push(new TicketFairDetails("Koyembedu","Egmore",32))
// TicketFairList.push(new TicketFairDetails("Vadapalani","Egmore",45))
// TicketFairList.push(new TicketFairDetails("Arumbakkam","Egmore",25))
// TicketFairList.push(new TicketFairDetails("Vadapalani","Koyembedu",25))
// TicketFairList.push(new TicketFairDetails("Arumbakkam","Koyembedu",16))

//TravelList
// let TravelList: Array<TravelHistoryDetails> = new Array<TravelHistoryDetails>()
// TravelList.push(new TravelHistoryDetails("CMRL1001","Airport","Egmore",new Date(2023,10,10),55))
// TravelList.push(new TravelHistoryDetails("CMRL1001","Egmore","Koyembedu",new Date(2023,10,10),32))
// TravelList.push(new TravelHistoryDetails("CMRL1002","Alandur","Koyembedu",new Date(2023,11,10),25))
// TravelList.push(new TravelHistoryDetails("CMRL1001","Egmore","Thirumangalam",new Date(2023,11,10),25))

//CloseNavbar
function CloseNavbar(){
    let nav = document.getElementById("navbar") as HTMLDivElement
    nav.style.display = "none"

    let navHome = document.getElementById("home-page") as HTMLDivElement
    navHome.style.display = "none"

    let openNav = document.getElementById("navbar2") as HTMLDivElement
    openNav.style.display = "block"
}
//Close Functions
function CloseMainPages(){
    let showsignin = document.getElementById("signInForm") as HTMLDivElement
    showsignin.style.display = "none"

    let showsignup = document.getElementById("signUpForm") as HTMLDivElement
    showsignup.style.display = "none"

    let successMsg = document.getElementById("registerMsg") as HTMLDivElement
    successMsg.style.display = "none"
}
//Displaying Pages
function DisplayHome(){
    CloseMainPages()
    HideHome()
    let openNav = document.getElementById("navbar2") as HTMLDivElement
    openNav.style.display = "none"
    let nav = document.getElementById("navbar") as HTMLDivElement
    nav.style.display = "block"
    let homep = document.getElementById("home-page") as HTMLDivElement
    homep.style.display = "block"

    // UserList.forEach((data) => {
    //     if(data.cardNumber == CurrentUser.cardNumber)
    //     {
    //         CurrentUser.cardNumber = ""
    //         CurrentUser.email = ""
    //         CurrentUser.password = ""
    //     }
    // })
}
//DisplayHomePage
function DisplayLoggedHomePage(){
    HideHome()
    let loggedhome = document.getElementById("loggedHome") as HTMLDivElement
    loggedhome.style.display = "block"

    let welcome = document.getElementById("welcomeUser") as HTMLDivElement
    welcome.innerHTML = `<em>${CurrentUser.userName}</em>`
}

//Hide LoggedHome
function HideHome(){
    let loggedhome = document.getElementById("loggedHome") as HTMLDivElement
    loggedhome.style.display = "none"

    let balancePage = document.getElementById("balance") as HTMLDivElement
    balancePage.style.display = "none"

    let recharge = document.getElementById("recharge") as HTMLDivElement
    recharge.style.display = "none"

    let showHistory = document.getElementById("trHistory") as HTMLDivElement
    showHistory.style.display = "none"

    let showTravel = document.getElementById("travel") as HTMLDivElement
    showTravel.style.display = "none"
}

//DisplaySignIn
function DisplaySignIn(){
    CloseMainPages()

    let showsignin = document.getElementById("signInForm") as HTMLDivElement
    showsignin.style.display = "block"
}

//DisplaySignUpPage
function DisplaySignUpPage(){
    CloseMainPages()

    let showsignup = document.getElementById("signUpForm") as HTMLDivElement
    showsignup.style.display = "block"
}

//WalletPage
function DisplayBalancePage(){
    let showBalance = document.getElementById("balance") as HTMLDivElement
    showBalance.style.display = "block"
    BalanceCheck()
}

//RechargePage
function RechargePage(){
    HideHome()
    let recharge = document.getElementById("recharge") as HTMLDivElement
    recharge.style.display = "block"
}

//TravelHistoryPage
function TravelHistoryPage(){
    HideHome()
    
    let showHistory = document.getElementById("trHistory") as HTMLDivElement
    showHistory.style.display = "block"

    TravelHistory()
}

//TravelPage
function TravelPage(){
    HideHome()

    let showTravel = document.getElementById("travel") as HTMLDivElement
    showTravel.style.display = "block"

    Travel()
}

//Functionalities
//LoginResponse
function SignUpResponse(){

    let name = document.getElementById("signUpName") as HTMLInputElement
    let mail = document.getElementById("signUpMail") as HTMLInputElement
    let password = document.getElementById("signUpPassword") as HTMLInputElement
    let phone = document.getElementById("signUpNumber") as HTMLInputElement

    let user1: UserDetails = {
        cardNumber: -1,
        userName: name.value,
        email: mail.value,
        password: password.value,
        phoneNo: parseInt(phone.value),
        balance: 250
    }

    // UserList.push(new UserDetails(name.value, mail.value, password.value, parseInt(phone.value)))
    

    let registerMsg = document.getElementById("registerMsg") as HTMLDivElement
    registerMsg.innerHTML = "Registration Successfull !!"
    addUsers(user1);
}

//SignIn
async function SignIn(){
    let getMail = document.getElementById("signInMail") as HTMLInputElement
    let getPass = document.getElementById("signInPassword") as HTMLInputElement

    let isValid = true
    let loggedUsers = await fetchUsers();
    loggedUsers.forEach((users) => {
        if(users.email == getMail.value && users.password == getPass.value){
            isValid = false
            CurrentUser = users
            CloseNavbar()
            CloseMainPages()
            DisplayLoggedHomePage()
        }
    })
    if(isValid){
        alert("Invalid User")
    }
    getMail.value = ""
    getPass.value = ""
}

// 1. BalanceCheck
function BalanceCheck(){
    HideHome()
    let balance = document.getElementById("balance") as HTMLDivElement
    balance.style.display = "block"
    let balancePage = document.getElementById("showBalance") as HTMLDivElement
    balancePage.innerHTML = `<h3>Wallet Balance Rs. ${CurrentUser.balance}</h3>`
}

//2. RechargeWallet
function RechargeWallet(){

    let amount = document.getElementById("amount") as HTMLInputElement
    CurrentUser.balance += parseInt(amount.value)
    
    let message = document.getElementById("topUpMsg") as HTMLDivElement
    message.innerHTML = `<em style="color: maroon">Recharge Done Successfully for Rs. ${amount.value}</em>`

    amount.value = ""
}

//3. TravelHistory
async function TravelHistory(){
    let isData = true
    let historyTable = `<table border='3' style="background-color: red">`
    historyTable += `<tr><th>Travel ID</th><th>Boarding Point</th><th>Destination Point</th><th>Travel Date</th><th>Travel Cost</th></tr>`

    let histories = await fetchHistory();
    histories.forEach((rows) => {
        if(rows.cardNumber == CurrentUser.cardNumber){
            isData = false
            historyTable += `<tr><td>${rows.travelID}</td><td>${rows.fromLocation}</td><td>${rows.toLocation}</td><td>${rows.dateOfTravel.toString()}</td><td>${rows.travelCost}</td></tr>`
        }
    })
    if(isData){
        alert("No History Found")
    }

    let showTable = document.getElementById("travelHistory") as HTMLDivElement
    showTable.innerHTML = historyTable
}

//4. Travel
async function Travel()
{
    let travelTable = `<table border = '3'>`
    travelTable += `<tr><th>Ticket ID</th><th>From</th><th>Destination</th><th>Ticket Fair</th><th>Action</th></tr>`
    let fairList = await fetchTicketFairs();
    fairList.forEach((data) => {
        travelTable += `<tr><td>${data.ticketID}</td><td>${data.fromLocation}</td><td>${data.toLocation}</td><td>${data.fair}</td><td><button onclick="BuyTicket('${data.ticketID}')" style="background-color:black; color: white">Buy Ticket</button></td></tr>`
    })

    let displayFair = document.getElementById("fairs") as HTMLDivElement
    displayFair.innerHTML = travelTable
}

async function BuyTicket(tID: number)
{
    let msg = document.getElementById("ticketMsg") as HTMLDivElement
    let fairs = await fetchTicketFairs();

    fairs.forEach((data) => {
        if(data.ticketID == tID){
            if(CurrentUser.balance >= data.fair){
                CurrentUser.balance -= data.fair
                let history: TravelHistoryDetails = {
                    travelID: 204,
                    cardNumber: CurrentUser.cardNumber,
                    fromLocation: data.fromLocation,
                    toLocation: data.toLocation,
                    dateOfTravel: new Date(),
                    travelCost: data.fair
                }
                addHistory(history);
                // TravelList.push(new TravelHistoryDetails(CurrentUser.cardNumber,data.FromLocation,data.ToLocation,new Date(),data.Fair))
                
                msg.innerHTML = "<strong style='color: green'>Ticket Booked Successfully</strong>"
            }
        }
    })
}

async function addUsers(user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5108/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
    else
    {
        console.log("ADDED");
    }
    // renderContacts();
  }

  async function addHistory(history: TravelHistoryDetails): Promise<void> {
    const response = await fetch(`http://localhost:5108/api/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(history)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
    // renderContacts();
  }

  async function fetchUsers(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5108/api/users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchTicketFairs(): Promise<TicketFairDetails[]> {
    const apiUrl = 'http://localhost:5108/api/fair';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchHistory(): Promise<TravelHistoryDetails[]> {
    const apiUrl = 'http://localhost:5108/api/History';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }
"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUser;
// let CurrentUserName: string;
let CurrentMedicine;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Ordered"] = "Ordered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
//User Class
class User {
    constructor(paramUserEmail, paramUserPassword, paramUserPhoneNumber) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserEmail = paramUserEmail;
        this.UserPassword = paramUserPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = 1000;
    }
}
//MedicineInfo Class
class MedicineInfo {
    constructor(paramMedicineName, paramMedicineCount, paramMedicinePrice, paramExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.ExpiryDate = paramExpiryDate;
    }
}
//Order Class
class Order {
    constructor(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount, paramTotalPrice, paramOrderStatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.Status = paramOrderStatus;
    }
}
//UserList
let UserArrayList = new Array();
UserArrayList.push(new User("rishi@gmail.com", "rishi", 9789011226));
UserArrayList.push(new User("ronaldo@gmail.com", "ronaldo", 9445153060));
//Medicine List
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 5, 21)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 4, 19)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 5, 5)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 8, 21)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2025, 2, 1)));
//Order List
let OrderList = new Array();
OrderList.push(new Order("MD12", "UI1001", "Colpal", 2, 120, OrderStatus.Ordered));
OrderList.push(new Order("MD14", "UI1001", "Iodex", 3, 240, OrderStatus.Ordered));
//CloseAll
function CloseAll() {
    let signIn = document.getElementById("signInPage");
    signIn.style.display = "none";
    let signUp = document.getElementById("signUpPage");
    signUp.style.display = "none";
    let homepage = document.getElementById("home");
    homepage.style.display = "none";
    let medicinepage = document.getElementById("medicinePage");
    medicinepage.style.display = "none";
}
//CloseTabs for signIn-home page
function CloseTabs() {
    let homepage = document.getElementById("home");
    homepage.style.display = "none";
    let medicinepage = document.getElementById("medicinePage");
    medicinepage.style.display = "none";
    let purchasepage = document.getElementById("purchasePage");
    purchasepage.style.display = "none";
    let orderPage = document.getElementById("orderPage");
    orderPage.style.display = "none";
    let rechargePage = document.getElementById("recharge");
    rechargePage.style.display = "none";
    let walletPage = document.getElementById("showWallet");
    walletPage.style.display = "none";
    let cancelPage = document.getElementById("cancelPage");
    cancelPage.style.display = "none";
}
//Sign In Page
function SignInPage() {
    CloseAll();
    let signIn = document.getElementById("signInPage");
    signIn.style.display = "block";
}
//Sign Up Page
function SignUpPage() {
    CloseAll();
    let signUp = document.getElementById("signUpPage");
    signUp.style.display = "block";
}
//Home Page
function DisplayHomePage() {
    CloseAll();
    CloseTabs();
    let homepage = document.getElementById("home");
    homepage.style.display = "block";
}
//Order Page
function OrderPage() {
    CloseTabs();
    let orderPage = document.getElementById("orderPage");
    orderPage.style.display = "block";
    OrderHistory();
}
//Recharge Page
function RechargePage() {
    CloseTabs();
    let rechargePage = document.getElementById("recharge");
    rechargePage.style.display = "block";
}
//Medicine Page
function MedicinePage() {
    CloseTabs();
    let medicinepage = document.getElementById("medicinePage");
    medicinepage.style.display = "block";
    medicineListCheck();
}
//PurchasePage
function PurchasePage() {
    CloseTabs();
    let purchasepage = document.getElementById("purchasePage");
    purchasepage.style.display = "block";
    PurchaseMedicine();
}
//CancelPage
function CancelPage() {
    CloseTabs();
    let cancelPage = document.getElementById("cancelPage");
    cancelPage.style.display = "block";
    CancelOrder();
}
//Wallet Page
function ShowWalletPage() {
    CloseTabs();
    let walletPage = document.getElementById("showWallet");
    walletPage.style.display = "block";
    ShowBalance();
}
//Functionalities
//Medicine List Functionality
function medicineListCheck() {
    let medicinepage = document.getElementById("medicinePage");
    medicinepage.style.display = "block";
    let medicines;
    medicines = "<table border='3'>";
    medicines += "<tr><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Medicine Price</th><th>Expiry Date</th><th colspan='2'>Action</th></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        medicines += `<tr><td>${MedicineList[i].MedicineId}</td><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td><td>${MedicineList[i].ExpiryDate.toLocaleDateString()}</td><td><button class="btn btn-info" onclick = "EditMedicine('${MedicineList[i].MedicineId}')">Edit</button></td><td><button class="btn btn-dark" onclick = "DeleteMedicine('${MedicineList[i].MedicineId}')">Delete</button></td></tr>`;
    }
    medicines += "</table>";
    let mList = document.getElementById("showMedicineList");
    mList.innerHTML = medicines;
}
//AddMedicine
function AddMedicine() {
    let mnameInput = document.getElementById("mname");
    let mQuantityInput = document.getElementById("mquantity");
    let mPrice = document.getElementById("mprice");
    let mExpiry = document.getElementById("mexpirydate");
    MedicineList.push(new MedicineInfo(mnameInput.value, parseInt(mQuantityInput.value), parseInt(mPrice.value), new Date(mExpiry.value)));
    medicineListCheck();
    mnameInput.value = "";
    mQuantityInput.value = "";
    mPrice.value = "";
    mExpiry.value = "";
}
//EditMedicine
function EditMedicine(mID) {
    let mnameInput = document.getElementById("mname");
    let mQuantityInput = document.getElementById("mquantity");
    let mPrice = document.getElementById("mprice");
    let mExpiry = document.getElementById("mexpirydate");
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == mID) {
            CurrentMedicine = MedicineList[i];
            mnameInput.value = MedicineList[i].MedicineName;
            mQuantityInput.value = String(MedicineList[i].MedicineCount);
            mPrice.value = String(MedicineList[i].MedicinePrice);
            mExpiry.valueAsDate = MedicineList[i].ExpiryDate;
        }
    }
}
//ChangeMedicine
function ChangeMedicine() {
    let mnameInput = document.getElementById("mname");
    let mQuantityInput = document.getElementById("mquantity");
    let mPrice = document.getElementById("mprice");
    let mExpiry = document.getElementById("mexpirydate");
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == CurrentMedicine.MedicineId) {
            MedicineList[i].MedicineCount = parseInt(mQuantityInput.value);
            MedicineList[i].MedicinePrice = parseInt(mPrice.value);
            break;
        }
    }
    medicineListCheck();
    mnameInput.value = "";
    mQuantityInput.value = "";
    mPrice.value = "";
    mExpiry.value = "";
}
//DeleteMedicine
function DeleteMedicine(mID) {
    MedicineList = MedicineList.filter((item) => (item.MedicineId) != mID);
    medicineListCheck();
}
//PurchaseMedicine
function PurchaseMedicine() {
    let purchasepage = document.getElementById("purchasePage");
    purchasepage.style.display = "block";
    let medicines;
    medicines = "<table border='3'>";
    medicines += "<tr><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Medicine Price</th><th>Expiry Date</th><th colspan='2'>Action</th></tr>";
    for (let i = 0; i < MedicineList.length; i++) {
        medicines += `<tr><td>${MedicineList[i].MedicineId}</td><td>${MedicineList[i].MedicineName}</td><td>${MedicineList[i].MedicineCount}</td><td>${MedicineList[i].MedicinePrice}</td><td>${MedicineList[i].ExpiryDate.toLocaleDateString()}</td><td><button class="btn btn-outline-info" onclick = "BuyMedicine('${MedicineList[i].MedicineId}')">Buy Medicine</button></td></tr>`;
    }
    medicines += "</table>";
    let mList = document.getElementById("purchasePage");
    mList.innerHTML = medicines;
}
//BuyMedicine
function BuyMedicine(mID) {
    // let showCountBox = document.getElementById("purchasetextbox") as HTMLDivElement
    // showCountBox.style.display = "block"
    let showbox = `<label>Enter Medicine Count</label><input type='number' id='purchaseCount'><br>`;
    let box = document.getElementById("textbox");
    box.innerHTML = showbox;
    let showButton = `<button class='btn btn-primary' onclick="AddToCart('${mID}')">Buy</button>`;
    let btn = document.getElementById("showbtn");
    btn.innerHTML = showButton;
    // let getCount = document.getElementById("purchaseCount") as HTMLInputElement
    // let pMsg = document.getElementById("purchaseMsg") as HTMLLabelElement
    // for(let i=0; i<MedicineList.length; i++)
    // {
    //     if(MedicineList[i].MedicineId == mID)
    //     {
    //         if(MedicineList[i].MedicineCount >= parseInt(getCount.value)){
    //             if(CurrentUser.Balance >= MedicineList[i].MedicinePrice*parseInt(getCount.value)){
    //                 MedicineList[i].MedicineCount -= parseInt(getCount.value)
    //                 CurrentUser.Balance -= MedicineList[i].MedicinePrice*parseInt(getCount.value)
    //                 OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUser.UserId, MedicineList[i].MedicineName,parseInt(getCount.value),MedicineList[i].MedicinePrice*parseInt(getCount.value),OrderStatus.Ordered))
    //                 pMsg.innerHTML = "Order Placed Successfully"
    //                 break
    //             }
    //         }
    //         else{
    //             pMsg.innerHTML = "Count not Available"
    //             break
    //         }
    //     }
    // }
    // AddToCart(mID)
}
function AddToCart(mID) {
    let getCount = document.getElementById("purchaseCount");
    let pMsg = document.getElementById("purchaseMsg");
    let temp = false;
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == mID) {
            if (MedicineList[i].MedicineCount >= parseInt(getCount.value)) {
                if (CurrentUser.Balance >= MedicineList[i].MedicinePrice * parseInt(getCount.value)) {
                    MedicineList[i].MedicineCount -= parseInt(getCount.value);
                    CurrentUser.Balance -= MedicineList[i].MedicinePrice * parseInt(getCount.value);
                    OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUser.UserId, MedicineList[i].MedicineName, parseInt(getCount.value), MedicineList[i].MedicinePrice * parseInt(getCount.value), OrderStatus.Ordered));
                    pMsg.innerHTML = "Order Placed Successfully";
                    PurchaseMedicine();
                    break;
                }
            }
            // else{
            //     pMsg.innerHTML = "Count not Available"
            //     break
            // }
        }
    }
}
//CancelOrder
function CancelOrder() {
    let cancelorders = `<table border="3">`;
    cancelorders += `<tr><th>Order ID</th><th>Medicine Name</th><th>Price</th><th>Order Status</th><th>Action</th></tr>`;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUser.UserId && OrderList[i].Status == OrderStatus.Ordered) {
            cancelorders += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].Status}</td><td><button class="btn btn-danger" onClick="CancelMedicine('${OrderList[i].OrderId}')">Cancel</td></tr>`;
        }
    }
    let cancel = document.getElementById("cancelPage");
    cancel.innerHTML = cancelorders;
}
//CancelMedicine
function CancelMedicine(cID) {
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == cID) {
            OrderList[i].Status = OrderStatus.Cancelled;
            CurrentUser.Balance += OrderList[i].TotalPrice;
            for (let j = 0; i < MedicineList.length; j++) {
                if (MedicineList[j].MedicineId == OrderList[i].MedicineId) {
                    MedicineList[j].MedicineCount += OrderList[i].MedicineCount;
                    let cancelmsg = document.getElementById("cancelmsg");
                    cancelmsg.innerHTML = "Order Cancelled Successfully";
                    break;
                }
            }
        }
    }
    CancelOrder();
}
//Order History
function OrderHistory() {
    let orders = "<table border='3'>";
    orders += "<tr><th>Order ID</th><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Total Price</th><th>Order Status</th></tr>";
    for (let i = 0; i < OrderList.length; i++) {
        if (CurrentUser.UserId == OrderList[i].UserId) {
            orders += `<tr><td>${OrderList[i].OrderId}</td><td>${OrderList[i].MedicineId}</td><td>${OrderList[i].MedicineName}</td><td>${OrderList[i].MedicineCount}</td><td>${OrderList[i].TotalPrice}</td><td>${OrderList[i].Status}</td></tr>`;
        }
    }
    let displayOrders = document.getElementById("orderPage");
    displayOrders.innerHTML = orders;
}
//Sign Up Functionality
function SignUp() {
    // if (NewUserNameStatus == true &&
    //     NewUserAgeStatus == true &&
    //     NewUserPhoneNumberStatus == true) {
    let newUserEmail = document.getElementById('newUserEmail').value;
    let newUserPassword = document.getElementById('newUserPassword').value;
    let newConfirmPassword = document.getElementById('newConfirmPassword').value;
    let newUserPhoneNumber = document.getElementById('newUserPhoneNumber').value;
    UserArrayList.push(new User(newUserEmail, newUserPassword, parseInt(newUserPhoneNumber)));
    let message = document.getElementById("registerMsg");
    message.innerHTML = "User Registration Successfull!! Please Sign In to continue";
    DisplayHomePage();
    // }
    // else
    // {
    //     alert("Please fill out the form fully.")
    // }
}
//Sign In Functionality
function SignIn() {
    let noExistingUserIdChecker = false;
    let existingMailId = document.getElementById('existingMailId').value;
    // let existingUserIdRegex = /^UI\d{4}$/;
    // if (existingUserIdRegex.test(existingMailId)) {
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserEmail == existingMailId) {
            CurrentUser = UserArrayList[i];
            CloseAll();
            let closeNav = document.getElementById("navigation");
            closeNav.style.display = "none";
            let signInHome = document.getElementById("signIn-home");
            signInHome.style.display = "block";
            DisplayHomePage();
            return;
        }
        else {
            noExistingUserIdChecker = true;
        }
    }
    if (noExistingUserIdChecker) {
        alert("Enter Valid Mail Id");
    }
}
//Recharge Wallet
function Recharge() {
    let amount = document.getElementById("topUp");
    if (amount.value.trim() != null) {
        CurrentUser.Balance += parseInt(amount.value);
        let displayMsg = document.getElementById("rechargeMsg");
        displayMsg.innerHTML = "Recharge Done Successfully";
    }
}
//Show Balance
function ShowBalance() {
    let balance = document.getElementById("balance");
    balance.innerHTML = String(CurrentUser.Balance);
}

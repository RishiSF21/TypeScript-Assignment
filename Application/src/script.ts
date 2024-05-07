let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUser: User;
// let CurrentUserName: string;
let CurrentMedicine: MedicineInfo;

let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;

// enum OrderStatus {Ordered = "Ordered", Cancelled = "Cancelled"}

//User Class
interface User {

    userID: any;
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string;
    balance: number

    // constructor(paramUserEmail: string, paramUserPassword: string, paramUserPhoneNumber: number) {

    //     UserIdAutoIncrement++;

    //     this.UserId = "UI" + UserIdAutoIncrement.toString();

    //     this.UserEmail = paramUserEmail;
    //     this.UserPassword = paramUserPassword;
    //     this.UserPhoneNumber = paramUserPhoneNumber;
    //     this.Balance = 1000;
    // }

}

//MedicineInfo Class
interface MedicineInfo {

    medicineID: any;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    expiryDate: string;

    // constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, paramExpiryDate: Date) {
    //     MedicineIdAutoIncrement++;

    //     this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
    //     this.MedicineName = paramMedicineName;
    //     this.MedicineCount = paramMedicineCount;
    //     this.MedicinePrice = paramMedicinePrice;
    //     this.ExpiryDate = paramExpiryDate;
    // }

}

//Order Class
interface Order {
    orderID: any;
    medicineID: any;
    userID: any;

    medicineName: string;
    medicineCount: number;
    totalPrice: number;
    status: string

    // constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, paramTotalPrice: number, paramOrderStatus: OrderStatus) {
    //     OrderIdAutoIncrement++;

    //     this.OrderId = "OI" + OrderIdAutoIncrement.toString();
    //     this.MedicineId = paramMedicineId;
    //     this.UserId = paramUserId;

    //     this.MedicineName = paramMedicineName;
    //     this.MedicineCount = paramMedicineCount;
    //     this.TotalPrice = paramTotalPrice;
    //     this.Status = paramOrderStatus
    // }
}

//UserList
// let UserArrayList: Array<User> = new Array<User>();

// UserArrayList.push(new User("rishi@gmail.com", "rishi", 9789011226));
// UserArrayList.push(new User("ronaldo@gmail.com", "ronaldo", 9445153060));

//Medicine List
// let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

// MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024,5,21)));
// MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024,4,19)));
// MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024,5,5)));
// MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024,8,21)));
// MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2025,2,1)));

//Order List
// let OrderList: Array<Order> = new Array<Order>();

// OrderList.push(new Order("MD12","UI1001","Colpal",2,120,OrderStatus.Ordered));
// OrderList.push(new Order("MD14","UI1001","Iodex",3,240,OrderStatus.Ordered));

//CloseAll
function CloseAll(){
    let signIn = document.getElementById("signInPage") as HTMLDivElement;
    signIn.style.display = "none";

    let signUp = document.getElementById("signUpPage") as HTMLDivElement;
    signUp.style.display = "none";

    let homepage = document.getElementById("home") as HTMLDivElement;
    homepage.style.display = "none";

    let medicinepage = document.getElementById("medicinePage") as HTMLDivElement;
    medicinepage.style.display = "none";
}

//CloseTabs for signIn-home page
function CloseTabs()
{
    let homepage = document.getElementById("home") as HTMLDivElement;
    homepage.style.display = "none";

    let medicinepage = document.getElementById("medicinePage") as HTMLDivElement;
    medicinepage.style.display = "none";

    let purchasepage = document.getElementById("purchasePage") as HTMLDivElement;
    purchasepage.style.display = "none";

    let orderPage = document.getElementById("orderPage") as HTMLDivElement
    orderPage.style.display = "none"

    let rechargePage = document.getElementById("recharge") as HTMLDivElement
    rechargePage.style.display = "none"

    let walletPage = document.getElementById("showWallet") as HTMLDivElement
    walletPage.style.display = "none"

    let cancelPage = document.getElementById("cancelPage") as HTMLDivElement;
    cancelPage.style.display = "none";

    let displayMsg = document.getElementById("rechargeMsg") as HTMLDivElement
    displayMsg.innerHTML = ""

    let countBox = document.getElementById("textbox") as HTMLDivElement
    countBox.style.display = "none"
}

//Sign In Page
function SignInPage(){
    CloseAll();
    let signIn = document.getElementById("signInPage") as HTMLDivElement;
    signIn.style.display = "block";
}

//Sign Up Page
function SignUpPage(){
    CloseAll();
    let signUp = document.getElementById("signUpPage") as HTMLDivElement;
    signUp.style.display = "block";
}

//Home Page
function DisplayHomePage(){
    CloseAll();
    CloseTabs()
    let homepage = document.getElementById("home") as HTMLDivElement;
    homepage.style.display = "block";
}

//Order Page
function OrderPage(){
    CloseTabs()

    let orderPage = document.getElementById("orderPage") as HTMLDivElement
    orderPage.style.display = "block"
    OrderHistory()
}

//Recharge Page
function RechargePage(){
    CloseTabs()

    let rechargePage = document.getElementById("recharge") as HTMLDivElement
    rechargePage.style.display = "block"
}

//Medicine Page
function MedicinePage(){
    CloseTabs()
    
    let medicinepage = document.getElementById("medicinePage") as HTMLDivElement;
    medicinepage.style.display = "block";

    medicineListCheck()
}

//PurchasePage
function PurchasePage(){
    CloseTabs()
    
    let purchasepage = document.getElementById("purchasePage") as HTMLDivElement;
    purchasepage.style.display = "block";

    PurchaseMedicine()
}

//CancelPage
function CancelPage(){
    CloseTabs()
    let cancelPage = document.getElementById("cancelPage") as HTMLDivElement;
    cancelPage.style.display = "block";
    CancelOrder()
}

//Wallet Page
function ShowWalletPage(){
    CloseTabs()

    let walletPage = document.getElementById("showWallet") as HTMLDivElement
    walletPage.style.display = "block"
    ShowBalance()
}

                                //Functionalities
//Medicine List Functionality
async function medicineListCheck() {
    let medicinepage = document.getElementById("medicinePage") as HTMLDivElement;
    medicinepage.style.display = "block";
    let medicines: any;
    medicines = "<table border='3'>"
    medicines += "<tr><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Medicine Price</th><th>Expiry Date</th><th colspan='2'>Action</th></tr>"

    let medicineList = await fetchMedicineDetails()
    medicineList.forEach((meds) => {
        medicines += `<tr><td>${meds.medicineID}</td><td>${meds.medicineName}</td><td>${meds.medicineCount}</td><td>${meds.medicinePrice}</td><td>${meds.expiryDate}</td><td><button class="btn btn-info" onclick = "EditMedicine('${meds.medicineID}')">Edit</button></td><td><button class="btn btn-dark" onclick = "DeleteMedicine(${meds.medicineID})">Delete</button></td></tr>`
    })
    
    medicines += "</table>";
    let mList = document.getElementById("showMedicineList") as HTMLDivElement;
    mList.innerHTML = medicines;
  
}

//AddMedicine
function AddMedicine(){
    let mnameInput = document.getElementById("mname") as HTMLInputElement;
    let mQuantityInput = document.getElementById("mquantity") as HTMLInputElement;
    let mPrice = document.getElementById("mprice") as HTMLInputElement;
    let mExpiry  = document.getElementById("mexpirydate") as HTMLInputElement;

    let newMedicine: MedicineInfo = {
        medicineID: 206,
        medicineName: mnameInput.value,
        medicineCount: parseInt(mQuantityInput.value),
        medicinePrice: parseInt(mPrice.value),
        expiryDate: mExpiry.value
    }
    addNewMedicine(newMedicine)
    // MedicineList.push(new MedicineInfo(mnameInput.value, parseInt(mQuantityInput.value), parseInt(mPrice.value), new Date(mExpiry.value)))
    medicineListCheck()

    mnameInput.value = ""
    mQuantityInput.value = ""
    mPrice.value = ""
    mExpiry.value = ""
}

//EditMedicine
async function EditMedicine(mID: any){
    let mnameInput = document.getElementById("mname") as HTMLInputElement;
    let mQuantityInput = document.getElementById("mquantity") as HTMLInputElement;
    let mPrice = document.getElementById("mprice") as HTMLInputElement;
    let mExpiry  = document.getElementById("mexpirydate") as HTMLInputElement;

    let medList = await fetchMedicineDetails()
    medList.forEach((meds) => {
        if(meds.medicineID == mID){
            CurrentMedicine = meds
            mnameInput.value = meds.medicineName
            mQuantityInput.value = String(meds.medicineCount)
            mPrice.value = String(meds.medicinePrice)
            mExpiry.value = meds.expiryDate
        }
    })

    // for(let i=0; i<MedicineList.length; i++){
    //     if(MedicineList[i].MedicineId == mID){
    //         CurrentMedicine = MedicineList[i]
            // mnameInput.value = MedicineList[i].MedicineName
            // mQuantityInput.value = String(MedicineList[i].MedicineCount)
            // mPrice.value = String(MedicineList[i].MedicinePrice)
            // mExpiry.valueAsDate = MedicineList[i].ExpiryDate
    //     }
    // }
    
}

//ChangeMedicine
async function ChangeMedicine(){
    let mnameInput = document.getElementById("mname") as HTMLInputElement;
    let mQuantityInput = document.getElementById("mquantity") as HTMLInputElement;
    let mPrice = document.getElementById("mprice") as HTMLInputElement;
    let mExpiry  = document.getElementById("mexpirydate") as HTMLInputElement;
    
    let MedicineList: MedicineInfo = {
        medicineID: CurrentMedicine.medicineID,
        medicineName: mnameInput.value,
        medicineCount: parseInt(mQuantityInput.value),
        medicinePrice: parseInt(mPrice.value),
        expiryDate: mExpiry.value
    }
    
    updateMedicine(CurrentMedicine.medicineID,MedicineList)
    
    mnameInput.value = ""
    mQuantityInput.value = ""
    mPrice.value = ""
    mExpiry.value = ""
}

//DeleteMedicine
async function DeleteMedicine(mID: number){
    deleteMedicine(mID)
    // let medList = await fetchMedicineDetails()
    // medList = medList.filter((meds) => (meds.medicineName!= mName))
    // MedicineList = MedicineList.filter((item) => (item.MedicineId) != mID)
    medicineListCheck() 
}

//PurchaseMedicine
async function PurchaseMedicine()
{
    let purchasepage = document.getElementById("purchasePage") as HTMLDivElement;
    purchasepage.style.display = "block";
    let medicines;
    medicines = "<table border='3'>"
    medicines += "<tr><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Medicine Price</th><th>Expiry Date</th><th colspan='2'>Action</th></tr>"

    let MedicineList = await fetchMedicineDetails()
    for (let i = 0; i < MedicineList.length; i++) {
        medicines += `<tr><td>${MedicineList[i].medicineID}</td><td>${MedicineList[i].medicineName}</td><td>${MedicineList[i].medicineCount}</td><td>${MedicineList[i].medicinePrice}</td><td>${MedicineList[i].expiryDate}</td><td><button class="btn btn-outline-info" onclick = "BuyMedicine('${MedicineList[i].medicineID}')">Buy Medicine</button></td></tr>`
    }
    medicines += "</table>";
    let mList = document.getElementById("purchasePage") as HTMLDivElement;
    mList.innerHTML = medicines;
}

//BuyMedicine
function BuyMedicine(mID: any)
{
    // let showCountBox = document.getElementById("purchasetextbox") as HTMLDivElement
    // showCountBox.style.display = "block"
    let countBox = document.getElementById("textbox") as HTMLDivElement
    countBox.style.display = "block"

    let showbox = `<label>Enter Medicine Count</label><input type='number' id='purchaseCount'><br>`
    let box = document.getElementById("textbox") as HTMLDivElement
    box.innerHTML = showbox

    let showButton = `<button class='btn btn-primary' onclick="AddToCart('${mID}')">Buy</button>`
    let btn = document.getElementById("showbtn") as HTMLDivElement
    btn.innerHTML = showButton
}

async function AddToCart(mID: any){
    
    let getCount = document.getElementById("purchaseCount") as HTMLInputElement
    let pMsg = document.getElementById("purchaseMsg") as HTMLDivElement
    let temp:boolean = false;
    let MedicineList = await fetchMedicineDetails()

    for(let i=0; i<MedicineList.length; i++)
    {
        if(MedicineList[i].medicineID == mID)
        {
            let meds = MedicineList[i]
            if(MedicineList[i].medicineCount >= parseInt(getCount.value)){
                if(CurrentUser.balance >= MedicineList[i].medicinePrice*parseInt(getCount.value)){
                    // MedicineList[i].medicineCount -= parseInt(getCount.value)

                    // CurrentUser.balance -= MedicineList[i].medicinePrice*parseInt(getCount.value)
                    let ordersList: Order = {
                        orderID: 303,
                        medicineID: MedicineList[i].medicineID,
                        userID: CurrentUser.userID,
                        medicineName: MedicineList[i].medicineName,
                        medicineCount: parseInt(getCount.value),
                        totalPrice: MedicineList[i].medicinePrice*parseInt(getCount.value),
                        status: "Ordered"
                    }
                    addNewOrder(ordersList)
                    
                    meds.medicineCount -= parseInt(getCount.value)
                    updateMedicine(meds.medicineID,meds)
                    CurrentUser.balance -= (meds.medicinePrice*parseInt(getCount.value))
                    updateBalance(CurrentUser.userID,CurrentUser)

                    MedicineList[i].medicineCount -= parseInt(getCount.value)
                    CurrentUser.balance -= MedicineList[i].medicinePrice*parseInt(getCount.value)
                    // OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUser.UserId, MedicineList[i].MedicineName,parseInt(getCount.value),MedicineList[i].MedicinePrice*parseInt(getCount.value),OrderStatus.Ordered))
                    pMsg.innerHTML = "Order Placed Successfully"
                    PurchaseMedicine();
                    break
                }
            }
        }
    }
    pMsg.innerHTML = ""
}

//CancelOrder
async function CancelOrder(){
    let cancelorders = `<table border="3">`
    cancelorders += `<tr><th>Order ID</th><th>Medicine Name</th><th>Price</th><th>Order Status</th><th>Action</th></tr>`
    let OrderList1 = await fetchOrders()
    for(let i=0; i<OrderList1.length; i++){
        if(OrderList1[i].userID==CurrentUser.userID && OrderList1[i].status == "Ordered"){
            cancelorders += `<tr><td>${OrderList1[i].orderID}</td><td>${OrderList1[i].medicineName}</td><td>${OrderList1[i].totalPrice}</td><td>${OrderList1[i].status}</td><td><button class="btn btn-danger" onClick="CancelMedicine('${OrderList1[i].orderID}')">Cancel</td></tr>`
        }
    }

    let cancel = document.getElementById("cancelPage") as HTMLDivElement
    cancel.innerHTML = cancelorders
}

//CancelMedicine
async function CancelMedicine(cID: any){
    let OrderList = await fetchOrders()
    for(let i=0; i<OrderList.length; i++){
        if(OrderList[i].orderID == cID)
        {
            let orderObject: Order = OrderList[i]
            orderObject.status = "Cancelled"
            updateOrder(orderObject.orderID,orderObject)
            // OrderList[i].status = OrderStatus.Cancelled
            CurrentUser.balance += OrderList[i].totalPrice
            updateBalance(CurrentUser.userID,CurrentUser)

            let MedicineList = await fetchMedicineDetails()
            for(let j=0; i<MedicineList.length; j++){
                if(MedicineList[j].medicineID == OrderList[i].medicineID){
                    MedicineList[j].medicineCount += OrderList[i].medicineCount
                    let cancelmsg = document.getElementById("cancelmsg") as HTMLDivElement
                    cancelmsg.innerHTML = "Order Cancelled Successfully"
                    break
                }
            }
        }
    }
    CancelOrder()
    let cancelmsg = document.getElementById("cancelmsg") as HTMLDivElement
    cancelmsg.innerHTML = ""

}
//Order History
async function OrderHistory()
{
    let orders = "<table border='3'>" 
    orders += "<tr><th>Order ID</th><th>Medicine ID</th><th>Medicine Name</th><th>Medicine Count</th><th>Total Price</th><th>Order Status</th></tr>"
    let orderData = await fetchOrders();
    orderData.forEach((ordersList) => {
        if(CurrentUser.userID == ordersList.userID)
        {
            orders += `<tr><td>${ordersList.orderID}</td><td>${ordersList.medicineID}</td><td>${ordersList.medicineName}</td><td>${ordersList.medicineCount}</td><td>${ordersList.totalPrice}</td><td>${ordersList.status}</td></tr>`
        }
    })
    
    let displayOrders = document.getElementById("orderPage") as HTMLDivElement
    displayOrders.innerHTML = orders
}

//Sign Up Functionality
function SignUp() {

    // if (NewUserNameStatus == true &&
    //     NewUserAgeStatus == true &&
    //     NewUserPhoneNumberStatus == true) {
    let newUserEmail = (document.getElementById('newUserEmail') as HTMLInputElement).value;
    let newUserPassword = (document.getElementById('newUserPassword') as HTMLInputElement).value;
    let newConfirmPassword = (document.getElementById('newConfirmPassword') as HTMLInputElement).value;
    let newUserPhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement).value;

    let newUser: User = {
        userID: 3,
        userEmail: newUserEmail,
        userPassword: newUserPassword,
        userPhoneNumber: newUserPhoneNumber,   
        balance: 200
    }

    addUsers(newUser)

    // UserArrayList.push(new User(newUserEmail, newUserPassword, parseInt(newUserPhoneNumber)));

    let message = document.getElementById("registerMsg") as HTMLLabelElement
    message.innerHTML = "User Registration Successfull!! Please Sign In to continue"

    DisplayHomePage();
    // }
    // else
    // {
    //     alert("Please fill out the form fully.")
    // }

}

//Sign In Functionality
async function SignIn() {

    let noExistingUserIdChecker: boolean = false;
    let existingMailId = (document.getElementById('existingMailId') as HTMLInputElement).value;

    // let existingUserIdRegex = /^UI\d{4}$/;

    // if (existingUserIdRegex.test(existingMailId)) {
    let UserList = await fetchUsers();

    UserList.forEach((user) => {
        if(user.userEmail == existingMailId){
            noExistingUserIdChecker = true;
            CurrentUser = user
            CloseAll()
            let closeNav = document.getElementById("navigation") as HTMLDivElement;
            closeNav.style.display = "none"

            let signInHome = document.getElementById("signIn-home") as HTMLDivElement;
            signInHome.style.display = "block"
            DisplayHomePage()
            // return;
        }
        // else {
        //     noExistingUserIdChecker = true;
        // }
    })
    if (!noExistingUserIdChecker) {
        alert("Enter Valid Mail Id");
    }
}

//Recharge Wallet
function Recharge(){
    let amount = document.getElementById("topUp") as HTMLInputElement
    if(amount.value.trim() != null){
        CurrentUser.balance += parseInt(amount.value)
        let displayMsg = document.getElementById("rechargeMsg") as HTMLDivElement
        displayMsg.innerHTML = "Recharge Done Successfully"
    }
}

//Show Balance
function ShowBalance(){
    let balance = document.getElementById("balance") as HTMLDivElement
    balance.innerHTML = String(CurrentUser.balance)
} 

//API Calls
//Fetch functions
async function fetchUsers(): Promise<User[]> {
    const apiUrl = 'http://localhost:5234/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
}

//Medicines
async function fetchMedicineDetails(): Promise<MedicineInfo[]>
{
    const apiUrl = 'http://localhost:5234/api/MedicineInfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch medicine');
    }
    return await response.json();
}

//Orders
async function fetchOrders(): Promise<Order[]>{
    const apiUrl = 'http://localhost:5234/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
}

//Add functions
//Adding Users
async function addUsers(user: User): Promise<void> {
    const response = await fetch('http://localhost:5234/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    // renderContacts();
  }

  //Adding Medicines
  async  function addNewMedicine(med: MedicineInfo): Promise<void>{
    const response = await fetch('http://localhost:5234/api/MedicineInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(med)
    });
    if (!response.ok) {
        throw new Error('Failed to add medicine');
      }
  }

  //Adding new Order
  async  function addNewOrder(orders: Order): Promise<void>{
    const response = await fetch('http://localhost:5234/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orders)
    });
    if (!response.ok) {
        throw new Error('Failed to add medicine');
      }
  }

  //Editing Medicine
  async function updateMedicine(id: any, medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5234/api/MedicineInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicine)
    });
    if (!response.ok) {
      throw new Error('Failed to update medicine');
    }
    // renderContacts();
  }

  //Editing User Balance
  async function updateBalance(id: any, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5234/api/User/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to update medicine');
    }
    // renderContacts();
  }

  //Update Order
  async function updateOrder(id: any, order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5234/api/Order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update medicine');
    }
    // renderContacts();
  }

  //Delete Medicine
  async function deleteMedicine(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5234/api/MedicineInfo/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  }
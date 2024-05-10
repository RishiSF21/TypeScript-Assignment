//Customer Details
interface CustomerDetails{
    customerID: any
    name: string
    gender: string
    mobile: string
    mailID: string
    password: string
    image: any
    balance: number
}

//Product Details
interface Product{
    productID: any
    productName: string
    quantityAvailable: number
    unitPrice: number
    expiryDate: Date
    images: any
}

//Purchase Details
interface PurchaseDetails{
    purchaseID: any
    customerID: any
    totalPrice: number
    purchaseDate: Date
    status: string
}

interface CartItems{
    cartID: any
    purchaseID: any
    productID: any
    productName: string
    price: number
}

let CurrentLoggedUser: CustomerDetails

//HidePages
function HideMain()
{
    let home = document.getElementById("navhome") as HTMLDivElement
    home.style.display = "none"
}
function HideForms()
{
    let signIn = document.getElementById("signIn") as HTMLDivElement
    signIn.style.display = "none"

    let signUp = document.getElementById("signUp") as HTMLDivElement
    signUp.style.display = "none"
}
function HideAllTabs()
{
    let displayUser = document.getElementById("navbar-home") as HTMLDivElement
    displayUser.style.display = "none"

    let displayProd = document.getElementById("productList") as HTMLDivElement
    displayProd.style.display = "none"

    let addPage = document.getElementById("add") as HTMLDivElement
    addPage.style.display = "none"

    let showProd = document.getElementById("productsPage") as HTMLDivElement
    showProd.style.display = "none"

    let displayTable = document.getElementById("purchaseHistory") as HTMLDivElement
    displayTable.style.display = "none"

    let addButton = document.getElementById("addButton") as HTMLDivElement
    addButton.style.display = "none"

    let recharge = document.getElementById("recharge") as HTMLDivElement
    recharge.style.display = "none"
}

//Pages
function DisplaySignIn()
{
    HideForms()
    let signIn = document.getElementById("signIn") as HTMLDivElement
    signIn.style.display = "block"
}

function DisplaySignUp()
{
    HideForms()
    let signUp = document.getElementById("signUp") as HTMLDivElement
    signUp.style.display = "block"
}

                                        //Functionalities
async function SignIn()
{
    let getMail = document.getElementById("mail") as HTMLInputElement
    let getPass = document.getElementById("password") as HTMLInputElement

    let customer = await fetchCustomers()
    customer.forEach((data) => {
        if(data.mailID == getMail.value)
        {
            getMail.value = ""
            getPass.value = ""
            CurrentLoggedUser = data
            HideMain()
            LoggedHome()
        }
    })
}

//SignUp
async function SignUp()
{
    let getName = document.getElementById("name") as HTMLInputElement
    let getMail = document.getElementById("signUpMail") as HTMLInputElement
    let getPass = document.getElementById("signUpPassword") as HTMLInputElement
    let getGender = document.getElementById("signUpGender") as HTMLInputElement
    let getNumber = document.getElementById("mobile") as HTMLInputElement
    let getPicture = document.getElementById("profilePic") as HTMLInputElement
    let getBalance = document.getElementById("wallet") as HTMLInputElement

    if(!getPicture.files || getPicture.files.length == 0){
        return 
    }
    let File = getPicture.files[0];
    let data = await ConvertToByteArr(File);

    let newCustomer: CustomerDetails = {
        customerID: undefined,
        name: getName.value,
        mailID: getMail.value,
        password: getPass.value,
        gender: getGender.value,
        mobile: getNumber.value,
        image: data,
        balance: parseInt(getBalance.value)
    }

    addCustomers(newCustomer)
    alert("Registration Successfull !")
        getName.value = ""
        getMail.value = ""
        getPass.value = ""
        getGender.value = ""
        getNumber.value = ""
        data = ""
        getBalance.value = ""
}

function ConvertToByteArr(file: File): Promise<string>{
return new Promise((resolve,reject) =>{
    let reader = new FileReader();
    reader.onload=()=>{
        let buffer = reader.result as string;
        let data = buffer.split(",")[1];
        resolve(data);
    }
    reader.onerror=()=>{
        reject(new Error('Failed to read data'));
    };
    reader.readAsDataURL(file)
});
}

function LoggedHome()
{
    HideMain()
    let showNav = document.getElementById("navbar") as HTMLDivElement
    showNav.style.display = "block"
    ShowUser()
}

//ShowUser
async function ShowUser() {
    HideAllTabs()
    let displayUser = document.getElementById("navbar-home") as HTMLDivElement
    displayUser.style.display = "block"

    let userProfile = await fetchCustomers()
    userProfile.forEach((data) => {
        if(data.customerID == CurrentLoggedUser.customerID)
        {
            displayUser.innerHTML += `<div class="profile-pic"><img src="${'data:image/jpg;base64,'+data.image}"><br><strong>Customer Name : ${data.name}</strong><br><strong>Mobile No : ${data.mobile}</strong><br></div>`
        }
    })
}

//ShowProducts
async function ShowProducts()
{
    HideAllTabs()
    let displayProd = document.getElementById("productList") as HTMLDivElement
    displayProd.style.display = "block"
    let addButton = document.getElementById("addButton") as HTMLDivElement
    addButton.style.display = "block"
    let createTable = `<table border='3' id="showtable">`
    createTable += `<tr><th>Product Image</th><th>Product ID</th><th>Product Name</th><th>Available Quantity</th><th>Unit Price</th><th>Expiry Date</th><th>Action</th></tr>`
    let prodList = await fetchProductDetails()
    prodList.forEach((data) => {
        createTable += `<tr><td><img src="${'data:image/jpg;base64,'+data.images}"></td><td>${data.productID}</td><td>${data.productName}</td><td>${data.quantityAvailable}</td><td>${data.unitPrice}</td><td>${data.expiryDate.toString().substring(0,10)}</td><td><button onclick="EditProduct(${data.productID})">Edit</button><button onclick="DeleteProduct(${data.productID})">Delete</button></td></tr>`
    })
    displayProd.innerHTML = createTable
}

async function AddProduct()
{
    let addPage = document.getElementById("add") as HTMLDivElement
    addPage.style.display = "block"

    let pname = document.getElementById("pname") as HTMLInputElement
    let pqty = document.getElementById("pqty") as HTMLInputElement
    let pprice = document.getElementById("pprice") as HTMLInputElement
    let pexpiry = document.getElementById("pdate") as HTMLInputElement
    let ppic = document.getElementById("ppic") as HTMLInputElement

    if(!ppic.files || ppic.files.length == 0){
        return 
    }
    let File = ppic.files[0];
    let data = await ConvertToByteArr(File);

    let newProd: Product = {
        productID: undefined,
        productName: pname.value,
        quantityAvailable: parseInt(pqty.value),
        unitPrice: parseInt(pprice.value),
        expiryDate: new Date(pexpiry.value),
        images: data
    }

    addProducts(newProd)
    alert("Product Added Successfully")
    ShowProducts()
}

//EditProduct
async function EditProduct(pID: any)
{
    let addPage = document.getElementById("add") as HTMLDivElement
    addPage.style.display = "block"

    let pid = document.getElementById("pid") as HTMLInputElement
    let pname = document.getElementById("pname") as HTMLInputElement
    let pqty = document.getElementById("pqty") as HTMLInputElement
    let pprice = document.getElementById("pprice") as HTMLInputElement
    let pexpiry = document.getElementById("pdate") as HTMLInputElement
    let ppic = document.getElementById("ppic") as HTMLInputElement

    let prods = await fetchProductDetails()
    prods.forEach((data) => {
        if(data.productID == pID)
        {
            pid.value = data.productID
            pname.value = data.productName
            pqty.value = data.quantityAvailable.toString()
            pprice.value = data.unitPrice.toString()
            pexpiry.value = data.expiryDate.toString().substring(0,10)
            // ppic.files = data.images
        }
    })
}

//ProductUpdate
async function ProductUpdate()
{
    let pid = document.getElementById("pid") as HTMLInputElement
    let pname = document.getElementById("pname") as HTMLInputElement
    let pqty = document.getElementById("pqty") as HTMLInputElement
    let pprice = document.getElementById("pprice") as HTMLInputElement
    let pexpiry = document.getElementById("pdate") as HTMLInputElement
    let ppic = document.getElementById("ppic") as HTMLInputElement

    if(!ppic.files || ppic.files.length == 0){
        return 
    }
    let File = ppic.files[0];
    let data = await ConvertToByteArr(File);

    let prods = await fetchProductDetails()
    prods.forEach((data) => {
        if(data.productID == parseInt(pid.value))
        {
            let changeProduct: Product = {
                productID: undefined,
                productName: pname.value,
                quantityAvailable: parseInt(pqty.value),
                unitPrice: parseInt(pprice.value),
                expiryDate: new Date(pexpiry.value),
                images: data
            }
            updateProduct(pid.value,changeProduct)
            alert("Product Updated")
        }
    })
}

//DeleteProduct
async function DeleteProduct(pID: any)
{
    deleteProduct(pID)
    alert("Product Deleted Successfully !")
    ShowProducts()
}

let carttable = `<table border='3'>`
carttable += "<tr><th>Product ID</th><th>Product Name</th><th>Price</th></tr>"
//ProductDetails
async function ProductDetails()
{
    HideAllTabs()

    let showProd = document.getElementById("productsPage") as HTMLDivElement
    showProd.style.display = "block"

    let products = await fetchProductDetails()
    let p2: any = ''
    let p1 = document.getElementById("container1") as HTMLDivElement

    for(let i=0; i<products.length; i++)
    {
        p2 += `<div class='images' style="border: 1px solid black"><img src="${'data:image/jpg;base64,'+products[i].images}"><br><strong>Product ID : ${products[i].productID}</strong><br><strong> Product Name : ${products[i].productName}</strong><br><strong>Stock : ${products[i].quantityAvailable}</strong><br><strong>Unit Price : ${products[i].unitPrice}</strong><br><strong>Expiry Date : ${products[i].expiryDate.toString().substring(0,10)}</strong><br><button onclick="BuyItems(${products[i].productID})">Buy</button><br></div>`
    }
    p1.innerHTML = p2
}

//BuyItems
let cartList: Array<Product> = new Array<Product>()
let CurrentProduct: Product
async function BuyItems(pID: any)
{
    let cartItems = document.getElementById("carts") as HTMLDivElement
    // let carttable = `<table border='3'>`
    // carttable += "<tr><th>Product ID</th><th>Product Name</th><th>Price</th></tr>"
    let prodList = await fetchProductDetails()
    let isStocked: boolean = true
    prodList.forEach((data) => {
        if(data.productID == pID)
        {
            CurrentProduct = data
            if(data.quantityAvailable > 0)
            {
                isStocked = false
                // data.quantityAvailable--
                // updateProduct(CurrentProduct.productID,CurrentProduct)
                cartList.push(data)
                carttable += `<tr><td>${data.productID}</td><td>${data.productName}</td><td>${data.unitPrice}</td></tr>`
            }
        }

    })
    if(isStocked)
    {
        alert("Product Out of Stock")
    }
    cartItems.innerHTML = carttable
    alert("Item Added to cart")

}

//PlaceOrder

async function PlaceOrder()
{
    let prods = await fetchProductDetails()
    let grandTotal: number = 0
    cartList.forEach((data) => {
        grandTotal += data.unitPrice
        for(let i=0; i<prods.length; i++)
        {
            if(prods[i].productID == data.productID)
            {
                prods[i].quantityAvailable--
                updateProduct(prods[i].productID,prods[i])
                break
            }
        }
    })

    let order: PurchaseDetails = {
        purchaseID: 0,
        customerID: CurrentLoggedUser.customerID,
        totalPrice: grandTotal,
        purchaseDate: new Date(),
        status: "Ordered"
    }
    addPurchase(order)

    let orderFetch = await fetchPurchaseDetails()
    cartList.forEach((data) => {
        let newCart: CartItems = {
            cartID: 0,
            purchaseID: orderFetch[orderFetch.length-1].purchaseID,
            productID: data.productID,
            productName: data.productName,
            price: data.unitPrice
        }
        addCart(newCart)
    })
    alert("Order Placed Successfully")
    
    cartList = []
}

//PurchaseDetails
async function PurchaseDetails1(){
    HideAllTabs()
    let displayPage = document.getElementById("purchaseHistory") as HTMLDivElement
    displayPage.style.display = "block"
    let histories = await fetchPurchaseDetails()
    let carts = await fetchCartItems()

    let showTable: any = ''
    histories.forEach((data) => {
        if(data.customerID == CurrentLoggedUser.customerID)
        {
            showTable += `<table border='3' id="download">`
            showTable += "<tr><th>Purchase ID</th><th>Total Price</th><th>Purchase Date</th><th>Status</th><th colspan='2'>Action</th></tr>"

            showTable += `<tr><td>${data.purchaseID}</td><td>${data.totalPrice}</td><td>${data.purchaseDate.toString().substring(0,10)}</td><td>${data.status}</td><td><button style="background-color:orange;" onclick="tableToCSV()">Export</button></td></tr>`
            showTable += "<tr><th>Cart ID</th><th>Purchase ID</th><th>Product ID</th><th>Product Name</th><th colspan='2'>Unit Price</th></tr>"
            carts.forEach((cartData) => {
                if(cartData.purchaseID == data.purchaseID)
                {
                    showTable += `<tr><td>${cartData.cartID}</td><td>${cartData.purchaseID}</td><td>${cartData.productID}</td><td>${cartData.productName}</td><td>${cartData.price}</td></tr>`
                }
            })
            showTable += `</table>`
        }
    })

    displayPage.innerHTML = showTable
}


function RechargePage()
{
    HideAllTabs()
    let recharge = document.getElementById("recharge") as HTMLDivElement
    recharge.style.display = "block"
}
function RechargeWallet(){

    let amt = document.getElementById("amount") as HTMLInputElement
    CurrentLoggedUser.balance += parseInt(amt.value)
    updateBalance(CurrentLoggedUser.customerID,CurrentLoggedUser)
    alert("Recharge Successfully Done !")
    amt.value = ""
}

//Export to CSV
function tableToCSV() {

    let csv_data: any = [];

    // Get each row data
    let rows = document.querySelectorAll('#download tr');
    for (let i = 0; i < rows.length; i++) {

        let cols = rows[i].querySelectorAll('td,th');

        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }

    csv_data = csv_data.join('\n');
  
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data: any) {

    let CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    let temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "OrderHistory.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
}

                                        //API Functions
//fetch
async function fetchCustomers(): Promise<CustomerDetails[]>{
    const apiUrl = 'http://localhost:5191/api/CustomerDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    return await response.json();
}

async function fetchPurchaseDetails(): Promise<PurchaseDetails[]>{
    const apiUrl = 'http://localhost:5191/api/PurchaseDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    return await response.json();
}

async function fetchProductDetails(): Promise<Product[]>{
    const apiUrl = 'http://localhost:5191/api/Product';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
}

async function fetchCartItems(): Promise<CartItems[]>{
    const apiUrl = 'http://localhost:5191/api/CartItems';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
}

//add
async function addCustomers(customers: CustomerDetails): Promise<void> {
    const response = await fetch('http://localhost:5191/api/CustomerDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customers)
    });
    if (!response.ok) {
      throw new Error('Failed to add customer');
    }
  }
  
  async function addPurchase(hist: PurchaseDetails): Promise<void> {
    const response = await fetch('http://localhost:5191/api/PurchaseDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hist)
    });
    if (!response.ok) {
      throw new Error('Failed to add customer');
    }
  }

  async function addCart(hist: CartItems): Promise<void> {
    const response = await fetch('http://localhost:5191/api/CartItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hist)
    });
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
  }

  async function addProducts(hist: Product): Promise<void> {
    const response = await fetch('http://localhost:5191/api/Product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hist)
    });
    if (!response.ok) {
      throw new Error('Failed to add customer');
    }
  }

  //Update
  async function updateProduct(id: any, prod: Product): Promise<void> {
    const response = await fetch(`http://localhost:5191/api/Product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prod)
    });
    if (!response.ok) {
      throw new Error('Failed to update prod');
    }
    // renderContacts();
  }

  async function updateBalance(id: any, cust: CustomerDetails): Promise<void> {
    const response = await fetch(`http://localhost:5191/api/CustomerDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cust)
    });
    if (!response.ok) {
      throw new Error('Failed to update balance');
    }
    // renderContacts();
  }

  //Delete Medicine
  async function deleteProduct(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5191/api/Product/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
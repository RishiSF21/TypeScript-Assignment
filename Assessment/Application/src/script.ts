//Customer Details
interface CustomerDetails{
    customerID: any
    name: string
    gender: string
    mobile: string
    mailID: string
    password: string
    image: any
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

    let customer = await fetchCustomers()
    customer.forEach((data) => {
        if(data.mailID == getMail.value)
        {
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
        image: data
    }

    addCustomers(newCustomer)
    alert("Registration Successfull !")
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
}

//ShowProducts
async function ShowProducts()
{
    HideAllTabs()
    let displayProd = document.getElementById("productList") as HTMLDivElement
    displayProd.style.display = "block"
    let addButton = document.getElementById("addButton") as HTMLDivElement
    addButton.style.display = "block"
    let createTable = `<table border='3'>`
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
            pexpiry.value = data.expiryDate.toLocaleDateString()
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
        if(data.productID == pid.value)
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
                data.quantityAvailable--
                updateProduct(CurrentProduct.productID,CurrentProduct)
                cartList.push(data)
                carttable += `<tr><td>${data.productID}</td><td>${data.productName}</td><td>${data.unitPrice}</td></tr>`
            }
        }

    })
    if(isStocked)
    {
        alert("Product Out of Stock")
    }
    cartItems.innerHTML += carttable
    alert("Item Added to cart")

}

//PlaceOrder
function PlaceOrder()
{
    let grandTotal: number = 0
    cartList.forEach((data) => {
        grandTotal += data.unitPrice
    })

    let order: PurchaseDetails = {
        purchaseID: undefined,
        customerID: CurrentLoggedUser.customerID,
        totalPrice: grandTotal,
        purchaseDate: new Date(),
        status: "Ordered"
    }
    addPurchase(order)
    alert("Order Placed Successfully")
    cartList = []
}

//PurchaseDetails
async function PurchaseDetails1(){
    HideAllTabs()
    let displayPage = document.getElementById("purchaseHistory") as HTMLDivElement
    displayPage.style.display = "block"
    let histories = await fetchPurchaseDetails()

    let showTable = "<table border='3'>"
    showTable += "<tr><th>Purchase ID</th><th>Total Price</th><th>Purchase Date</th><th>Status</th><th>Action</th></tr>"

    histories.forEach((data) => {
        if(data.customerID == CurrentLoggedUser.customerID)
        {
            showTable += `<tr><td>${data.purchaseID}</td><td>${data.totalPrice}</td><td>${data.purchaseDate.toString().substring(0,10)}</td><td>${data.status}</td><td><button style="background-color:orange;">Export</button></td></tr>`
        }
    })

    displayPage.innerHTML = showTable
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

  //Delete Medicine
  async function deleteProduct(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5191/api/Product/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
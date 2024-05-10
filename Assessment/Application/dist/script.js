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
let CurrentLoggedUser;
//HidePages
function HideMain() {
    let home = document.getElementById("navhome");
    home.style.display = "none";
}
function HideForms() {
    let signIn = document.getElementById("signIn");
    signIn.style.display = "none";
    let signUp = document.getElementById("signUp");
    signUp.style.display = "none";
}
function HideAllTabs() {
    let displayUser = document.getElementById("navbar-home");
    displayUser.style.display = "none";
    let displayProd = document.getElementById("productList");
    displayProd.style.display = "none";
    let addPage = document.getElementById("add");
    addPage.style.display = "none";
    let showProd = document.getElementById("productsPage");
    showProd.style.display = "none";
    let displayTable = document.getElementById("purchaseHistory");
    displayTable.style.display = "none";
    let addButton = document.getElementById("addButton");
    addButton.style.display = "none";
    let recharge = document.getElementById("recharge");
    recharge.style.display = "none";
}
//Pages
function DisplaySignIn() {
    HideForms();
    let signIn = document.getElementById("signIn");
    signIn.style.display = "block";
}
function DisplaySignUp() {
    HideForms();
    let signUp = document.getElementById("signUp");
    signUp.style.display = "block";
}
//Functionalities
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let getMail = document.getElementById("mail");
        let getPass = document.getElementById("password");
        let customer = yield fetchCustomers();
        customer.forEach((data) => {
            if (data.mailID == getMail.value) {
                getMail.value = "";
                getPass.value = "";
                CurrentLoggedUser = data;
                HideMain();
                LoggedHome();
            }
        });
    });
}
//SignUp
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let getName = document.getElementById("name");
        let getMail = document.getElementById("signUpMail");
        let getPass = document.getElementById("signUpPassword");
        let getGender = document.getElementById("signUpGender");
        let getNumber = document.getElementById("mobile");
        let getPicture = document.getElementById("profilePic");
        let getBalance = document.getElementById("wallet");
        if (!getPicture.files || getPicture.files.length == 0) {
            return;
        }
        let File = getPicture.files[0];
        let data = yield ConvertToByteArr(File);
        let newCustomer = {
            customerID: undefined,
            name: getName.value,
            mailID: getMail.value,
            password: getPass.value,
            gender: getGender.value,
            mobile: getNumber.value,
            image: data,
            balance: parseInt(getBalance.value)
        };
        addCustomers(newCustomer);
        alert("Registration Successfull !");
        getName.value = "";
        getMail.value = "";
        getPass.value = "";
        getGender.value = "";
        getNumber.value = "";
        data = "";
        getBalance.value = "";
    });
}
function ConvertToByteArr(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            let buffer = reader.result;
            let data = buffer.split(",")[1];
            resolve(data);
        };
        reader.onerror = () => {
            reject(new Error('Failed to read data'));
        };
        reader.readAsDataURL(file);
    });
}
function LoggedHome() {
    HideMain();
    let showNav = document.getElementById("navbar");
    showNav.style.display = "block";
    ShowUser();
}
//ShowUser
function ShowUser() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let displayUser = document.getElementById("navbar-home");
        displayUser.style.display = "block";
        let userProfile = yield fetchCustomers();
        userProfile.forEach((data) => {
            if (data.customerID == CurrentLoggedUser.customerID) {
                displayUser.innerHTML += `<div class="profile-pic"><img src="${'data:image/jpg;base64,' + data.image}"><br><strong>Customer Name : ${data.name}</strong><br><strong>Mobile No : ${data.mobile}</strong><br></div>`;
            }
        });
    });
}
//ShowProducts
function ShowProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let displayProd = document.getElementById("productList");
        displayProd.style.display = "block";
        let addButton = document.getElementById("addButton");
        addButton.style.display = "block";
        let createTable = `<table border='3' id="showtable">`;
        createTable += `<tr><th>Product Image</th><th>Product ID</th><th>Product Name</th><th>Available Quantity</th><th>Unit Price</th><th>Expiry Date</th><th>Action</th></tr>`;
        let prodList = yield fetchProductDetails();
        prodList.forEach((data) => {
            createTable += `<tr><td><img src="${'data:image/jpg;base64,' + data.images}"></td><td>${data.productID}</td><td>${data.productName}</td><td>${data.quantityAvailable}</td><td>${data.unitPrice}</td><td>${data.expiryDate.toString().substring(0, 10)}</td><td><button onclick="EditProduct(${data.productID})">Edit</button><button onclick="DeleteProduct(${data.productID})">Delete</button></td></tr>`;
        });
        displayProd.innerHTML = createTable;
    });
}
function AddProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        let addPage = document.getElementById("add");
        addPage.style.display = "block";
        let pname = document.getElementById("pname");
        let pqty = document.getElementById("pqty");
        let pprice = document.getElementById("pprice");
        let pexpiry = document.getElementById("pdate");
        let ppic = document.getElementById("ppic");
        if (!ppic.files || ppic.files.length == 0) {
            return;
        }
        let File = ppic.files[0];
        let data = yield ConvertToByteArr(File);
        let newProd = {
            productID: undefined,
            productName: pname.value,
            quantityAvailable: parseInt(pqty.value),
            unitPrice: parseInt(pprice.value),
            expiryDate: new Date(pexpiry.value),
            images: data
        };
        addProducts(newProd);
        alert("Product Added Successfully");
        ShowProducts();
    });
}
//EditProduct
function EditProduct(pID) {
    return __awaiter(this, void 0, void 0, function* () {
        let addPage = document.getElementById("add");
        addPage.style.display = "block";
        let pid = document.getElementById("pid");
        let pname = document.getElementById("pname");
        let pqty = document.getElementById("pqty");
        let pprice = document.getElementById("pprice");
        let pexpiry = document.getElementById("pdate");
        let ppic = document.getElementById("ppic");
        let prods = yield fetchProductDetails();
        prods.forEach((data) => {
            if (data.productID == pID) {
                pid.value = data.productID;
                pname.value = data.productName;
                pqty.value = data.quantityAvailable.toString();
                pprice.value = data.unitPrice.toString();
                pexpiry.value = data.expiryDate.toString().substring(0, 10);
                // ppic.files = data.images
            }
        });
    });
}
//ProductUpdate
function ProductUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        let pid = document.getElementById("pid");
        let pname = document.getElementById("pname");
        let pqty = document.getElementById("pqty");
        let pprice = document.getElementById("pprice");
        let pexpiry = document.getElementById("pdate");
        let ppic = document.getElementById("ppic");
        if (!ppic.files || ppic.files.length == 0) {
            return;
        }
        let File = ppic.files[0];
        let data = yield ConvertToByteArr(File);
        let prods = yield fetchProductDetails();
        prods.forEach((data) => {
            if (data.productID == parseInt(pid.value)) {
                let changeProduct = {
                    productID: undefined,
                    productName: pname.value,
                    quantityAvailable: parseInt(pqty.value),
                    unitPrice: parseInt(pprice.value),
                    expiryDate: new Date(pexpiry.value),
                    images: data
                };
                updateProduct(pid.value, changeProduct);
                alert("Product Updated");
            }
        });
    });
}
//DeleteProduct
function DeleteProduct(pID) {
    return __awaiter(this, void 0, void 0, function* () {
        deleteProduct(pID);
        alert("Product Deleted Successfully !");
        ShowProducts();
    });
}
let carttable = `<table border='3'>`;
carttable += "<tr><th>Product ID</th><th>Product Name</th><th>Price</th></tr>";
//ProductDetails
function ProductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let showProd = document.getElementById("productsPage");
        showProd.style.display = "block";
        let products = yield fetchProductDetails();
        let p2 = '';
        let p1 = document.getElementById("container1");
        for (let i = 0; i < products.length; i++) {
            p2 += `<div class='images' style="border: 1px solid black"><img src="${'data:image/jpg;base64,' + products[i].images}"><br><strong>Product ID : ${products[i].productID}</strong><br><strong> Product Name : ${products[i].productName}</strong><br><strong>Stock : ${products[i].quantityAvailable}</strong><br><strong>Unit Price : ${products[i].unitPrice}</strong><br><strong>Expiry Date : ${products[i].expiryDate.toString().substring(0, 10)}</strong><br><button onclick="BuyItems(${products[i].productID})">Buy</button><br></div>`;
        }
        p1.innerHTML = p2;
    });
}
//BuyItems
let cartList = new Array();
let CurrentProduct;
function BuyItems(pID) {
    return __awaiter(this, void 0, void 0, function* () {
        let cartItems = document.getElementById("carts");
        // let carttable = `<table border='3'>`
        // carttable += "<tr><th>Product ID</th><th>Product Name</th><th>Price</th></tr>"
        let prodList = yield fetchProductDetails();
        let isStocked = true;
        prodList.forEach((data) => {
            if (data.productID == pID) {
                CurrentProduct = data;
                if (data.quantityAvailable > 0) {
                    isStocked = false;
                    // data.quantityAvailable--
                    // updateProduct(CurrentProduct.productID,CurrentProduct)
                    cartList.push(data);
                    carttable += `<tr><td>${data.productID}</td><td>${data.productName}</td><td>${data.unitPrice}</td></tr>`;
                }
            }
        });
        if (isStocked) {
            alert("Product Out of Stock");
        }
        cartItems.innerHTML = carttable;
        alert("Item Added to cart");
    });
}
//PlaceOrder
function PlaceOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        let prods = yield fetchProductDetails();
        let grandTotal = 0;
        cartList.forEach((data) => {
            grandTotal += data.unitPrice;
            for (let i = 0; i < prods.length; i++) {
                if (prods[i].productID == data.productID) {
                    prods[i].quantityAvailable--;
                    updateProduct(prods[i].productID, prods[i]);
                    break;
                }
            }
        });
        let order = {
            purchaseID: 0,
            customerID: CurrentLoggedUser.customerID,
            totalPrice: grandTotal,
            purchaseDate: new Date(),
            status: "Ordered"
        };
        addPurchase(order);
        let orderFetch = yield fetchPurchaseDetails();
        cartList.forEach((data) => {
            let newCart = {
                cartID: 0,
                purchaseID: orderFetch[orderFetch.length - 1].purchaseID,
                productID: data.productID,
                productName: data.productName,
                price: data.unitPrice
            };
            addCart(newCart);
        });
        alert("Order Placed Successfully");
        cartList = [];
    });
}
//PurchaseDetails
function PurchaseDetails1() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let displayPage = document.getElementById("purchaseHistory");
        displayPage.style.display = "block";
        let histories = yield fetchPurchaseDetails();
        let carts = yield fetchCartItems();
        let showTable = '';
        histories.forEach((data) => {
            if (data.customerID == CurrentLoggedUser.customerID) {
                showTable += `<table border='3' id="download">`;
                showTable += "<tr><th>Purchase ID</th><th>Total Price</th><th>Purchase Date</th><th>Status</th><th colspan='2'>Action</th></tr>";
                showTable += `<tr><td>${data.purchaseID}</td><td>${data.totalPrice}</td><td>${data.purchaseDate.toString().substring(0, 10)}</td><td>${data.status}</td><td><button style="background-color:orange;" onclick="tableToCSV()">Export</button></td></tr>`;
                showTable += "<tr><th>Cart ID</th><th>Purchase ID</th><th>Product ID</th><th>Product Name</th><th colspan='2'>Unit Price</th></tr>";
                carts.forEach((cartData) => {
                    if (cartData.purchaseID == data.purchaseID) {
                        showTable += `<tr><td>${cartData.cartID}</td><td>${cartData.purchaseID}</td><td>${cartData.productID}</td><td>${cartData.productName}</td><td>${cartData.price}</td></tr>`;
                    }
                });
                showTable += `</table>`;
            }
        });
        displayPage.innerHTML = showTable;
    });
}
function RechargePage() {
    HideAllTabs();
    let recharge = document.getElementById("recharge");
    recharge.style.display = "block";
}
function RechargeWallet() {
    let amt = document.getElementById("amount");
    CurrentLoggedUser.balance += parseInt(amt.value);
    updateBalance(CurrentLoggedUser.customerID, CurrentLoggedUser);
    alert("Recharge Successfully Done !");
    amt.value = "";
}
//Export to CSV
function tableToCSV() {
    let csv_data = [];
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
function downloadCSVFile(csv_data) {
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
function fetchCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/CustomerDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        return yield response.json();
    });
}
function fetchPurchaseDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/PurchaseDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        return yield response.json();
    });
}
function fetchProductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/Product';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return yield response.json();
    });
}
function fetchCartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/CartItems';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return yield response.json();
    });
}
//add
function addCustomers(customers) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5191/api/CustomerDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
    });
}
function addPurchase(hist) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5191/api/PurchaseDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hist)
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
    });
}
function addCart(hist) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5191/api/CartItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hist)
        });
        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }
    });
}
function addProducts(hist) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5191/api/Product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hist)
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
    });
}
//Update
function updateProduct(id, prod) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/Product/${id}`, {
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
    });
}
function updateBalance(id, cust) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/CustomerDetails/${id}`, {
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
    });
}
//Delete Medicine
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/Product/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    });
}

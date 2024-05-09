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
        let customer = yield fetchCustomers();
        customer.forEach((data) => {
            if (data.mailID == getMail.value) {
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
            image: data
        };
        addCustomers(newCustomer);
        alert("Registration Successfull !");
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
}
//ShowProducts
function ShowProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let displayProd = document.getElementById("productList");
        displayProd.style.display = "block";
        let addButton = document.getElementById("addButton");
        addButton.style.display = "block";
        let createTable = `<table border='3'>`;
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
                pexpiry.value = data.expiryDate.toLocaleDateString();
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
            if (data.productID == pid.value) {
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
                    data.quantityAvailable--;
                    updateProduct(CurrentProduct.productID, CurrentProduct);
                    cartList.push(data);
                    carttable += `<tr><td>${data.productID}</td><td>${data.productName}</td><td>${data.unitPrice}</td></tr>`;
                }
            }
        });
        if (isStocked) {
            alert("Product Out of Stock");
        }
        cartItems.innerHTML += carttable;
        alert("Item Added to cart");
    });
}
//PlaceOrder
function PlaceOrder() {
    let grandTotal = 0;
    cartList.forEach((data) => {
        grandTotal += data.unitPrice;
    });
    let order = {
        purchaseID: undefined,
        customerID: CurrentLoggedUser.customerID,
        totalPrice: grandTotal,
        purchaseDate: new Date(),
        status: "Ordered"
    };
    addPurchase(order);
    alert("Order Placed Successfully");
    cartList = [];
}
//PurchaseDetails
function PurchaseDetails1() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAllTabs();
        let displayPage = document.getElementById("purchaseHistory");
        displayPage.style.display = "block";
        let histories = yield fetchPurchaseDetails();
        let showTable = "<table border='3'>";
        showTable += "<tr><th>Purchase ID</th><th>Total Price</th><th>Purchase Date</th><th>Status</th><th>Action</th></tr>";
        histories.forEach((data) => {
            if (data.customerID == CurrentLoggedUser.customerID) {
                showTable += `<tr><td>${data.purchaseID}</td><td>${data.totalPrice}</td><td>${data.purchaseDate.toString().substring(0, 10)}</td><td>${data.status}</td><td><button style="background-color:orange;">Export</button></td></tr>`;
            }
        });
        displayPage.innerHTML = showTable;
    });
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

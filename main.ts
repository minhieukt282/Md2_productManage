import {Product} from "./product";
import {Manage} from "./manage";
import {Account, ListAccount} from "./account";

let today = new Date();
let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
let time = today.getHours() + ':' + today.getMinutes();
let dateTime = time + ' - ' + date;
let input = require('readline-sync')
let manager = new Manage()

let pro1 = new Product(1, "car", 30, 2500)
let pro2 = new Product(2, "Ship", 20, 3200)
let pro3 = new Product(3, "train", 24, 8000)
let pro4 = new Product(4, "bike", 10, 400)
let pro5 = new Product(5, "air plane", 5, 20000)

manager.addProduct(pro5)
manager.addProduct(pro3)
manager.addProduct(pro2)
manager.addProduct(pro4)
manager.addProduct(pro1)

function init() {
    let choice
    let info = `-----MARKET LOGIN-----
    1. Login
    2. Register`
    do {
        console.log(info)
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                login()
                break
            case 2:
                register()
                break
        }
    } while (choice != 0)
}

function login() {
    console.log("-----LOGIN-----")
    let name = input.question("UserName: ")
    let passWord = input.question("PassWord: ")
    if (ListAccount.checkAccount(name, passWord)) {
        if (name == "admin") manageProduct()
        else market()
    } else console.log("Incorrect account or password")
}

function register() {
    console.log("-----REGISTER-----")
    let name = input.question("UserName: ")
    let passWord = input.question("PassWord: ")
    let newAccount = new Account(name, passWord)
    ListAccount.addAccount(newAccount)
    console.log("Sign up success")
    console.log(ListAccount.listAccount)
}

function manageProduct() {
    let choice: number
    let menu = `_______WELCOME ADMIN_______
    1. Show storage
    2. Add product
    3. Edit product
    4. Delete product
    5. Find by ID | Name | Quantity
    0. Log out`

    do {
        console.log(menu)
        choice = +input.question("Input choice: ")
        switch (choice) {
            case 1:
                showStorage()
                break
            case 2:
                addProduct()
                break
            case 3:
                editProduct()
                break
            case 4:
                delProduct()
                break
            case 5:
                findProduct()
                break
            case 0:
                init()
                break
        }
    } while (choice != 0)
}

function showStorage() {
    console.log("-----MARKET STORAGE-----")
    console.log("Total Product: " + manager.totalProduct)
    console.log(manager.showProduct())
}

function addProduct() {
    console.log("-----Adding Product-----")
    let id: number = +input.question("Input ID: ")
    let name: string = input.question("Name Product: ")
    let quantity: number = +input.question("Quantity: ")
    let price: number = +input.question("Price: ")
    let product = new Product(id, name, quantity, price)
    manager.addProduct(product)
}

function editProduct() {
    console.log("-----Edit Product-----")
    let id = +input.question("Find Id: ")
    let name = input.question("Name edit: ")
    let quantity = +input.question("Quantity edit: ")
    manager.editProduct(id, name, quantity)
}

function delProduct() {
    console.log("-----Delete Product-----")
    let id = +input.question("Enter the ID to delete: ")
    manager.delProduct(id)
}

function findProduct() {
    let info = `-----Find Product-----
    1. Find by Id
    2. Find by Name
    3. Find by quantity
    0. Back to menu`
    let choice: number
    do {
        console.log(info)
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                findById()
                break
            case 2:
                findByName()
                break
            case 3:
                findByQuantity()
                break
            case 0:
                manageProduct()
                break
        }
    } while (choice != 0)
}

function findById() {
    console.log("-----Find by Id-----")
    let id = +input.question("Enter the id you need to find: ")
    console.log(manager.showById(id))

}

function findByName() {
    console.log("-----Find by name-----")
    let name = input.question("Enter the name you need to find: ")
    console.log(manager.showByName(name))


}

function findByQuantity() {
    console.log("-----Find by Id-----")
    let quantity = +input.question("Enter the quantity you need to find: ")
    console.log(manager.showByQuantity(quantity))


}

// init()
market()

// userAddProduct()
function market() {
    let choice: number
    let menu = `<><><><>WELCOME TO MARKET<><><><>
    1. Show your storage
    2. Add product
    3. Edit product
    4. Delete product
    0. Log out`
    console.log(menu)
    showStorage()
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                showYourStorage()
                break
            case 2:
                userAddProduct()
                break
            case 3:
                userEditProduct()
                break
            case 4:
                userDelProduct()
                break
            case 0:
                login()
                break
        }
    } while (choice != -1)
}

function showYourStorage() {
    let choice
    let info = `-----YOUR STORAGE-----
    1. Buy All 
    2. Add product
    3. Edit product
    0. Back to menu
    Total Product:  ${manager.totalProductPurchase}`
    console.log(info)
    console.log(manager.showUserStore())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                isPay()
                break
            case 2:
                userAddProduct()
                break
            case 3:
                userEditProduct()
                break
            case 0:
                market()
                break
        }
    } while (choice != -1)
}

function isPay() {
    let total = 0
    manager.listProduct.forEach(value => {
        total += value.price * value.quantity
    })
    let info = `-----PAYING-----
    Time: ${dateTime}
    Total product: ${manager.totalProductPurchase}
    Price: ${total}
    >>>>>Thank you<<<<<`
    console.log(info)
}

function userAddProduct() {
    let choice
    let info = `-----ADD PRODUCT-----
    1. Continue
    2. Del Product
    0. Back to menu`
    console.log(info)
    let id = +input.question("Select ID: ")
    let quantity = +input.question("Select quantity: ")
    manager.connectToStorage(id, quantity)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userAddProduct()
                break
            case 2:
                userDelProduct()
                break
            case 0:
                market()
                break
        }
    } while (choice != -1)
}

function userEditProduct() {
    let choice: number
    let info = `-----Edit Product-----
    1. Edit product
    2. Delete
    0. Back to menu`
    console.log(info)
    let id = +input.question("Select Id: ")
    let quantity = +input.question("Edit quantity: ")
    manager.userEditProduct(id, quantity)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userEditProduct()
                break
            case 2:
                userDelProduct()
                break
            case 0:
                market()
                break
        }
    } while (choice != -1)
}

function userDelProduct() {
    let choice: number
    let info = `-----Delete Product-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let id = +input.question("Id delete: ")
    manager.userDelProduct(id)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userDelProduct()
                break
            case 0:
                market()
                break
        }
    } while (choice != -1)
}


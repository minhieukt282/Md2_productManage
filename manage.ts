import {Product} from "./product";


interface CRUD {
    addProduct(value: Product): void

    delProduct(id: number): any

    editProduct(id: number, name?: string, quantity?: number): any

    showProduct(): Product[]

    showUserStore(): Product[]
}

export class Manage implements CRUD {
    listStorage: Product[] = []
    listProduct: Product[] = []
    countProduct: number = 0
    numberProductPurchase: number = 0

    bubbleSort(): Product[] {
        for (let i = 0; i < this.listStorage.length; i++) {
            for (let j = 0; j < this.listStorage.length; j++) {
                if (this.listStorage[i].id < this.listStorage[j].id) {
                    let temp = this.listStorage[i].id
                    this.listStorage[i].id = this.listStorage[j].id
                    this.listStorage[j].id = temp
                }
            }
        }
        return this.listStorage
    }

    //Manger can see and edit Product
    showProduct(): Product[] {
        this.bubbleSort()
        return this.listStorage
    }

    //User can see and edit
    showUserStore(): Product[] {
        return this.listProduct
    }

    get totalProduct() {
        return this.countProduct
    }

    get totalProductPurchase() {
        return this.numberProductPurchase
    }

    findByID(id: number): number {
        let flag = -1
        this.listStorage.forEach((value, index) => {
            if (id == value.id) flag = index
        })
        return flag
    }

    findByIDProduct(id: number): number {
        let flag = -1
        this.listProduct.forEach((value, index) => {
            if (id == value.id) flag = index
        })
        return flag
    }

    addProduct(value: Product): void {
        this.listStorage.push(value)
        this.countProduct++
    }

    delProduct(id: number): any {
        let findIndex = this.findByID(id)
        this.listStorage.splice(findIndex, 1)
        this.countProduct--
        return this.listStorage
    }

    editProduct(id: number, name?: string, quantity?: number, price?: number): any {
        let findIndex = this.findByID(id)
        if (findIndex != -1) {
            if (name) this.listStorage[findIndex].name = name
            if (quantity) this.listStorage[findIndex].quantity = quantity
            if (price) this.listStorage[findIndex].price = price
        } else console.log("Id not found")
    }

    showById(id: number): Product | string {
        let findIndex = this.findByID(id)
        if (findIndex != -1) return this.listStorage[findIndex]
        else return ">>>Can not find Id<<<"
    }

    showByName(name: string): Product[] | string {
        let listName: Product[] = []
        this.listStorage.forEach((value) => {
            if (value.name == name) listName.push(value)
        })
        if (listName.length != 0) return listName
        else return ">>>Can not find name<<< "
    }

    showByQuantity(quantity: number): Product[] | string {
        let listQuantity: Product[] = []
        this.listStorage.forEach((value) => {
            if (value.quantity == quantity) listQuantity.push(value)
        })
        if (listQuantity.length != 0) return listQuantity
        else return ">>>Can not find quantity<<<"
    }

    userAddProduct(value: Product, index: number): any {
        if (value.quantity <= this.listStorage[index].quantity) {
            this.listProduct.push(value)
            this.numberProductPurchase++
            console.log("Add done")
            this.listStorage[index].quantity -= value.quantity
        } else console.log("Not enough product in storage")
    }

    connectToStorage(id: number, quantity: number): void {
        let index: number = this.findByID(id)
        let product = new Product(id, this.listStorage[index].name, quantity, this.listStorage[index].price)
        this.userAddProduct(product, index)
    }

    userEditProduct(id: number, quantity: number): void {
        let index: number = this.findByIDProduct(id)
        let indexStorage: number = this.findByID(id)
        this.listStorage[indexStorage].quantity += this.listProduct[index].quantity - quantity
        this.listProduct[index].quantity = quantity
        console.log("Edit done")
    }

    userDelProduct(id: number): void {
        let index: number = this.findByIDProduct(id)
        if (index != -1) {
            this.listProduct.splice(index, 1)
            this.numberProductPurchase--
            console.log("Id has been delete!")
        } else console.log("!>>>Found id<<<!")

    }

}

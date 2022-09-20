export class Customer {
    private _nameCustomer: string
    private _id: number
    private _name: string
    private _quantity: number

    constructor(nameCustomer: string, id: number, name: string, quantity: number) {
        this._nameCustomer = nameCustomer;
        this._id = id;
        this._name = name;
        this._quantity = quantity;
    }

    get nameCustomer(): string {
        return this._nameCustomer;
    }

    set nameCustomer(value: string) {
        this._nameCustomer = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }
}
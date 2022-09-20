export class Account {
    private _name: string
    private _passWord: string

    constructor(name: string, passWord: string) {
        this._name = name
        this._passWord = passWord
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get passWord(): string {
        return this._passWord;
    }

    set passWord(value: string) {
        this._passWord = value;
    }
}

export class ListAccount {
     static listAccount: Account[] = []

    static addAccount(account: Account): void {
        ListAccount.listAccount.push(account)
    }

     static checkAccount(name: string, passWord: string): boolean {
        let flag: boolean = false
        ListAccount.listAccount.forEach((element, index) => {
            if (name === element.name && passWord === element.passWord) flag = true
        })
        return flag
    }
}


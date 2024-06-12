export class User {
    id : number = 0;
    username : string ="";
    password : string = "";
    role : string = "";
    email : string = "";
    address : string = "";
    telephone : string = "";
    isEnable : number = 0;
    constructor(
        id: number = 0,
        username: string = "",
        password: string = "",
        role: string = "",
        email: string = "",
        address: string = "",
        telephone: string = "",
        isEnable: number = 0
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.isEnable = isEnable;
    }
}

export class User {
    constructor(id, username, firstName, lastName, email, phone, image) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.image = image;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

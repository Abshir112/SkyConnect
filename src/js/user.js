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

    showModal() {
        document.getElementById('modal-username').textContent = this.username;
        document.getElementById('modal-fullname').textContent = `Full Name: ${this.fullName}`;
        document.getElementById('modal-email').textContent = `Email: ${this.email}`;
        document.getElementById('modal-phone').textContent = `Phone: ${this.phone}`;
        document.getElementById('userModal').style.display = 'block';
    }
}

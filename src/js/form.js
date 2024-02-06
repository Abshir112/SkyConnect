document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    clearErrorMessages();

    // Perform validations
    if (validateName() && validateEmail() && validateAgreement()) {
        // Show the thank-you message
        document.getElementById('thankYouMessage').style.display = 'block';

        // Reset the form fields
        this.reset();
    }
});

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('thankYouMessage').style.display = 'none';
});


function validateName() {
    const name = document.getElementById('name').value;
    if (/\d/.test(name) || name === '') {
        displayErrorMessage('nameError', "Name must not contain numbers and not be empty.");
        return false;
    }
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        displayErrorMessage('emailError', "Please enter a valid email address.");
        return false;
    }
    return true;
}

function validateAgreement() {
    const agree = document.getElementById('agree').checked;
    if (!agree) {
        displayErrorMessage('agreeError', "You must agree to the terms and conditions to proceed.");
        return false;
    }
    return true;
}

function displayErrorMessage(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(element => {
        element.innerText = '';
    });
}

export function setupModalCloseBehavior() {
    const modal = document.getElementById('userModal');
    const closeModal = document.getElementsByClassName('close')[0];

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

export function updateUserDetails(postElement, user) {
    const usernameElement = postElement.querySelector('.username');
    usernameElement.textContent = user.username;
    const profileIconElement = postElement.querySelector('.profile_icon');
    profileIconElement.src = user.image;

    // Attach event listener for opening the modal with the user's details
    usernameElement.addEventListener('click', () => {
        showModal(user);
    });
}

function showModal(user) {
    // Assuming 'user' is an instance of the User class or has the same properties
    document.getElementById('modal-username').textContent = user.username;
    document.getElementById('modal-fullname').textContent = `Full Name: ${user.fullName}`; // Using getter from User class
    document.getElementById('modal-email').textContent = `Email: ${user.email}`;
    document.getElementById('modal-phone').textContent = `Phone: ${user.phone}`;
    document.getElementById('modal-id').textContent = `User ID: ${user.id}`;
    document.getElementById('userModal').style.display = 'block';
}

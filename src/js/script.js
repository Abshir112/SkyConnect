class User {
    constructor(id, username, firstName, lastName, email, phone) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Function to create and show the modal with the user's details
    showModal() {
        document.getElementById('modal-username').textContent = this.username;
        document.getElementById('modal-fullname').textContent = `Full Name: ${this.fullName}`;
        document.getElementById('modal-email').textContent = `Email: ${this.email}`;
        document.getElementById('modal-phone').textContent = `Phone: ${this.phone}`;
        
        // Display the modal
        document.getElementById('userModal').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch all posts
    fetch('https://dummyjson.com/posts')
        .then(res => {
            if (!res.ok) {
                throw new Error('Posts fetch error: ${res.status} ${res.statusText}');
            }
            return res.json();
        })
        .then(data => {
            // Determine the container to append posts to
            let postsContainer = document.querySelector('.posts-container'); // Default to the post page container
            let limitPosts = false;

            // If on the homepage, adjust the target container and limit posts
            const homePageContainer = document.querySelector('.home-page-posts');
            if (homePageContainer) {
                postsContainer = homePageContainer;
                limitPosts = true;
            }

            // Display only three posts on the homepage, else display all
            const postsToDisplay = limitPosts ? data.posts.slice(0, 3) : data.posts;
            postsToDisplay.forEach((post) => {
                displayPostAndComments(post, postsContainer);
            });
        });

    // Close modal functionality
    setupModalCloseBehavior();
});

function setupModalCloseBehavior() {
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

function displayPostAndComments(post, postsContainer) {
    // Create the post element
    const postElement = document.createElement('article');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="post-header">
            <img class="profile_icon" src="../assets/img/profile_icon.svg" alt="User Avatar">
            <h2 class="username" data-userid="${post.userId}">Loading username...</h2>
        </div>
        <p class="post-body">${post.body}</p>
        <div class="post-footer">
            <span class="post-id">Post ID: ${post.id}</span>
        </div>
        <section class="comments">
            <!-- Comments will be dynamically inserted here -->
        </section>
    `;

    // Append the post element to the provided container
    postsContainer.appendChild(postElement);

    // Fetch and create a User object for the post's author
    fetch(`https://dummyjson.com/users/${post.userId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('User data fetch error: ${res.status} ${res.statusText}');
            }
            return res.json();

        })
           
        .then(userData => {
            const user = new User(userData.id, userData.username, userData.firstName, userData.lastName, userData.email, userData.phone);
            const usernameElement = postElement.querySelector('.username');
            usernameElement.textContent = user.username;

            // Add click event listener for the username to open the modal
            usernameElement.addEventListener('click', function() {
                user.showModal();
            });
        }).catch(error => {
            console.error(error);
            const usernameElement = postElement.querySelector('.username');
            usernameElement.textContent = 'User data not available';
        });

    // Fetch and display comments for the post
    fetch(`https://dummyjson.com/comments/post/${post.id}`)
        .then(res => 
            {
                if (!res.ok) {
                    throw new Error('Comments fetch error: ${res.status} ${res.statusText}');
                }
                return res.json();
            })
        .then(data => {
            const commentsSection = postElement.querySelector('.comments');
            commentsSection.innerHTML = ''; // Clear any existing comments

            data.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.textContent = `${comment.user.username}: ${comment.body}`; // Display the username and comment body
                commentsSection.appendChild(commentDiv);
            });
        }).catch(error => {
            console.error(error);
            const commentsSection = postElement.querySelector('.comments');
            commentsSection.innerHTML = '<p class="error-comments">Comments could not be loaded.</p>'; // Error message for comments
        });
}

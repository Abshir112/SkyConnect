class User {
    constructor(id, username, firstName, lastName, email, phone, image) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.image = image
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
                throw new Error('Posts could not be fetched.');
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
        }).catch(error => {
            console.error(error);
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
            <img class="profile_icon" src="" alt="User icon">
            <h2 class="username" data-userid="${post.userId}">Loading username...</h2>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body}</p>
        <div class="post-footer">
            <span class="show-comments">Comments</span>
            <span class="reaction-container">
                <img src="./src/assets/img/5288427_favorite_hand_heart_like_likes_icon.svg" alt="likes tag" width="40" height="40">
                <span class="count">${post.reactions}</span>
            </span> 
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
                throw new Error('User data not available.');
            }
            return res.json();

        })
           
        .then(userData => {
            const user = new User(userData.id, userData.username, userData.firstName, userData.lastName, userData.email, userData.phone, userData.image);
            const usernameElement = postElement.querySelector('.username');
            const profileIconElement = postElement.querySelector('.profile_icon'); // Get the profile icon image element

            usernameElement.textContent = user.username;
            profileIconElement.src = user.image; // Set the image URL for the profile icon

            // Add click event listener for the username to open the modal
            usernameElement.addEventListener('click', function() {
                user.showModal();
            });
        }).catch(error => {
            console.error(error);
        });

    // Fetch and display comments for the post
    fetch(`https://dummyjson.com/comments/post/${post.id}`)
        .then(res => 
            {
                if (!res.ok) {
                    throw new Error('Comments could not be loaded.');
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
        });
}

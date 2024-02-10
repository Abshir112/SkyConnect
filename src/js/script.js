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
            
            const postsToDisplay = data.posts;
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
            <span class="show-tags">Tags</span> <!-- Trigger for showing tags -->
            <div class="tags-container hidden"></div> <!-- Container for the tags, initially hidden -->
            <span class="reaction-container">
                <img src="../src/assets/img/5288427_favorite_hand_heart_like_likes_icon.svg" alt="likes tag" width="25" height="30">
                <span class="count">${post.reactions}</span>
            </span> 
            <span class="post-id">Post ID: ${post.id}</span>
        </div>
        <section class="comments">
        
            
            <!-- Comments will be dynamically inserted here -->
        </section>
    `;
    // Event listener for showing tags
    // After creating the postElement and setting its innerHTML
    const showTagsButton = postElement.querySelector('.show-tags');
    const tagsContainer = postElement.querySelector('.tags-container');

    // Populate the tags container here if not already populated
    // For demonstration, assuming `post.tags` is an array of strings
    tagsContainer.innerHTML = post.tags.join(', ');

    showTagsButton.addEventListener('click', function() {
        // Toggle visibility
        tagsContainer.classList.toggle('hidden');
    });

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

                const commentUserName = document.createElement('span');
                commentUserName.classList.add('comment-username');
                // const commentProfileIcon = postElement.querySelector('.profile_icon');
                const commentBody = document.createElement('span');
                const commeentSeparator = document.createElement('span');
               
                commentUserName.textContent = comment.user.username;
                commeentSeparator.textContent = ': ';
                commentBody.textContent = comment.body;

                commentDiv.appendChild(commentUserName);
                commentDiv.appendChild(commeentSeparator);
                commentDiv.appendChild(commentBody);
                
                // commentDiv.textContent = `${comment.user.username}: ${comment.body}`; // Display the username and comment body
                commentsSection.appendChild(commentDiv);
            });
        }).catch(error => {
            console.error(error);
        });
        
}

function toggleTags(postElement, tags) {
    const tagsContainer = postElement.querySelector('.tags-container');
    if (tagsContainer.classList.contains('hidden')) {
        // Populate tags if not already done
        tagsContainer.innerHTML = tags.join(', '); // Assuming `tags` is an array of tag strings
        tagsContainer.classList.remove('hidden');
        tagsContainer.classList.add('visible');
    } else {
        // Hide the tags container again
        tagsContainer.classList.add('hidden');
        tagsContainer.classList.remove('visible');
    }
}

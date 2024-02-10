class User {
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

// Cache for user data to avoid repeated fetches
const usersCache = {};

async function fetchUser(userId) {
    if (usersCache[userId]) {
        return usersCache[userId];
    }

    const response = await fetch(`https://dummyjson.com/users/${userId}?limit=100`);
    if (!response.ok) throw new Error('User data not available.');
    const userData = await response.json();
    const user = new User(userData.id, userData.username, userData.firstName, userData.lastName, userData.email, userData.phone, userData.image);
    usersCache[userId] = user; // Cache the user for future use
    return user;
}

// Cache for comments to avoid repeated fetches
const commentsCache = {};

async function fetchComments(postId) {
    // Check if comments for the postId are already in the cache
    if (commentsCache[postId]) {
        return commentsCache[postId];
    }

    const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
    if (!response.ok) throw new Error('Comments could not be loaded.');
    const commentsData = await response.json();
    commentsCache[postId] = commentsData; // Cache the comments for future use
    return commentsData;
}


async function fetchDataAndDisplay() {
    try {
        const postsResponse = await fetch('https://dummyjson.com/posts');
        if (!postsResponse.ok) throw new Error('Posts could not be fetched.');
        const { posts } = await postsResponse.json();

        // Assume we want to prefetch all user details based on the post's userIds
        const userIds = [...new Set(posts.map(post => post.userId))];
        const userFetchPromises = userIds.map(userId => fetchUser(userId));
        await Promise.all(userFetchPromises);

        let postsContainer = document.querySelector('.posts-container');
        posts.forEach(post => displayPostAndComments(post, postsContainer));
        
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndDisplay();
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

async function displayPostAndComments(post, postsContainer) {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);

    try {
        const user = await fetchUser(post.userId);
        updateUserDetails(postElement, user);

        const comments = await fetchComments(post.id);
        displayComments(postElement, comments);

    } catch (error) {
        console.error(error);
    }
}

function createPostElement(post) {
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
            <span class="show-tags">Tags</span>
            <div class="tags-container hidden">${post.tags ? post.tags.join(', ') : ''}</div>
            <span class="reaction-container">
                <img src="../src/assets/img/5288427_favorite_hand_heart_like_likes_icon.svg" alt="likes tag" width="25" height="30">
                <span class="count">${post.reactions}</span>
            </span> 
            <span class="post-id">Post ID: ${post.id}</span>
        </div>
        <section class="comments"></section>
    `;

    const showTagsButton = postElement.querySelector('.show-tags');
    const tagsContainer = postElement.querySelector('.tags-container');
    showTagsButton.addEventListener('click', () => {
        tagsContainer.classList.toggle('hidden');
    });

    return postElement;
}


function updateUserDetails(postElement, user) {
    const usernameElement = postElement.querySelector('.username');
    usernameElement.textContent = user.username;
    const profileIconElement = postElement.querySelector('.profile_icon');
    profileIconElement.src = user.image;
    usernameElement.addEventListener('click', () => user.showModal());
}


async function displayComments(postElement, commentsData) {
    const commentsSection = postElement.querySelector('.comments');
    commentsSection.innerHTML = ''; // Clear existing comments if any

    for (const comment of commentsData.comments) {
        // Assuming the comment object includes a userId or some identifier
        const user = await fetchUser(comment.user.id); // Fetch user details for each comment
        
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        
        commentDiv.innerHTML = `
            <img class="profile_icon" src="${user.image}" alt="User icon">
            <div class="commentor-section">
                <span class="comment-username">${user.username} </span>
                <div class="comment-body">${comment.body}</div>
            </div>
        `;
        commentsSection.appendChild(commentDiv);
    }
}


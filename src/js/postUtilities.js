import { fetchUser, fetchComments } from './api.js';
import { updateUserDetails } from './modalUtilities.js'; 

export async function displayPostAndComments(post, postsContainer) {
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

export function createPostElement(post) {
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

export async function displayComments(postElement, commentsData) {
    
    const commentsSection = postElement.querySelector('.comments');
    commentsSection.innerHTML = ''; 

    for (const comment of commentsData.comments) {
        
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

import { setupModalCloseBehavior } from './modalUtilities.js';
import { displayPostAndComments } from './postUtilities.js';
import { fetchPosts } from './api.js'; // Assuming this fetches a large number of posts or all posts

let allPosts = []; // Store all posts
let currentIndex = 0; // Keep track of the current index for displayed posts
const postsPerScroll = 3; // Number of posts to display per scroll

async function fetchAllPosts() {
    const { posts } = await fetchPosts(); 
    allPosts = posts; // Store all posts
    
    displayNextPosts(); // Display the first set of posts immediately
}

function displayNextPosts() {
    const postsContainer = document.querySelector('.posts-container');
    // Get the next chunk of posts to display
    const postsToDisplay = allPosts.slice(currentIndex, currentIndex + postsPerScroll);
    postsToDisplay.forEach(post => displayPostAndComments(post, postsContainer));

    currentIndex += postsPerScroll; // Update the current index

    // Remove event listener if there are no more posts to display
    if (currentIndex >= allPosts.length) {
        window.removeEventListener('scroll', debouncedHandleScroll);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHandleScroll = debounce(function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Trigger next posts display when the user scrolls to the bottom of the page
    if (scrollHeight - scrollTop <= clientHeight + 100) { 
        displayNextPosts();
    }
}, 300); 

document.addEventListener('DOMContentLoaded', () => {
    fetchAllPosts(); // Fetch and display the first set of posts
    setupModalCloseBehavior();
    window.addEventListener('scroll', debouncedHandleScroll);
});

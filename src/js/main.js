import { setupModalCloseBehavior } from './modalUtilities.js';
import { displayPostAndComments } from './postUtilities.js';
import { fetchPosts } from './api.js'; // Assuming this fetches posts with pagination

let currentPage = 1;
const limit = 30; // Adjust based on your API's capabilities

async function fetchDataAndDisplay(page = 1) {
    const { posts, total } = await fetchPosts(page, limit);

    let postsContainer = document.querySelector('.posts-container');
    posts.forEach(post => displayPostAndComments(post, postsContainer));

    currentPage++; // Prepare for the next page

    if (posts.length < limit || (currentPage * limit) >= total) {
        window.removeEventListener('scroll', debouncedHandleScroll); // No more posts to load
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

    if (scrollHeight - scrollTop <= clientHeight + 10) {
        fetchDataAndDisplay(currentPage);
    }
}, 100); // Adjust debounce time as needed

document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndDisplay(); // Load the first page of posts
    setupModalCloseBehavior();
    window.addEventListener('scroll', debouncedHandleScroll);
});


// import { setupModalCloseBehavior } from './modalUtilities.js';
// import { displayPostAndComments } from './postUtilities.js';
// import { fetchUser } from './api.js'; // If you need to prefetch user data

// async function fetchDataAndDisplay() {
//     try {
//         const postsResponse = await fetch('https://dummyjson.com/posts');
//         if (!postsResponse.ok) throw new Error('Posts could not be fetched.');
//         const { posts } = await postsResponse.json();

//         let postsContainer = document.querySelector('.posts-container');
//         posts.forEach(post => displayPostAndComments(post, postsContainer));
        
//     } catch (error) {
//         console.error(error);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     fetchDataAndDisplay();
//     setupModalCloseBehavior();
// });

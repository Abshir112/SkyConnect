import { User } from './user.js';

// Cache for user data to avoid repeated fetches
export const usersCache = {};

// Fetch user data from the API
export async function fetchUser(userId) {
    if (usersCache[userId]) {
        return usersCache[userId];
    }
    const response = await fetch(`https://dummyjson.com/users/${userId}?limit=100`);
    if (!response.ok) throw new Error('User data not available.');
    const userData = await response.json();
    const user = new User(userData.id, userData.username, userData.firstName, userData.lastName, userData.email, userData.phone, userData.image);
    usersCache[userId] = user;
    return user;
}

// Cache for comments to avoid repeated fetches
export const commentsCache = {};

export async function fetchComments(postId) {
    if (commentsCache[postId]) {
        return commentsCache[postId];
    }
    const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
    if (!response.ok) throw new Error('Comments could not be loaded.');
    const commentsData = await response.json();
    commentsCache[postId] = commentsData;
    return commentsData;
}

// Fetch posts from the API
export async function fetchPosts() {
    
    const response = await fetch(`https://dummyjson.com/posts`); 
    if (!response.ok) throw new Error('Posts could not be fetched.');
    const postData = await response.json();
    return postData; 
}

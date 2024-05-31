import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//posts related API calls
export const fetchPostsCount = () => API.get('hyrax/posts');
export const fetchPostsBySearch = (searchQuery) => API.get(`hyrax/posts/search?searchQuery=${searchQuery || 'none'}`);
export const fetchRelatedPosts = (searchQuery) => API.get(`hyrax/posts/relatedPosts?searchQuery=${searchQuery}`);

export const fetchPostsByBatch = (batch) => API.get(`hyrax/posts/batch?batch=${batch || 'none'}`);
export const fetchMyPosts = (creatorId) => API.get(`hyrax/posts/creatorId?creatorId=${creatorId || 'none'}`)
export const fetchPost = (id) => API.get(`hyrax/posts/${id}`);
export const createPost = (newPost) => API.post('hyrax/posts', newPost);
export const getNotice = () => API.get('hyrax/noti/notifications');
export const addNotice = (notice) => API.post(`hyrax/noti/notifications`, notice);
export const getPrompt = (genTopic, subTopic, difficulty, number) => API.get(`hyrax/posts/${genTopic}/${subTopic}/${difficulty}/${number}`); // will need to add a problem parameter and fix link accordingly

//authentification related calls
export const signIn = (formData) => API.post('hyrax/user/signin', formData);
export const googleSignIn = (formData) => API.post('hyrax/user/googleSignIn', formData);
export const signUp = (formData) => API.post('hyrax/user/signup', formData);
export const sendOTP = (finalData) => API.post('hyrax/user/sendotp', finalData);
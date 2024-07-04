import axios from 'axios';

const API = axios.create({baseURL : `https://hyrax-api.onrender.com/`})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//posts related API calls
export const fetchPostsCount = () => API.get('/posts');
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`);
export const fetchRelatedPosts = (searchQuery) => API.get(`/posts/relatedPosts?searchQuery=${searchQuery}`);

export const fetchPostsByBatch = (batch) => API.get(`/posts/batch?batch=${batch || 'none'}`);
export const fetchMyPosts = (creatorId) => API.get(`/posts/creatorId?creatorId=${creatorId || 'none'}`)
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const getNotice = () => API.get('/noti/notifications');
export const addNotice = (notice) => API.post(`/noti/notifications`, notice);

//problem related API calls
export const getPrompt = (id) => API.get(`/problems/${id}`);
export const getParams = (id) => API.get(`/problems/getParams/${id}`);
export const getBestQuestion = (theta, arr, showDomains) => API.get(`/problems/getBestQuestion/${theta}/${arr}/${showDomains}`);
export const getUpdatedParameters = (theta, a, b, c, correct) => API.get(`/problems/getUpdatedParameters/${theta}/${a}/${b}/${c}/${correct}`);
export const postUpdatedParameters = (id, a, b) => API.post(`/problems/postUpdatedParameters/${id}/${a}/${b}`);
export const getAnswer = (id) => API.get(`/problems/getAnswer/${id}`);

//authentification related calls
export const signIn = (formData) => API.post('/user/signin', formData);
export const feedback = (formData) => API.post('/user/feedback', formData);
export const referral = (formData) => API.post('/user/referral', formData);
export const claimReferral = (email) => API.post(`/user/claimReferral/${email}`);
export const claimUserReferred = (email) => API.post(`/user/claimUserReferred/${email}`);
export const deleteReferral = (email) => API.post(`/user/deleteReferral/${email}`);
export const googleSignIn = (formData) => API.post('/user/googleSignIn', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const sendOTP = (finalData) => API.post('/user/sendotp', finalData);
export const updateTheta = (id, theta) => API.post(`/user/updateTheta/${id}/${theta}`);
export const removeOffList = (userId, id) => API.post(`/user/removeOffList/${userId}/${id}`);
export const clearList = (userId) => API.post(`/user/clearList/${userId}`);
export const updateMoney = (id, change) => API.post(`user/updateMoney/${id}/${change}`);
export const getMoney = (id) => API.get(`user/getMoney/${id}`);
export const updateTickets = (id, change) => API.post(`user/updateTickets/${id}/${change}`);
export const getTickets = (id) => API.get(`user/getTickets/${id}`);
export const getUserArr = (userId) => API.get(`/user/getUserArr/${userId}`);
export const getTopUsers = (id) => API.get(`/user/getTopUsers/${id}`);
export const getUserProblemStats = (id) => API.get(`/user/getUserProblemStats/${id}`);
export const getReferralProgress = (id) => API.get(`/user/getReferralProgress/${id}`);
export const getUserReferred = (id) => API.get(`/user/getUserReferred/${id}`);
export const getLifetimeStats = (id) => API.get(`/user/getLifetimeStats/${id}`);
export const postUpdatedUserStats = (id, domain, skill, difficulty, cor) => API.post(`/user/postUpdatedUserStats/${id}/${domain}/${skill}/${difficulty}/${cor}`);
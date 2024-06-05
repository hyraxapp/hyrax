import * as api from '../api';
import { toast } from 'react-hot-toast';
//Action creators

export const getPostsCount = () => async(dispatch) => {
    try{
        const {data} = await api.fetchPostsCount();
        console.log(data);
        dispatch({type : 'POSTS_COUNT', payload : data});
    }   
    catch(error)
    {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try{
        const {data} = await api.fetchPostsBySearch(searchQuery);

        dispatch({type : 'FETCH_BY_SEARCH', payload : data});
        console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
}
export const getRelatedPosts = (searchQuery) => async(dispatch) => {
    const toastId = toast.loading("Loading..");
    try{
        
        const {data : {data}} = await api.fetchRelatedPosts(searchQuery);

        dispatch({type : 'RELATED_POSTS', payload : data});
        
        console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
    toast.dismiss(toastId);
}

export const getPostsByBatch = (batch) => async(dispatch) => {
    try{
        dispatch({type : 'START_LOADING'});
        const {data : {data}} = await api.fetchPostsByBatch(batch);

        dispatch({type : 'FETCH_BY_BATCH', payload : data});
        dispatch({type : 'END_LOADING'});
        console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getMyPosts = (creatorId) => async(dispatch) => {
    try{
        dispatch({type : 'START_LOADING'});
        const {data : {data}} = await api.fetchMyPosts(creatorId);

        dispatch({type : 'FETCH_MY_POSTS', payload : data});
        dispatch({type : 'END_LOADING'});
        console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getInterviewExp = (id) => async(dispatch) => {
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await api.fetchPost(id);

        dispatch({type : 'FETCH_POST', payload : {post : data}});
        dispatch({type : 'END_LOADING'});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const createPost = (post) => async(dispatch) => {
    const toastId = toast.loading("Submitting Post..")
    try{
        
        const {data} = await api.createPost(post);
        toast.success("Interview Experience Submitted 🎉")
        dispatch({type : 'CREATE', payload : data});
        console.log(data);
    }
    catch(error){
        console.log({message : error.message});
        toast.error("Submission Unsuccessful");
    }
    toast.dismiss(toastId);
}

export const accessProblem = async (id) => {
    try {
      const {data} = await api.getPrompt(id);
      return {text: data.text, answertext : data.answertext};
    } catch (error) {
      console.log("Failed to access problem");
      return null;
    }
}

export const accessParameters = async (id) => {
    try {
        const {data} = await api.getParams(id);
        return {a: data.a, b: data.b, c: data.c};
    } catch (error) {
        console.log("Failed to access parameters");
        return null;
    }
}

export const getAnswer = async(id) => {
    try {
        const {data} = await api.getAnswer(id);
        return {text: data.txt, correct_answer: data.correct_answer};
    } catch (error) {
        console.log("Failed to get answer explanation");
        return null;
    }
}

export const getBestQuestion = async (theta) => {
    try {
        const {data} = await api.getBestQuestion(theta);
        const best_question_id = data.best_question_id;
        return {id: best_question_id};
    } catch (error) {
        console.log("Failed to get best question");
        return null;
    }
}

export const getUpdatedParameters = async(theta, a, b, c, correct) => {
    try {
        const {data} = await api.getUpdatedParameters(theta, a, b, c, correct);
        return {new_theta: data.newTheta, new_a: data.newa, new_b: data.newb};
    } catch (error) {
        console.log("Failed to retrieve updated parameters");
        return null;
    }
}

export const postUpdatedParameters = async(id, a, b) => {
    try {
        await api.postUpdatedParameters(id, a, b);
    } catch (error) {
        console.log("Failed to post Updated Parameters");
    }
}
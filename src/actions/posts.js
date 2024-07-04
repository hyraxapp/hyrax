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
      return {text: data.text, answertext : data.answertext, difficulty: data.difficulty, attributes: data.attributes};
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

export const getBestQuestion = async (theta, arr, showDomains) => {
    try {
        const {data} = await api.getBestQuestion(theta, (JSON.stringify(arr)), JSON.stringify(showDomains));
        const best_question_id = data.best_question_id;
        return {id: best_question_id};
    } catch (error) {
        console.log("Failed to get best question");
        return null;
    }
}

export const getUserArr = async(userId) => {
    try {
        const {data} = await api.getUserArr(userId);
        return {arr : data.arr};
    } catch (error) {
        console.log("Failed to get User Array");
        return null;
    }
}

export const removeOffList = async(userId, id) => {
    try {
        await api.removeOffList(userId, id);
    } catch (error) {
        console.log("Failed to remove problem off list");
        return null;
    }
}

export const clearList = async(userId) => {
    try {
        await api.clearList(userId);
    } catch (error) {
        console.log("failed to clear list");
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

export const updateMoney = async(id, change) => {
    try {
        if (change > 0) {
            toast.success("Earned " + Math.abs(change.toFixed(2)).toLocaleString('en', {useGrouping:true}) + " Hybux");
        } else {
            toast.error("Lost " + Math.abs(change.toFixed(2)).toLocaleString('en', {useGrouping:true}) + " Hybux");
        }
        await api.updateMoney(id, change);
    } catch (error) {
        console.log("Failed to update money");
        return null;
    }
}

export const getMoney = async(id) => {
    try {
        const {data} = await api.getMoney(id);
        return {money: data.money};
    } catch (error) {
        console.log("Failed to update money");
        return null;
    }
}

export const updateTickets = async(id, change) => {
    try {
        if (change > 0) {
            toast.success("Earned " + change + " Ticket");
        } else {
            toast.error("Lost " + Math.abs(change) + " Ticket");
        }
        await api.updateTickets(id, change);
    } catch (error) {
        console.log("Failed to update tickets");
        return null;
    }
}

export const getTickets = async(id) => {
    try {
        const {data} = await api.getTickets(id);
        return {tickets: data.tickets};
    } catch (error) {
        console.log("Failed to update tickets");
        return null;
    }
}

export const getTopUsers = async(id) => {
    try {
        const {data} = await api.getTopUsers(id);
        return {list: data.list};
    } catch (error) {
        console.log("Failed to get top users");
        return null;
    }
}

export const getUserProblemStats = async(id) => {
    try {
        const {data} = await api.getUserProblemStats(id);
        return {algebra: data.algebra, advMath: data.advMath, probSolvDataAnalysis: data.probSolvDataAnalysis, geoTrig: data.geoTrig};
    } catch (error) {
        console.log("Failed to get top users");
        return null;
    }
}
export const getReferralProgress = async(id) => {
    try {
        const {data} = await api.getReferralProgress(id);
        return {arr: data.arr};
    } catch (error) {
        console.log("Failed to get referral progress");
        return null;
    }
}

export const getUserReferred = async(id) => {
    try {
        const {data} = await api.getUserReferred(id);
        return {arr: data.arr};
    } catch (error) {
        console.log("Failed to get referral progress");
        return null;
    }
}

export const claimReferral = async(email) => {
    try {
        await api.claimReferral(email);
    } catch (error) {
        console.log("Failed to get claim referral");
        return null;
    }
}

export const claimUserReferred = async(email) => {
    try {
        await api.claimUserReferred(email);
    } catch (error) {
        console.log("Failed to get claim user referred");
        return null;
    }
}
export const deleteReferral = async(email) => {
    try {
        await api.deleteReferral(email);
    } catch (error) {
        console.log("Failed to get delete referral", error);
        return null;
    }
}

export const getLifetimeStats = async(id) => {
    try {
        const {data} = await api.getLifetimeStats(id);
        return {lifetimeTickets: data.lifetimeTickets, lifetime: data.lifetime, maxNetWorth: data.maxNetWorth};
    } catch (error) {
        console.log("Failed to get top users");
        return null;
    }
}

export const postUpdatedUserStats = async(id, domain, skill, difficulty, cor) => {
    try {
        await api.postUpdatedUserStats(id, domain, skill, difficulty, cor);
    } catch (error) {
        console.log("Failed to post Updated User Stats");
    }
}

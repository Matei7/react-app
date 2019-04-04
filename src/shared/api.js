import {ENDPOINTS} from 'shared/constants';
import {request} from "shared/apiRequest";


export const login = payload => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.LOGIN, {body: JSON.stringify(payload)});
};
export const register = payload => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.REGISTER, {body: JSON.stringify(payload)});
};


export const getMedici = () => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MEDICI, {method: 'GET'})
};

export const getMediciById = (id) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MEDICI_BY_ID + id, {method: 'GET'})
};

export const postMedici = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MEDICI, payload)
};


export const getSpitale = () => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.SPITALE, {method: 'GET'})
};

export const getSpitalById = (id) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.SPITALE_BY_ID + id, {method: 'GET'})
};

export const postSpital = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.SPITALE, {body: JSON.stringify(payload)})
};


export const getPosts = () => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.POST, {method: 'GET'})
};

export const getPostById = (id) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.GET_POST_BY_ID + id, {method: 'GET'})
};

export const postComment = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.COMMENT, {body: JSON.stringify(payload)})
};

export const deleteComment = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.COMMENT, {method: 'DELETE', body: JSON.stringify(payload)})
};


export const sharePost = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.POST, {body: JSON.stringify(payload)})
};

export const deletePost = (payload) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.POST, {method: 'DELETE', body: JSON.stringify(payload)})
};


export const getMessages = (id) => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MESSAGES + id, {method: 'GET'})
};

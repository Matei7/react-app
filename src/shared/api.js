import {ENDPOINTS} from 'shared/constants';
import {request} from "shared/apiRequest";


export const login = payload => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.LOGIN, {body: JSON.stringify(payload)});
};
export const register = payload => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.REGISTER, {body: JSON.stringify(payload)});
};

export const updateProfile = payload => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.UPDATE_PROFILE, {body: JSON.stringify(payload)});
};


export const getMedici = id => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MEDICI + (id || 1), {method: 'GET'});
};

export const getMedicById = id => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.MEDICI_BY_ID + id, {method: 'GET'})
};


export const getMedics = () => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.MEDICS, {method: 'GET'})
};

export const getUsers = () => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.USERS, {method: 'GET'})
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

export const getProfile = id => {
    return request(ENDPOINTS.ROOT + ENDPOINTS.PROFILE + id, {method: 'GET'})
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
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.COMMENT, {method: 'DELETE', body: JSON.stringify(payload)})
};

export const deleteUser = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.USER, {method: 'DELETE', body: JSON.stringify(payload)})
};
export const deleteMedic = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.MEDIC, {method: 'DELETE', body: JSON.stringify(payload)})
};
export const deleteHospital = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.HOSPITAL, {method: 'DELETE', body: JSON.stringify(payload)})
};


export const editUser = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.USER, {method: 'PUT', body: JSON.stringify(payload)})
};
export const editMedic = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.MEDIC, {method: 'PUT', body: JSON.stringify(payload)})
};
export const editHospital = (payload) => {
    return request(ENDPOINTS.ROOT_PY + ENDPOINTS.HOSPITAL, {method: 'PUT', body: JSON.stringify(payload)})
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

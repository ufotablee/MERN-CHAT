import { axios } from 'core';

export default {
    signIn: obj => axios.post("/user/signin", obj), 
    signUp: obj => axios.post('/user/signup', obj),
    getMe: () => axios.get("/user/me"),
    verify: hash => axios.get(`/user/verify?hash=${hash}`),
    findUsers: name => axios.get(`/user/find?query=${name}`),
    getUserDataById: _id => axios.get(`/user/${_id}`),
    uploadAvatar: (_id, data) => axios.post(`/user/avatar/${_id}`,{url: data}),
    editData: (_id,data) => axios.post(`/user/edit/${_id}`,{fullname: data.fullname, email: data.email})
}
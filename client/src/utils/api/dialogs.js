import { axios } from 'core';

export default {
    getAll: () => axios.get("/dialogs"),
    create: (partnerId,value) => axios.post("/dialogs",{partner:partnerId,text:value }),
    delete: _id => axios.delete(`/dialog/${_id}`)
}
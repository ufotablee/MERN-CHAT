import { axios } from 'core';

export default {
    getAllByDialogId: _id => axios.get("/messages?dialog=" + _id),
    send: (text, dialog, attachments) => axios.post("/messages", {
        text,
        dialog,
        attachments
    }),
    removeById: _id => axios.delete("/messages?id=" + _id)
}
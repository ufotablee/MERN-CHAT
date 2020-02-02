import { dialogsApi } from 'utils/api'
import socket from 'core/socket';
const actions = {
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items
    }),
    setStatus: bool => ({
        type: 'DIALOGS:CHANGE_MESSAGE',
        payload: bool
    }),
    setCurrentDialogId: _id => dispatch => {
        socket.emit('DIALOGS:JOIN', _id);
        dispatch({
            type:'DIALOGS:SET_CURRENT_DIALOG_ID',
            payload: _id,
        })
    },
    updateReadedStatus: ({userId, dialogId}) => ({
        type: 'DIALOGS:LAST_MESSAGE_READED_STATUS',
        payload: {
            userId,
            dialogId,
          },
    }),
    updateUnreadedStatus: (_id) => ({
        type: 'DIALOGS:SET_UNREADED',
        payload: _id
    })
    ,
    fetchDialogs: userId => dispatch => {
        dialogsApi.getAll().then(({data}) => {   
         dispatch(actions.setDialogs(data))
         dispatch(actions.updateUnreadedStatus(userId))
        })
    },
    
}

export default actions
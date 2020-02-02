const initialState = {
    items: [],
    currentDialogId: window.location.pathname.split('dialog/')[1],
    isLoading: false,
}

export default ( state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: payload
            };
        case 'DIALOGS:SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: payload
            };
        case 'DIALOGS:CHANGE_MESSAGE':
            return {
                ...state,
                items: {
                    ...state.items.lastMessage,
                    readed: payload
                }
            };    
        case 'DIALOGS:SET_UNREADED':
            return {
                ...state,
                items: state.items.map(dialog => {
                dialog.lastMessage.unreaded = dialog.messages.filter((item) => item.readed !== true && item.user !== payload).length
               
                    return dialog
                })
                
        };
        case 'DIALOGS:LAST_MESSAGE_READED_STATUS':
            return {
                ...state,
                items: state.items.map(dialog => {
                    if (dialog._id === payload.dialogId) {
                      dialog.lastMessage.readed = true;
                    }
                    return dialog;
                  }),
        };    
        default:
            return state
    }
}
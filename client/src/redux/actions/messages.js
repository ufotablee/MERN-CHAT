import { messagesApi } from 'utils/api'

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    onRemoveMessage: _id => dispatch => {
      dispatch({
        type: 'MESSAGES:REMOVE_MESSAGE',
        payload: _id
      })
      messagesApi
      .removeById(_id)
      .catch( err => {
        dispatch(actions.setIsLoading(false))
      })
    },
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs
        if (currentDialogId === window.location.pathname.split('dialog/')[1]) {
          dispatch({
            type: "MESSAGES:ADD_MESSAGE",
            payload: message
          });
        }
      },
      fetchSendMessage: ({ text, dialogId, attachments }) => dispatch => {
        return messagesApi.send(text, dialogId, attachments);
      },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
    fetchMessages: dialogId => dispatch => {
        dispatch(actions.setIsLoading(true))
        messagesApi
            .getAllByDialogId(dialogId)
            .then(({data}) => {       
            dispatch(actions.setMessages(data))
        }).catch(() => {
        dispatch(actions.setIsLoading(false))
        })
    }
}

export default actions
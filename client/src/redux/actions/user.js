import { userApi,fileApi } from 'utils/api'
import { openDialogs } from 'utils/helpers'
const actions = {
    setUserData: user => ({
        type: 'USER:SET_DATA',
        payload: user
    }),
    setIsAuth: bool => ({
      type: 'USER:SET_IS_AUTH',
      payload: bool
  }),
    setChangeData: user => ({
      type: 'USER:CHANGE_DATA',
      payload: user
    })
    ,
    setData: user => ({
      type: 'USER:SET_USER_DATA',
      payload: user
    }),
    setAvatar: url => ({
      type: 'USER:SET_AVATAR',
      payload: url
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe()
        .then(({data}) => {
            dispatch(actions.setUserData(data))
        })
        .catch( err => {
          if(err.response.status === 403) {
            dispatch(actions.setIsAuth(false))
            delete window.localStorage.token
          }
        })
    },
    fetchUserLogin: obj => dispatch => {
        return userApi.signIn(obj)
        .then(({data}) => {
            const {status, token} = data;
            if(status === "error"){
                openDialogs({
                  title: "Ошибка при авторизации",
                  text: "Неверный логин или пароль", 
                  type: "error"
                })
              }
              else {
                openDialogs({
                  text: "Отлично!",
                  title: "Авторизация успешна!",
                  type: "success"
                })
              dispatch(actions.setUserData(data))
              window.axios.defaults.headers.common["token"] = token;
              window.localStorage["token"] = token
              dispatch(actions.fetchUserData())
              dispatch(actions.setIsAuth(true))
            }
            return data
        });
    },
    fetchUserRegister: obj => dispatch =>{
      return userApi.signUp(obj);
  }, 
    getUserById: _id => dispatch => {
       return userApi.getUserDataById(_id).then( ({data}) => {
         dispatch(actions.setData(data))
       })
    },
    setUserAvatar: (file,_id) => dispatch => {
      return fileApi.upload(file)
      .then(({data}) => userApi.uploadAvatar(_id, data.file.url))
      .then(({data})=> dispatch(actions.setAvatar(data.file.avatar)))
    },
    setChangeInfo: (_id,data) => dispatch => {
      return userApi.editData(_id,data).then(({data}) => dispatch(actions.setChangeData(data.info)))
    } 
   
}

export default actions
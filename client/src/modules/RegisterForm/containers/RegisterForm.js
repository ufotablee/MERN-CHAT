import RegisterForm from '../components/RegisterForm'
import { withFormik } from 'formik'
import validations from 'utils/validations'
import { openDialogs } from 'utils/helpers'
import { userActions } from 'redux/actions'
import get from 'lodash/get';
import store from 'redux/store'

export default  withFormik({
    mapPropsToValues: () => ({
        email: '',
        fullname: '',
        password: '',
        password2: ''
    }),
    validate: values => {
      let errors = {};
      validations({ isAuth: false, values, errors })
      return errors
    },
    handleSubmit: (values, { setSubmitting,props }) => {
      store.dispatch(userActions.fetchUserRegister(values))
      .then( () => {
        props.history.push('/signup/verify');
        setSubmitting(false)
      })
      .catch(err => {
        if (get(err, 'response.data.message.errmsg', '').indexOf('dup') >= 0) {
          openDialogs({
            title: 'Ошибка',
            text: 'Аккаунт с такой почтой уже создан.',
            type: 'error',
            duration: 5000
          });
        } else {
          openDialogs({
            title: 'Ошибка',
            text: 'Возникла серверная ошибка при регистрации. Повторите позже.',
            type: 'error',
            duration: 5000
          });
        }
        setSubmitting(false);
      });
    },
    displayName: 'RegisterForm',
  })(RegisterForm);
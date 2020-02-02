import LoginForm from '../components/LoginForm'
import { withFormik } from 'formik'
import validations from 'utils/validations'

import { userActions } from 'redux/actions'
import store from 'redux/store'

const LoginFormContainer = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
      let errors = {};
      validations({ isAuth: true,values,errors })
      return errors
    },
    handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(userActions.fetchUserLogin(values))
      .then(({ status }) => {
        if (status === 'success') {
          props.history.push('/');
        }
        // setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
    displayName: 'LoginForm',
  })(LoginForm);

  

  export default LoginFormContainer;
 
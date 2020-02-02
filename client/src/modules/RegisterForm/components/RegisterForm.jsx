import React from 'react';
import { Form, } from 'antd';
import { Link } from 'react-router-dom'
import { Button, WhiteBlock, FormField } from 'components'



const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
  } = props;
  
  return ( 
    <div>
         <div className="auth__top">
           <h2>Регистрация</h2>
           <p>Для входа в чат, вам нужно зарегистрироваться</p>
       </div>
       <WhiteBlock>
       <Form onSubmit={handleSubmit} className="login-form">
         <FormField 
         name="email"
         icon="mail"
         placeholder="E-Mail"
         handleChange={handleChange}
         handleBlur={handleBlur}
         touched={touched}
         errors={errors}
         values={values}
         />
          <FormField 
         name="fullname"
         icon="user"
         placeholder="Ваше имя"
         handleChange={handleChange}
         handleBlur={handleBlur}
         touched={touched}
         errors={errors}
         values={values}
         />
          <FormField 
         name="password"
         icon="lock"
         placeholder="Пароль"
         handleChange={handleChange}
         handleBlur={handleBlur}
         touched={touched}
         errors={errors}
         values={values}
         type="password"
         />
         <FormField 
         name="password2"
         icon="lock"
         type="password2"
         placeholder="Повторить пароль"
         handleChange={handleChange}
         handleBlur={handleBlur}
         touched={touched}
         errors={errors}
         values={values}
         />
           <Form.Item>
           {dirty && !isValid ? <span>Ошибка!</span> : '' }
             <Button type="primary" onClick={handleSubmit} htmlType="submit" size="large" className="login-form-button" >
               Зарегистрироваться
             </Button>
             <Link to="/signIn" className="auth__register-link">Войти в аккаунт</Link>
           </Form.Item>
         </Form> 
         
       </WhiteBlock>
   </div>
    );
}
 
export default RegisterForm;

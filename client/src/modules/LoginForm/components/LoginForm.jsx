import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Link } from 'react-router-dom'
import { Button, WhiteBlock } from 'components'

const LoginForm = (props) => {

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return ( 
    <div>
      <div className="auth__top">
           <h2>Войти в аккаунт</h2>
           <p>Пожалуйста, войдите в свой аккаунт</p>
       </div>
       <WhiteBlock>
       <Form onSubmit={handleSubmit} className="login-form">
           <Form.Item 
           validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'} 
           hasFeedback
           help={!touched.email ? '' : errors.email}>
               <Input
                 id="email"
                 size="large"
                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 placeholder="E-Mail"
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
               />
           </Form.Item>
           <Form.Item 
           validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'} 
           hasFeedback
           help={!touched.password ? '' : errors.password}>
               <Input
                 id="password"
                 size="large"
                 type="password"
                 value={values.password}
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 placeholder="Пароль"
                 onChange={handleChange}
                 onBlur={handleBlur}
               />
           </Form.Item>
           <Form.Item>
             <Button type="primary" htmlType="submit" size="large" className="login-form-button" onClick={handleSubmit} >
              Войти
             </Button>
             <Link to="/signUp" className="auth__register-link" >Зарегистрироваться</Link>
           </Form.Item>
         </Form>
         </WhiteBlock>
   </div>
    );
}
 
export default LoginForm;
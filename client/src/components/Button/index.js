import React from 'react';
import { Button as BaseButton } from 'antd'
import PropTypes from 'prop-types'
import './button.scss'
import className from 'classnames'

const Button = (props) => (<BaseButton {...props} className={className('button',props.className, {'button--large' : props.size === 'large'})}/>
)
Button.propTypes = {
    className: PropTypes.string
} 

export default Button;
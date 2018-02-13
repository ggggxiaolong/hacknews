import React from 'react'
import { Loading } from "../Loading";
import PropTypes from 'prop-types'

const Button = ({ onClick , className = '', children }) => 
    <button
        onClick={onClick}    
        className={className}
        type='button'
    >
        {children}
    </button>

const withLoading = (Comment) => ({ isLoading, ...rest }) => 
    isLoading
        ? <Loading />
        : <Comment {...rest} />

export const  ButtonWithLoading = withLoading(Button)

ButtonWithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.element,
}
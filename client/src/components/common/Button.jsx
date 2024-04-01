import React from 'react'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, classNames, variant, size, rounded, ...props }) => {
  const variants = {
    'primary': 'bg-primary text-white hover:opacity-85 transition',
    'success': 'bg-success text-white hover:opacity-85 transition',
    'warning': 'bg-warning text-white hover:opacity-85 transition',
    'danger': 'bg-danger text-white hover:opacity-85 transition',
    'light': 'bg-light text-white hover:opacity-85 transition',
    'dark': 'bg-dark text-white hover:opacity-85 transition',
    'primary-outline':
      'border border-primary text-primary hover:bg-primary hover:text-white hover:opacity-85 transition',
    'success-outline':
      'border border-success text-success hover:bg-success hover:text-white hover:opacity-85 transition',
    'warning-outline':
      'border border-warning text-warning hover:bg-warning hover:text-white hover:opacity-85 transition',
    'danger-outline': 'border border-danger text-danger hover:bg-danger hover:text-white hover:opacity-85 transition',
    'light-outline': 'border border-light text-light hover:bg-light hover:text-white hover:opacity-85 transition',
    'dark-outline': 'border border-dark text-dark hover:bg-dark hover:text-white hover:opacity-85 transition',
    'disabled': 'bg-neutral-300 text-neutral-100 cursor-not-allowed transition',
  }

  const sizes = {
    'sm': 'px-2 py-1 text-xs',
    'md': 'px-3 py-1 text-sm',
    'lg': 'px-5 py-2 text-base',
  }

  const buttonClass = twMerge(
    'px-4 py-1 font-semibold',
    classNames,
    variants[variant],
    sizes[size],
    rounded ? 'rounded' : ''
  )

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'light',
    'dark',
    'success',
    'danger',
    'warning',
    'primary-outline',
    'light-outline',
    'dark-outline',
    'success-outline',
    'danger-outline',
    'warning-outline',
    'disabled',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool,
}

Button.defaultProps = {
  rounded: false,
  variant: 'primary',
  size: 'md',
}

export default Button

import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, classNames, variant, size, rounded, type, ...props }) => {
  const variants = {
    'primary': 'bg-primary border border-primary text-white hover:opacity-85 transition',
    'success': 'bg-success border border-success text-white hover:opacity-85 transition',
    'warning': 'bg-warning border border-warning text-white hover:opacity-85 transition',
    'danger': 'bg-danger border border-danger text-white hover:opacity-85 transition',
    'dark': 'bg-gray-500 border border-gray-500 text-white hover:opacity-85 transition',
    'primary-outline':
      'border border-primary text-primary hover:bg-primary hover:text-white hover:opacity-85 transition',
    'success-outline':
      'border border-success text-success hover:bg-success hover:text-white hover:opacity-85 transition',
    'warning-outline':
      'border border-warning text-warning hover:bg-warning hover:text-white hover:opacity-85 transition',
    'danger-outline': 'border border-danger text-danger hover:bg-danger hover:text-white hover:opacity-85 transition',
    'dark-outline':
      'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white hover:opacity-85 transition',
    'disabled': 'bg-neutral-300 text-neutral-100 cursor-not-allowed transition',
  }

  const sizes = {
    'sm': 'px-2 py-1 text-xs sm:text-sm',
    'md': 'px-1 py-1 text-xs xsm:text-sm sm:px-3 sm:py-1 sm:text-base',
    'lg': 'px-2 py-1 text-base sm:px-5 sm:py-2 sm:text-lg md:text-xl',
  }

  const buttonClass = twMerge(
    'px-4 py-1 outline-none',
    classNames,
    variants[variant],
    sizes[size],
    rounded ? 'rounded' : ''
  )

  return (
    <button className={buttonClass} type={type} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'dark',
    'success',
    'danger',
    'warning',
    'primary-outline',
    'dark-outline',
    'success-outline',
    'danger-outline',
    'warning-outline',
    'disabled',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
}

Button.defaultProps = {
  rounded: false,
  variant: 'primary',
  size: 'md',
  type: 'button',
}

export default Button

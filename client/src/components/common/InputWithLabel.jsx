import React from 'react'
import PropTypes from 'prop-types'

const InputWithLabel = ({ id, name, label, type, placeholder, value, onChange, className }) => {
  return (
    <label
      htmlFor={id}
      className={`relative block rounded-md w-[min(100%,600px)] mx-auto border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${className}`}
    >
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-3 py-2"
        placeholder={placeholder || label}
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {label}
      </span>
    </label>
  )
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

InputWithLabel.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
}

export default InputWithLabel

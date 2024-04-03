import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ type, placeholder, value, onChange, label, className }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary ${className}`}
      />
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']), // Type of input
  placeholder: PropTypes.string, // Placeholder text
  value: PropTypes.string.isRequired, // Current value of input
  onChange: PropTypes.func.isRequired, // Function to handle input change
  label: PropTypes.string, // Optional label text
  className: PropTypes.string, // Additional CSS classes for styling
}

Input.defaultProps = {
  type: 'text', // Default input type is text
  placeholder: '', // Default placeholder is empty
  label: '', // Default no label
  className: '', // Default no additional CSS classes
}

export default Input

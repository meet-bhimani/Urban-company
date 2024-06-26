import { useState } from 'react'
import PropTypes from 'prop-types'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

const InputWithLabel = ({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  passwordEye = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label
      htmlFor={id}
      className={twMerge(
        `relative block rounded-md border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary z-0`,
        className
      )}
    >
      <input
        type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-[min(100%,600px)] mx-auto peer border-none bg-transparent placeholder:text-sm placeholder-transparent autofill:bg-[transparent!important] focus:border-transparent focus:outline-none focus:placeholder-gray-500 focus:ring-0 px-3 py-2"
        placeholder={placeholder}
        {...props}
      />

      <div className="absolute right-2 top-0 translate-y-1/2 text-xl pl-3">
        {type == 'password' &&
          passwordEye &&
          (!showPassword ? (
            <IoMdEye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <IoMdEyeOff className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
          ))}
      </div>

      {label.length > 0 && (
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#fff] p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {label}
        </span>
      )}
    </label>
  )
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'date']),
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

import React from 'react'
import InputWithLabel from './InputWithLabel'

const SearchInput = ({ dataType, className, value, onChange, ...props }) => {
  return (
    <>
      <InputWithLabel
        name={'search'}
        id={'search'}
        label={`Search ${dataType}`}
        placeholder={`Search ${dataType}...`}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={'off'}
        className={className}
        {...props}
      />
    </>
  )
}

export default SearchInput

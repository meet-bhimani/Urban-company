import React from 'react'
import InputWithLabel from './InputWithLabel'

const SearchInput = ({ dataName, className, value, onChange, ...props }) => {
  return (
    <>
      <InputWithLabel
        name={'search'}
        id={'search'}
        label={`Search ${dataName}`}
        placeholder={`Search ${dataName}...`}
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

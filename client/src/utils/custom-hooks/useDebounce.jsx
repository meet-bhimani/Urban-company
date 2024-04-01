import {useEffect, useState} from 'react'

const useDebounce = (value,delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(()=>{
    const interval = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearTimeout(interval);
    }
  },[value,delay])

  return debouncedValue
}

export default useDebounce

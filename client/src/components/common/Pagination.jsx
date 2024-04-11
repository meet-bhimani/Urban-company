import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const Pagination = ({ page, setPage, totalPage }) => {
  const numberOfPages = []
  for (let i = 1; i <= totalPage; i++) {
    numberOfPages.push(i)
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = []

    let dotsRight = ' ...'
    let dotsLeft = '... '

    if (numberOfPages.length < totalPage || totalPage <= 5) {
      tempNumberOfPages = numberOfPages
    } else if (page <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsRight, totalPage]
    } else if (page >= 4 && page < totalPage - 2) {
      tempNumberOfPages = [1, dotsLeft, page - 1, page, page + 1, dotsRight, totalPage]
    } else if (page >= totalPage - 2) {
      const sliced = numberOfPages.slice(totalPage - 4)
      tempNumberOfPages = [1, dotsLeft, ...sliced]
    }

    setArrOfCurrButtons(tempNumberOfPages)
  }, [page, totalPage])

  const commonButtonClasses =
    'border-2 border-primary rounded-sm h-8 w-8 flex items-center justify-center text-sm bg-[#fff] text-black'
  const disabledButtonClasses = 'border bg-transparent cursor-not-allowed'
  const arrowButtonClasses = 'h-6 w-6 rounded-full border-none bg-secondary'

  return (
    <div className="mt-10 flex justify-center items-center space-x-2">
      <span
        className={twMerge(
          commonButtonClasses,
          arrowButtonClasses,
          page === 1 ? disabledButtonClasses : 'cursor-pointer'
        )}
        onClick={() => setPage(1)}
      >
        &laquo;
      </span>
      <span
        className={twMerge(
          commonButtonClasses,
          arrowButtonClasses,
          page === 1 ? disabledButtonClasses : 'cursor-pointer'
        )}
        onClick={() => setPage(page - 1)}
      >
        &lt;
      </span>
      {arrOfCurrButtons.map((btn, index) => {
        return (
          <span
            key={index}
            className={twMerge(commonButtonClasses, btn === page ? 'bg-primary text-[#fff]' : 'cursor-pointer')}
            onClick={() => setPage(btn)}
          >
            {btn.toString().trim()}
          </span>
        )
      })}
      <span
        className={twMerge(
          commonButtonClasses,
          arrowButtonClasses,
          page === totalPage ? disabledButtonClasses : 'cursor-pointer'
        )}
        onClick={() => setPage(page + 1)}
      >
        &gt;
      </span>
      <span
        className={twMerge(
          commonButtonClasses,
          arrowButtonClasses,
          page === totalPage ? disabledButtonClasses : 'cursor-pointer'
        )}
        onClick={() => setPage(totalPage)}
      >
        &raquo;
      </span>
    </div>
  )
}

export default Pagination

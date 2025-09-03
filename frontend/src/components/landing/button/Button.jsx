import React from 'react'
import { Link } from 'react-router-dom';

const Button = () => {
  return (
      <div className="flex justify-center my-6">
          <Link
              to="/money"
              className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 h-[36px] sm:h-[42px] no-underline"
          >
              Become a Lifesaver
          </Link>
      </div> 
  )
}

export default Button
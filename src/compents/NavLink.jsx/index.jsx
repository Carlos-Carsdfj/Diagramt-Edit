import { forwardRef } from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'
const NavLink = forwardRef(({ ...props }, ref) => {
  const active =
    ' text-xl text-pink-500 text-underline scale-110 text-center h-10 p-2 md:h-auto md:p-4 '

  const className =
    ' text-xl  text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-110 duration-300 ease-in-out'
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) => (isActive ? active : className)}
    ></BaseNavLink>
  )
})

export default NavLink

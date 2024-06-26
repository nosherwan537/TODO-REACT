import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex bg-zinc-600 text-yellow-100 rounded-md'>
        <ul className='flex  gap-3 p-3 '>
            <li>Home</li>
            <li>Todos</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

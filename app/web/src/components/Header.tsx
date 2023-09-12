
function Header() {
  return (
      <header className="bg-gray-800">
      <nav className="flex items-center justify-between px-8 py-2">
        <div>
          <a href="#" className="text-white font-bold text-xl">Logo</a>
        </div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">Products</a></li>
          <li><a href="#" className="text-white">About</a></li>
          <li><a href="#" className="text-white">Services</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
"use client"
import Link from "next/link"
import { Button } from "@radix-ui/themes"
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="w-full flex justify-between px-3 md:px-6 items-center h-[10vh] shadow-md">
      <div className="cursor-pointer font-bold text-xl md:text-2xl lg:text-3xl">
        Welcome
      </div>
      <button
        className="lg:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <ul className="hidden lg:flex gap-4 justify-center items-center">
        <Button>
          {pathname === "/patient" ? <Link className="cursor-pointer" href="/">Home</Link> : <Link className="cursor-pointer" href="/patient">Patient support</Link>}
        </Button>
        <Button>
          {pathname === "/volunteer" ? <Link className="cursor-pointer" href="/">Home</Link> : <Link className="cursor-pointer" href="/volunteer">Volunteer registration</Link>}
        </Button>
        <Button>
          {pathname === "/Contact" ? <Link className="cursor-pointer" href="/">Home</Link> : <Link className="cursor-pointer" href="/Contact">Contact US</Link>}
        </Button>
        <Button>
          {pathname === "/TechStack" ? <Link className="cursor-pointer" href="/">Home</Link> : <Link className="cursor-pointer" href="/TechStack">Teck Stack</Link>}
        </Button>
      </ul>
      {isOpen && (
        <div className="lg:hidden fixed top-[10vh] left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col gap-3 p-4">
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              {pathname === "/patient" ? <Link className="cursor-pointer w-full block" href="/">Home</Link> : <Link className="cursor-pointer w-full block" href="/patient">Patient support</Link>}
            </Button>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              {pathname === "/volunteer" ? <Link className="cursor-pointer w-full block" href="/">Home</Link> : <Link className="cursor-pointer w-full block" href="/volunteer">Volunteer registration</Link>}
            </Button>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              {pathname === "/Contact" ? <Link className="cursor-pointer w-full block" href="/">Home</Link> : <Link className="cursor-pointer w-full block" href="/Contact">Contact US</Link>}
            </Button>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              {pathname === "/TechStack" ? <Link className="cursor-pointer w-full block" href="/">Home</Link> : <Link className="cursor-pointer w-full block" href="/TechStack">Teck Stack</Link>}
            </Button>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
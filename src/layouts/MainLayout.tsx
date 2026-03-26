import type React from "react"
import Navbar from "../components/Navbar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (  
    <div>
        <Navbar />
        <main className="p-6">{children}</main>
    </div>
  )
}

export default MainLayout
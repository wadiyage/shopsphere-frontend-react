import type React from "react"
import Navbar from "../components/layout/Navbar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (  
    <div>
        <Navbar />
        <main>{children}</main>
    </div>
  )
}

export default MainLayout
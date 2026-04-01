import type React from "react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (  
    <div>
        <Navbar />
        <main>{children}</main>
        
        <Footer />
    </div>
  )
}

export default MainLayout
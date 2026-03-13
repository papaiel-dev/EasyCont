import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="d-flex">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {children}

      </div>

    </div>
  )
}
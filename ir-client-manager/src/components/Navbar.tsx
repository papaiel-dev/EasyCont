import { NavLink } from "react-router-dom"
import { useContext } from "react"

import { ThemeContext } from "../context/ThemeContext"

export default function Navbar() {

  const { toggleTheme, theme } = useContext(ThemeContext)

  const estiloLink = ({ isActive }: any) => {

    return isActive
      ? "nav-link active fw-bold text-white"
      : "nav-link text-white"

  }

  return (

    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#1f4d3e" }}
    >

      <div className="container-fluid">

        <NavLink
          className="navbar-brand text-white fw-bold"
          to="/"
        >
          EasyCont
        </NavLink>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/dashboard" className={estiloLink}>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/clientes" className={estiloLink}>
                Clientes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/financeiro" className={estiloLink}>
                Financeiro
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/relatorios" className={estiloLink}>
                Relatórios
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/configuracoes" className={estiloLink}>
                Configurações
              </NavLink>
            </li>

            <li className="nav-item">

              <button
                className="btn btn-sm btn-light ms-3"
                onClick={toggleTheme}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

            </li>

          </ul>

        </div>

      </div>

    </nav>

  )

}
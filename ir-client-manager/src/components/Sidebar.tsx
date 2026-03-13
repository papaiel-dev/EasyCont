import { NavLink } from "react-router-dom"

export default function Sidebar() {

  const linkStyle = ({ isActive }: any) => ({
    display: "block",
    padding: "10px 0",
    color: "white",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal"
  })

  return (

    <div
      style={{
        width: "230px",
        background: "#1f4d3e",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >

      <h4 className="mb-4">EasyCont</h4>

      <nav>

        <NavLink to="/" style={linkStyle}>
          🏠 Home
        </NavLink>

        <NavLink to="/dashboard" style={linkStyle}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/clientes" style={linkStyle}>
          👥 Clientes
        </NavLink>

        <NavLink to="/financeiro" style={linkStyle}>
          💰 Financeiro
        </NavLink>

        <NavLink to="/relatorios" style={linkStyle}>
          📑 Relatórios
        </NavLink>

        <NavLink to="/configuracoes" style={linkStyle}>
          ⚙️ Configurações
        </NavLink>

      </nav>

    </div>

  )

}
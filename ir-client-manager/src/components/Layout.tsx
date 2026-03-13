import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Layout() {

  const navigate = useNavigate()

  const [usuario, setUsuario] = useState<any>(null)
  const [ultimoBackup, setUltimoBackup] = useState<string | null>(null)

  useEffect(() => {

    const user = localStorage.getItem("usuario")

    if (user) setUsuario(JSON.parse(user))

    const backup = localStorage.getItem("ultimoBackup")

    if (backup) setUltimoBackup(backup)

    function atualizarBackup() {

      const novo = localStorage.getItem("ultimoBackup")

      if (novo) setUltimoBackup(novo)

    }

    window.addEventListener("backup-realizado", atualizarBackup)

    return () =>
      window.removeEventListener("backup-realizado", atualizarBackup)

  }, [])

  function formatarData(data: string) {

    const d = new Date(data)

    return d.toLocaleString("pt-BR")

  }

  function sair() {

    localStorage.removeItem("usuario")

    navigate("/login")

    window.location.reload()

  }

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px"
  }

  return (

    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}

      <div
        style={{
          width: "220px",
          backgroundColor: "#1f4d3e",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}
      >

        <h3 style={{ marginBottom: "30px" }}>
          EasyCont
        </h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

          <Link to="/" style={linkStyle}>🏠 Home</Link>

          <Link to="/dashboard" style={linkStyle}>📊 Dashboard</Link>

          <Link to="/clientes" style={linkStyle}>👥 Clientes</Link>

          <Link to="/financeiro" style={linkStyle}>💰 Financeiro</Link>

          <Link to="/relatorios" style={linkStyle}>📄 Relatórios</Link>

          <Link to="/configuracoes" style={linkStyle}>⚙ Configurações</Link>

        </nav>

      </div>

      {/* CONTEÚDO */}

      <div style={{ flex: 1 }}>

        {/* NAVBAR SUPERIOR */}

        <div
          style={{
            backgroundColor: "#1f4d3e",
            color: "white",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <strong>EasyCont</strong>

          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>

            <span>🟢 Drive sincronizado</span>

            {ultimoBackup && (

              <span>

                💾 Último backup: {formatarData(ultimoBackup)}

              </span>

            )}

            {usuario && (

              <span>

                {usuario.nome}

              </span>

            )}

            <button
              onClick={sair}
              className="btn btn-outline-light btn-sm"
            >
              Sair
            </button>

          </div>

        </div>

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>

  )

}
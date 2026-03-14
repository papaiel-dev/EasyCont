import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Layout from "./components/Layout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import NovoCliente from "./pages/NovoCliente"
import ClienteDetalhe from "./pages/ClienteDetalhe"
import Financeiro from "./pages/Financeiro"
import Relatorios from "./pages/Relatorios"
import Configuracoes from "./pages/Configuracoes"

import Login from "./auth/Login"
import ProtectedRoute from "./auth/ProtectedRoute"

import { obterUsuario } from "./auth/authService"
import { baixarBackup } from "./services/driveService"

function App() {

  const [usuario, setUsuario] = useState(
    obterUsuario()
  )

  const [sistemaPronto, setSistemaPronto] = useState(false)

  useEffect(() => {

    async function iniciar() {

      try {

        const backup = await baixarBackup()

        if (backup) {

          localStorage.setItem(
            "clientes",
            JSON.stringify(backup)
          )

        }

      } catch (err) {

        console.log("Drive ainda não autorizado")

      }

      setSistemaPronto(true)

    }

    if (usuario) iniciar()

  }, [usuario])

  function handleLogin() {

    const user = obterUsuario()

    setUsuario(user)

  }

  if (!usuario) {

    return <Login onLogin={handleLogin} />

  }

  if (!sistemaPronto) {

    return <div>Sincronizando dados...</div>

  }

  return (

    <BrowserRouter>

      <Routes>

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/clientes" element={<Clientes />} />

          <Route path="/novo-cliente" element={<NovoCliente />} />

          <Route path="/cliente/:id" element={<ClienteDetalhe />} />

          <Route path="/financeiro" element={<Financeiro />} />

          <Route path="/relatorios" element={<Relatorios />} />

          <Route path="/configuracoes" element={<Configuracoes />} />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App
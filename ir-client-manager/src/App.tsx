import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

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

function App() {

  const [usuario, setUsuario] = useState(
    obterUsuario()
  )

  function handleLogin() {

    const user = obterUsuario()

    setUsuario(user)

  }

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            usuario
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} />
          }
        />

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
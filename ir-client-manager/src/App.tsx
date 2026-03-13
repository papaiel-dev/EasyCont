import { BrowserRouter, Routes, Route } from "react-router-dom"
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

import {
  inicializarDrive,
  baixarBackup,
  salvarBackupDrive
} from "./services/driveService"

function App() {

  const [usuario, setUsuario] = useState(
    obterUsuario()
  )

  const [sistemaPronto, setSistemaPronto] = useState(false)

  useEffect(() => {

    async function iniciarSistema() {

      if (!usuario) return

      try {

        await inicializarDrive()

        const backup = await baixarBackup()

        if (backup) {

          localStorage.setItem(
            "clientes",
            JSON.stringify(backup)
          )

          console.log("Backup restaurado do Drive")

        }

      } catch (erro) {

        console.error(
          "Erro ao sincronizar com Drive",
          erro
        )

      }

      setSistemaPronto(true)

    }

    iniciarSistema()

  }, [usuario])


  useEffect(() => {

    function backupAoFechar() {

      const dados = localStorage.getItem("clientes")

      if (!dados) return

      const clientes = JSON.parse(dados)

      salvarBackupDrive(clientes)

    }

    window.addEventListener(
      "beforeunload",
      backupAoFechar
    )

    return () => {

      window.removeEventListener(
        "beforeunload",
        backupAoFechar
      )

    }

  }, [])


  if (!usuario) {

    return (

      <Login
        onLogin={() =>
          setUsuario(obterUsuario())
        }
      />

    )

  }


  if (!sistemaPronto) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px"
        }}
      >
        Sincronizando dados...
      </div>

    )

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

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/clientes"
            element={<Clientes />}
          />

          <Route
            path="/novo-cliente"
            element={<NovoCliente />}
          />

          <Route
            path="/cliente/:id"
            element={<ClienteDetalhe />}
          />

          <Route
            path="/financeiro"
            element={<Financeiro />}
          />

          <Route
            path="/relatorios"
            element={<Relatorios />}
          />

          <Route
            path="/configuracoes"
            element={<Configuracoes />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import NovoCliente from "./pages/NovoCliente"
import ClienteDetalhe from "./pages/ClienteDetalhe"
import Financeiro from "./pages/Financeiro"
import Relatorios from "./pages/Relatorios"
import Configuracoes from "./pages/Configuracoes"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

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
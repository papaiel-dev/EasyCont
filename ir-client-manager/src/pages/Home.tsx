import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getClientes } from "../services/clientService"
import type { Cliente } from "../services/clientService"

export default function Home() {

  const navigate = useNavigate()

  const [clientes, setClientes] = useState<Cliente[]>([])

  function carregarClientes() {

    const lista = getClientes()

    setClientes(lista)

  }

  useEffect(() => {

    carregarClientes()

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      carregarClientes()

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  const clientesPendentes = clientes
    .map(cliente => {

      const faltando = cliente.checklist.filter(
        doc => !doc.recebido
      ).length

      return {
        ...cliente,
        faltando
      }

    })
    .filter(cliente => cliente.faltando > 0)

 const pagamentosPendentes = clientes.filter(
  c => !c.pago
)

  function abrirCliente(id: string) {

    navigate(`/cliente/${id}`)

  }

  return (

    <div>

      <h2 className="mb-4">
        EasyCont
      </h2>

      <div className="card p-4 mb-4">

        <h5 className="mb-3">
          ⚠ Pendências de documentos
        </h5>

        {clientesPendentes.length === 0 && (

          <p className="text-muted">
            Todos os documentos foram recebidos.
          </p>

        )}

        {clientesPendentes.map(cliente => (

          <div
            key={cliente.id}
            className="d-flex justify-content-between align-items-center mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => abrirCliente(cliente.id)}
          >

            <strong>
              {cliente.nome}
            </strong>

            <span className="text-muted">

              faltando {cliente.faltando} documento
              {cliente.faltando > 1 ? "s" : ""}

            </span>

          </div>

        ))}

      </div>

      <div className="card p-4 mb-4">

        <h5 className="mb-3">
          💰 Pagamentos pendentes
        </h5>

        {pagamentosPendentes.length === 0 && (

          <p className="text-muted">
            Nenhum pagamento pendente.
          </p>

        )}

        {pagamentosPendentes.map(cliente => (

          <div
            key={cliente.id}
            className="d-flex justify-content-between align-items-center mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => abrirCliente(cliente.id)}
          >

            <strong>
              {cliente.nome}
            </strong>

            <span className="text-muted">
              pagamento pendente
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}
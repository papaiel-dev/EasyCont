import { useEffect, useState } from "react"

import { getClientes } from "../services/clientService"
import type { Cliente } from "../services/clientService"

export default function Relatorios() {

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [statusFiltro, setStatusFiltro] = useState("")
  const [pagamentoFiltro, setPagamentoFiltro] = useState("")
  const [valorMin, setValorMin] = useState("")
  const [valorMax, setValorMax] = useState("")

  useEffect(() => {

    const lista = getClientes()
    setClientes(lista)

  }, [])

  const filtrados = clientes.filter(cliente => {

    if (statusFiltro && cliente.status !== statusFiltro)
      return false

    if (pagamentoFiltro === "pago" && !cliente.pago)
      return false

    if (pagamentoFiltro === "pendente" && cliente.pago)
      return false

    if (valorMin && (cliente.valor || 0) < Number(valorMin))
      return false

    if (valorMax && (cliente.valor || 0) > Number(valorMax))
      return false

    return true

  })

  const totalClientes = filtrados.length

  const totalValor = filtrados.reduce(
    (total, c) => total + (c.valor || 0),
    0
  )

  const totalRecebido = filtrados
    .filter(c => c.pago)
    .reduce((total, c) => total + (c.valor || 0), 0)

  const totalPendente = filtrados
    .filter(c => !c.pago)
    .reduce((total, c) => total + (c.valor || 0), 0)

  function formatar(valor: number) {

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  }

  return (
    <div>

      <h2 className="mb-4">Relatórios</h2>

      <div className="card p-3 mb-4">

        <div className="row">

          <div className="col-md-3">

            <label>Status</label>

            <select
              className="form-control"
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >

              <option value="">Todos</option>
              <option>Aguardando documentos</option>
              <option>Em andamento</option>
              <option>Declaração enviada</option>
              <option>Finalizado</option>

            </select>

          </div>

          <div className="col-md-3">

            <label>Pagamento</label>

            <select
              className="form-control"
              value={pagamentoFiltro}
              onChange={(e) => setPagamentoFiltro(e.target.value)}
            >

              <option value="">Todos</option>
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>

            </select>

          </div>

          <div className="col-md-3">

            <label>Valor mínimo</label>

            <input
              type="number"
              className="form-control"
              value={valorMin}
              onChange={(e) => setValorMin(e.target.value)}
            />

          </div>

          <div className="col-md-3">

            <label>Valor máximo</label>

            <input
              type="number"
              className="form-control"
              value={valorMax}
              onChange={(e) => setValorMax(e.target.value)}
            />

          </div>

        </div>

      </div>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Clientes</h6>
            <h3>{totalClientes}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Total</h6>
            <h3>{formatar(totalValor)}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Recebido</h6>
            <h3>{formatar(totalRecebido)}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Pendente</h6>
            <h3>{formatar(totalPendente)}</h3>
          </div>
        </div>

      </div>

      <table className="table table-hover">

        <thead>

          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Pagamento</th>
          </tr>

        </thead>

        <tbody>

          {filtrados.map(cliente => (

            <tr key={cliente.id}>

              <td>{cliente.nome}</td>

              <td>{cliente.cpf}</td>

              <td>{cliente.status}</td>

              <td>
                {(cliente.valor || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>

              <td>
                {cliente.pago ? "Pago" : "Pendente"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}
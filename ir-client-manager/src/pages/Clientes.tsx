import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getClientes } from "../services/clientService"
import type { Cliente } from "../services/clientService"

type Ordenacao = "nome" | "status" | "valor"

export default function Clientes() {

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busca, setBusca] = useState("")
  const [ordenarPor, setOrdenarPor] = useState<Ordenacao>("nome")
  const [direcao, setDirecao] = useState<"asc" | "desc">("asc")

  const navigate = useNavigate()

  useEffect(() => {
    const lista = getClientes()
    setClientes(lista)
  }, [])

  function mudarOrdenacao(coluna: Ordenacao) {

    if (ordenarPor === coluna) {
      setDirecao(direcao === "asc" ? "desc" : "asc")
    } else {
      setOrdenarPor(coluna)
      setDirecao("asc")
    }

  }

  function ordenar(lista: Cliente[]) {

    return [...lista].sort((a, b) => {

      let valorA: any
      let valorB: any

      if (ordenarPor === "nome") {
        valorA = a.nome.toLowerCase()
        valorB = b.nome.toLowerCase()
      }

      if (ordenarPor === "status") {
        valorA = a.status
        valorB = b.status
      }

      if (ordenarPor === "valor") {
        valorA = a.valor || 0
        valorB = b.valor || 0
      }

      if (valorA < valorB)
        return direcao === "asc" ? -1 : 1

      if (valorA > valorB)
        return direcao === "asc" ? 1 : -1

      return 0

    })

  }

  const clientesFiltrados = clientes.filter(cliente => {

    const nome = cliente.nome.toLowerCase()
    const cpf = cliente.cpf.replace(/\D/g, "")

    const termo = busca.toLowerCase()
    const termoCpf = busca.replace(/\D/g, "")

    return (
      nome.includes(termo) ||
      cpf.includes(termoCpf)
    )

  })

  const clientesOrdenados = ordenar(clientesFiltrados)

  function badgeStatus(status: string) {

    if (status === "Finalizado")
      return "badge bg-success"

    if (status === "Em andamento")
      return "badge bg-primary"

    if (status === "Declaração enviada")
      return "badge bg-info"

    return "badge bg-secondary"

  }

  function icone(coluna: Ordenacao) {

    if (ordenarPor !== coluna)
      return ""

    return direcao === "asc" ? " ▲" : " ▼"

  }

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>Clientes</h2>

        <button
          className="btn btn-success"
          onClick={() => navigate("/novo-cliente")}
        >
          Novo Cliente
        </button>

      </div>

      <div className="mb-3">

        <input
          className="form-control"
          placeholder="Buscar por nome ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

      </div>

      <table className="table table-hover">

        <thead>

          <tr>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => mudarOrdenacao("nome")}
            >
              Nome{icone("nome")}
            </th>

            <th>CPF</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => mudarOrdenacao("status")}
            >
              Status{icone("status")}
            </th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => mudarOrdenacao("valor")}
            >
              Valor{icone("valor")}
            </th>

          </tr>

        </thead>

        <tbody>

          {clientesOrdenados.map(cliente => (

            <tr
              key={cliente.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/cliente/${cliente.id}`)}
            >

              <td>{cliente.nome}</td>

              <td>{cliente.cpf}</td>

              <td>
                <span className={badgeStatus(cliente.status)}>
                  {cliente.status}
                </span>
              </td>

              <td>
                {(cliente.valor || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}
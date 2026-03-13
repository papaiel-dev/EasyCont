import { useEffect, useState } from "react"

import { getClientes } from "../services/clientService"
import type { Cliente } from "../services/clientService"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"

import { Pie, Bar } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

export default function Financeiro() {

  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const lista = getClientes()
    setClientes(lista)
  }, [])

  const totalClientes = clientes.length

  const totalFaturado = clientes.reduce(
    (total, cliente) => total + (cliente.valor || 0),
    0
  )

  const totalRecebido = clientes
    .filter(cliente => cliente.pago)
    .reduce((total, cliente) => total + (cliente.valor || 0), 0)

  const totalPendente = clientes
    .filter(cliente => !cliente.pago)
    .reduce((total, cliente) => total + (cliente.valor || 0), 0)

  const ticketMedio =
    totalClientes > 0 ? totalFaturado / totalClientes : 0

  function formatar(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }

  const pagos = clientes.filter(c => c.pago).length
  const pendentes = clientes.filter(c => !c.pago).length

  const aguardando = clientes.filter(c => c.status === "Aguardando documentos").length
  const andamento = clientes.filter(c => c.status === "Em andamento").length
  const enviados = clientes.filter(c => c.status === "Declaração enviada").length
  const finalizados = clientes.filter(c => c.status === "Finalizado").length

  const graficoPagamento = {
    labels: ["Pagos", "Pendentes"],
    datasets: [
      {
        data: [pagos, pendentes],
        backgroundColor: [
          "#2f6f5e",
          "#f0ad4e"
        ]
      }
    ]
  }

  const graficoStatus = {
    labels: [
      "Aguardando docs",
      "Em andamento",
      "Declaração enviada",
      "Finalizado"
    ],
    datasets: [
      {
        label: "Clientes",
        data: [
          aguardando,
          andamento,
          enviados,
          finalizados
        ],
        backgroundColor: "#2f6f5e"
      }
    ]
  }

  return (
    <div>

      <h2 className="mb-4">Financeiro</h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6>Total Faturado</h6>
            <h3>{formatar(totalFaturado)}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6>Total Recebido</h6>
            <h3>{formatar(totalRecebido)}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6>Total Pendente</h6>
            <h3>{formatar(totalPendente)}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6>Ticket Médio</h6>
            <h3>{formatar(ticketMedio)}</h3>
          </div>
        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3">Pagos vs Pendentes</h5>
            <Pie data={graficoPagamento} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3">Clientes por Status</h5>
            <Bar data={graficoStatus} />
          </div>
        </div>

      </div>

    </div>
  )
}
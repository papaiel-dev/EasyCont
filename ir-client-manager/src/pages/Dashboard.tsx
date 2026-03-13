import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getClientes } from "../services/clientService"
import type { Cliente } from "../services/clientService"

export default function Dashboard() {

  const [clientes, setClientes] = useState<Cliente[]>([])
  const navigate = useNavigate()

  useEffect(() => {

    const lista = getClientes()
    setClientes(lista)

  }, [])

  const totalClientes = clientes.length

  const aguardandoDocs = clientes.filter(
    c => c.status === "Aguardando documentos"
  ).length

  const emAndamento = clientes.filter(
    c => c.status === "Em andamento"
  ).length

  const declaracaoEnviada = clientes.filter(
    c => c.status === "Declaração enviada"
  ).length

  const finalizados = clientes.filter(
    c => c.status === "Finalizado"
  ).length

  function card(cor: string) {

    return `card shadow-sm border-0 h-100 ${cor}`

  }

  return (

    <div>

      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">

          <div
            className={card("bg-dark text-white")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/clientes")}
          >

            <div className="card-body">

              <h6>Total de Clientes</h6>

              <h2>{totalClientes}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div
            className={card("bg-secondary text-white")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/clientes?status=Aguardando documentos")}
          >

            <div className="card-body">

              <h6>Aguardando documentos</h6>

              <h2>{aguardandoDocs}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div
            className={card("bg-primary text-white")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/clientes?status=Em andamento")}
          >

            <div className="card-body">

              <h6>Em andamento</h6>

              <h2>{emAndamento}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div
            className={card("bg-info text-white")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/clientes?status=Declaração enviada")}
          >

            <div className="card-body">

              <h6>Declaração enviada</h6>

              <h2>{declaracaoEnviada}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div
            className={card("bg-success text-white")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/clientes?status=Finalizado")}
          >

            <div className="card-body">

              <h6>Finalizados</h6>

              <h2>{finalizados}</h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}
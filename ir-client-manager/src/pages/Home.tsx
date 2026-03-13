import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getClientes } from "../services/clientService"

export default function Home() {

  const navigate = useNavigate()

  const [clientes, setClientes] = useState<any[]>([])
  const [filtro, setFiltro] = useState<string | null>(null)

  useEffect(() => {

    setClientes(getClientes())

  }, [])

  const docsPendentes = clientes.filter(
    c =>
      c.checklist?.length > 0 &&
      c.checklist.some((d: any) => !d.recebido)
  )

  const docsCompletos = clientes.filter(
    c =>
      c.checklist?.length > 0 &&
      c.checklist.every((d: any) => d.recebido)
  )

  const pagamentosPendentes = clientes.filter(
    c => !c.pago
  )

  const faturamentoPrevisto = clientes.reduce(
    (total, c) => total + (c.valor || 0),
    0
  )

  const faturamentoRecebido = clientes
    .filter(c => c.pago)
    .reduce((total, c) => total + (c.valor || 0), 0)

  const prazoIRPF = new Date("2026-05-31")
  const hoje = new Date()

  const diasRestantes = Math.ceil(
    (prazoIRPF.getTime() - hoje.getTime()) /
    (1000 * 60 * 60 * 24)
  )

  function moeda(valor: number) {

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  }

  function abrirCliente(id: string) {

    navigate(`/cliente/${id}`)

  }

  function listaFiltrada() {

    if (filtro === "docs") return docsPendentes
    if (filtro === "pagamentos") return pagamentosPendentes
    if (filtro === "completos") return docsCompletos

    return []

  }

  return (

    <div>

      <h2 className="mb-4">
        📊 Painel do contador
      </h2>

      {/* CARDS */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3">
            ⏳ Prazo IRPF
            <h4>{diasRestantes} dias</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card p-3"
            style={{ cursor: "pointer" }}
            onClick={() => setFiltro("docs")}
          >
            📄 Docs pendentes
            <h4>{docsPendentes.length}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card p-3"
            style={{ cursor: "pointer" }}
            onClick={() => setFiltro("pagamentos")}
          >
            💰 Pagamentos pendentes
            <h4>{pagamentosPendentes.length}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card p-3"
            style={{ cursor: "pointer" }}
            onClick={() => setFiltro("completos")}
          >
            ✅ Documentação completa
            <h4>{docsCompletos.length}</h4>
          </div>
        </div>

      </div>

      {/* FINANCEIRO */}

      <div className="row mb-4">

        <div className="col-md-6">
          <div className="card p-3">
            📈 Faturamento previsto
            <h4>{moeda(faturamentoPrevisto)}</h4>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            💵 Faturamento recebido
            <h4>{moeda(faturamentoRecebido)}</h4>
          </div>
        </div>

      </div>

      {/* LISTA FILTRADA */}

      {filtro && (

        <div className="card p-4">

          {listaFiltrada().map(cliente => (

            <div
              key={cliente.id}
              className="d-flex justify-content-between mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => abrirCliente(cliente.id)}
            >

              <strong>{cliente.nome}</strong>

              <span className="text-muted">
                abrir cliente
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}
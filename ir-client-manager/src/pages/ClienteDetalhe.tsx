import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { v4 as uuidv4 } from "uuid"

import {
  getClientes,
  atualizarCliente
} from "../services/clientService"

import type { Cliente } from "../services/clientService"

export default function ClienteDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const clientes = getClientes()

  const cliente = clientes.find(c => c.id === id)

  if (!cliente) {
    return <p>Cliente não encontrado</p>
  }

  const [dados, setDados] = useState<Cliente>(cliente)
  const [showModal, setShowModal] = useState(false)

  function mascaraData(valor: string) {

    valor = valor.replace(/\D/g, "").slice(0, 8)

    valor = valor.replace(/(\d{2})(\d)/, "$1/$2")
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2")

    return valor

  }

  function salvar() {

    atualizarCliente(dados)

    alert("Cliente atualizado!")

  }

  function confirmarExclusao() {

    const filtrados = clientes.filter(
      c => c.id !== dados.id
    )

    localStorage.setItem(
      "clientes",
      JSON.stringify(filtrados)
    )

    navigate("/clientes")

  }

  function mudarStatus(status: string) {

    const evento = {
      data: new Date().toLocaleString(),
      descricao: `Status alterado para "${status}"`
    }

    setDados({
      ...dados,
      status,
      eventos: [evento, ...dados.eventos]
    })

  }

  function mudarPagamento(pago: boolean) {

    const evento = {
      data: new Date().toLocaleString(),
      descricao: pago
        ? "Pagamento recebido"
        : "Pagamento marcado como pendente"
    }

    setDados({
      ...dados,
      pago,
      eventos: [evento, ...dados.eventos]
    })

  }

  function toggleDocumento(index: number) {

    const checklist = [...dados.checklist]

    checklist[index].recebido =
      !checklist[index].recebido

    setDados({
      ...dados,
      checklist
    })

  }

  function progressoDocumentos() {

    const total = dados.checklist.length

    const recebidos = dados.checklist.filter(
      d => d.recebido
    ).length

    return Math.round((recebidos / total) * 100)

  }

  function adicionarDocumento(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = function(event: any) {

      const novoDocumento = {
        id: uuidv4(),
        nome: file.name,
        arquivo: event.target.result
      }

      setDados({
        ...dados,
        documentos: [...dados.documentos, novoDocumento]
      })

    }

    reader.readAsDataURL(file)

  }

  function removerDocumento(docId: string) {

    setDados({
      ...dados,
      documentos: dados.documentos.filter(
        d => d.id !== docId
      )
    })

  }

  function progressoStatus() {

    const mapa = {
      "Aguardando documentos": 25,
      "Em andamento": 50,
      "Declaração enviada": 75,
      "Finalizado": 100
    }

    return mapa[dados.status as keyof typeof mapa] || 0

  }

  function badgePagamento() {

    if (dados.pago)
      return <span className="badge bg-success">Pago</span>

    return <span className="badge bg-dark">Pendente</span>

  }

  return (

    <div>

      <h2 className="mb-4">
        Perfil do Cliente
      </h2>

      <div className="row">

        <div className="col-md-6">

          {/* INFORMAÇÕES */}

          <div className="card p-3 mb-3">

            <h5>Informações</h5>

            <label>Nome</label>
            <input
              className="form-control mb-2"
              value={dados.nome}
              onChange={(e) =>
                setDados({
                  ...dados,
                  nome: e.target.value
                })
              }
            />

            <label>CPF</label>
            <input
              className="form-control mb-2"
              value={dados.cpf}
              onChange={(e) =>
                setDados({
                  ...dados,
                  cpf: e.target.value
                })
              }
            />

            <label>Email</label>
            <input
              className="form-control mb-2"
              value={dados.email}
              onChange={(e) =>
                setDados({
                  ...dados,
                  email: e.target.value
                })
              }
            />

            <label>Telefone</label>
            <input
              className="form-control mb-2"
              value={dados.telefone}
              onChange={(e) =>
                setDados({
                  ...dados,
                  telefone: e.target.value
                })
              }
            />

            <label>Data de nascimento</label>
            <input
              className="form-control mb-2"
              value={dados.dataNascimento}
              onChange={(e) =>
                setDados({
                  ...dados,
                  dataNascimento: mascaraData(e.target.value)
                })
              }
            />

            <button
              className="btn mt-2"
              style={{
                backgroundColor: "#1f4d3e",
                color: "white"
              }}
              onClick={salvar}
            >
              Salvar alterações
            </button>

            <button
              className="btn btn-danger ms-2 mt-2"
              onClick={() => setShowModal(true)}
            >
              Excluir cliente
            </button>

          </div>

          {/* STATUS */}

          <div className="card p-3 mb-3">

            <h5>Status</h5>

            <div className="progress mb-3">

              <div
                className="progress-bar"
                style={{
                  width: `${progressoStatus()}%`,
                  backgroundColor: "#1f4d3e"
                }}
              />

            </div>

            <button
              className="btn btn-outline-dark me-2 mb-2"
              onClick={() =>
                mudarStatus("Aguardando documentos")
              }
            >
              Aguardando docs
            </button>

            <button
              className="btn btn-outline-dark me-2 mb-2"
              onClick={() =>
                mudarStatus("Em andamento")
              }
            >
              Em andamento
            </button>

            <button
              className="btn btn-outline-dark me-2 mb-2"
              onClick={() =>
                mudarStatus("Declaração enviada")
              }
            >
              Declaração enviada
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() =>
                mudarStatus("Finalizado")
              }
            >
              Finalizado
            </button>

          </div>

          {/* PAGAMENTO */}

          <div className="card p-3 mb-3">

            <h5>
              Pagamento: {badgePagamento()}
            </h5>

            <button
              className="btn me-2"
              style={{
                backgroundColor: "#1f4d3e",
                color: "white"
              }}
              onClick={() => mudarPagamento(true)}
            >
              Marcar como pago
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => mudarPagamento(false)}
            >
              Marcar como pendente
            </button>

          </div>

          {/* CHECKLIST */}

          <div className="card p-3 mb-3">

            <h5>Checklist de documentos</h5>

            <div className="progress mb-3">

              <div
                className="progress-bar"
                style={{
                  width: `${progressoDocumentos()}%`,
                  backgroundColor: "#1f4d3e"
                }}
              />

            </div>

            {dados.checklist.map((doc, i) => (

              <div
                key={i}
                className="form-check"
              >

                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={doc.recebido}
                  onChange={() =>
                    toggleDocumento(i)
                  }
                />

                <label className="form-check-label">

                  {doc.nome}

                </label>

              </div>

            ))}

          </div>

          {/* DOCUMENTOS */}

          <div className="card p-3">

            <h5>Uploads</h5>

            <input
              type="file"
              className="form-control mb-3"
              onChange={adicionarDocumento}
            />

            {dados.documentos.map(doc => (

              <div
                key={doc.id}
                className="d-flex justify-content-between mb-2"
              >

                <a
                  href={doc.arquivo}
                  download={doc.nome}
                >
                  {doc.nome}
                </a>

                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() =>
                    removerDocumento(doc.id)
                  }
                >
                  Excluir
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* TIMELINE */}

        <div className="col-md-6">

          <div className="card p-3">

            <h5>Timeline</h5>

            <ul className="list-group">

              {dados.eventos.map((evento, i) => (

                <li
                  key={i}
                  className="list-group-item"
                >

                  <strong>
                    {evento.data}
                  </strong>

                  <br />

                  {evento.descricao}

                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Excluir cliente
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          Tem certeza que deseja excluir este cliente?

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            onClick={confirmarExclusao}
          >
            Excluir
          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  )

}
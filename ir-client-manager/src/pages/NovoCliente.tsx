import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { v4 as uuidv4 } from "uuid"

import { adicionarCliente } from "../services/clientService"
import type { Cliente } from "../services/clientService"

export default function NovoCliente() {

  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)

  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    valor: ""
  })

  function mascaraCPF(valor: string) {

    valor = valor.replace(/\D/g, "").slice(0, 11)

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return valor

  }

  function mascaraTelefone(valor: string) {

    valor = valor.replace(/\D/g, "").slice(0, 11)

    if (valor.length <= 10) {

      valor = valor.replace(/(\d{2})(\d)/, "($1) $2")
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2")

    } else {

      valor = valor.replace(/(\d{2})(\d)/, "($1) $2")
      valor = valor.replace(/(\d{5})(\d)/, "$1-$2")

    }

    return valor

  }

  function mascaraData(valor: string) {

    valor = valor.replace(/\D/g, "").slice(0, 8)

    valor = valor.replace(/(\d{2})(\d)/, "$1/$2")
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2")

    return valor

  }

  function mascaraValor(valor: string) {

    valor = valor.replace(/\D/g, "").slice(0, 9)

    const numero = Number(valor) / 100

    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  }

  function valorNumerico(valor: string) {

    return Number(
      valor
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    )

  }

  function validarCPF(cpf: string) {

    cpf = cpf.replace(/\D/g, "")

    if (cpf.length !== 11) return false

    if (/^(\d)\1+$/.test(cpf)) return false

    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)

    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11)
      resto = 0

    if (resto !== parseInt(cpf.substring(9, 10)))
      return false

    soma = 0

    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)

    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11)
      resto = 0

    if (resto !== parseInt(cpf.substring(10, 11)))
      return false

    return true

  }

  function validar() {

    if (!cliente.nome) {

      alert("Informe o nome do cliente")
      return false

    }

    if (!validarCPF(cliente.cpf)) {

      alert("CPF inválido")
      return false

    }

    if (!cliente.email.includes("@")) {

      alert("Email inválido")
      return false

    }

    if (cliente.telefone.length < 14) {

      alert("Telefone inválido")
      return false

    }

    if (cliente.dataNascimento.length < 10) {

      alert("Data de nascimento inválida")
      return false

    }

    return true

  }

  function confirmarCadastro() {

    if (!validar()) return

    setShowModal(true)

  }

  function salvarCliente() {

    const novoCliente: Cliente = {

      id: uuidv4(),

      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      telefone: cliente.telefone,
      dataNascimento: cliente.dataNascimento,

      valor: valorNumerico(cliente.valor),

      status: "Aguardando documentos",
      pago: false,

      documentos: [],
      eventos: [],

      checklist: []

    }

    adicionarCliente(novoCliente)

    navigate("/clientes")

  }

  return (

    <div>

      <h2 className="mb-4">
        Novo Cliente
      </h2>

      <div className="card p-4">

        <label>Nome</label>
        <input
          className="form-control mb-2"
          value={cliente.nome}
          onChange={(e) =>
            setCliente({
              ...cliente,
              nome: e.target.value
            })
          }
        />

        <label>CPF</label>
        <input
          className="form-control mb-2"
          value={cliente.cpf}
          onChange={(e) =>
            setCliente({
              ...cliente,
              cpf: mascaraCPF(e.target.value)
            })
          }
        />

        <label>Email</label>
        <input
          className="form-control mb-2"
          value={cliente.email}
          onChange={(e) =>
            setCliente({
              ...cliente,
              email: e.target.value
            })
          }
        />

        <label>Telefone</label>
        <input
          className="form-control mb-2"
          value={cliente.telefone}
          onChange={(e) =>
            setCliente({
              ...cliente,
              telefone: mascaraTelefone(e.target.value)
            })
          }
        />

        <label>Data de nascimento</label>
        <input
          className="form-control mb-2"
          value={cliente.dataNascimento}
          onChange={(e) =>
            setCliente({
              ...cliente,
              dataNascimento: mascaraData(e.target.value)
            })
          }
        />

        <label>Valor cobrado</label>
        <input
          className="form-control mb-3"
          value={cliente.valor}
          onChange={(e) =>
            setCliente({
              ...cliente,
              valor: mascaraValor(e.target.value)
            })
          }
        />

        <button
          className="btn"
          style={{
            backgroundColor: "#1f4d3e",
            color: "white"
          }}
          onClick={confirmarCadastro}
        >
          Cadastrar cliente
        </button>

      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Confirmar cadastro
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          Deseja cadastrar este cliente?

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="success"
            onClick={salvarCliente}
          >
            Confirmar
          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  )

}
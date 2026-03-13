import { syncClientes } from "./syncService"

export type Cliente = {

  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  dataNascimento: string

  status: string
  pago: boolean
  valor?: number

  checklist: {
    nome: string
    recebido: boolean
  }[]

  documentos: {
    id: string
    nome: string
    arquivo?: string
    categoria?: string
    driveId?: string
  }[]

  eventos: {
    data: string
    descricao: string
  }[]

  driveFolderId?: string

}

export function getClientes(): Cliente[] {

  const dados = localStorage.getItem("clientes")

  return dados ? JSON.parse(dados) : []

}

export async function adicionarCliente(cliente: Cliente) {

  const clientes = getClientes()

  clientes.push(cliente)

  localStorage.setItem(
    "clientes",
    JSON.stringify(clientes)
  )

  await syncClientes()

}

export async function atualizarCliente(clienteAtualizado: Cliente) {

  const clientes = getClientes()

  const atualizados = clientes.map((c: Cliente) =>
    c.id === clienteAtualizado.id
      ? clienteAtualizado
      : c
  )

  localStorage.setItem(
    "clientes",
    JSON.stringify(atualizados)
  )

  await syncClientes()

}

export async function excluirCliente(id: string) {

  const clientes = getClientes()

  const filtrados = clientes.filter(
    (c: Cliente) => c.id !== id
  )

  localStorage.setItem(
    "clientes",
    JSON.stringify(filtrados)
  )

  await syncClientes()

}
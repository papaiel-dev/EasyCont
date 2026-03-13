export type EventoCliente = {
  data: string
  descricao: string
}

export type Documento = {
  id: string
  nome: string
  arquivo: string
}

export type ChecklistDocumento = {
  nome: string
  recebido: boolean
}

export type Cliente = {

  id: string
  nome: string
  cpf: string
  telefone: string
  email: string
  dataNascimento: string

  status: string
  pago: boolean
  valor: number

  documentos: Documento[]
  eventos: EventoCliente[]

  checklist: ChecklistDocumento[]

}

const STORAGE_KEY = "clientes"

function checklistPadrao(): ChecklistDocumento[] {

  return [
    { nome: "Informe de rendimentos", recebido: false },
    { nome: "Informe bancário", recebido: false },
    { nome: "Informe de investimentos", recebido: false },
    { nome: "Recibos médicos", recebido: false },
    { nome: "Declaração anterior", recebido: false }
  ]

}

export function getClientes(): Cliente[] {

  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) return []

  const clientes = JSON.parse(data)

  return clientes.map((c: Cliente) => {

    if (!c.checklist) {
      c.checklist = checklistPadrao()
    }

    return c

  })

}

export function salvarClientes(clientes: Cliente[]) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(clientes)
  )

}

export function adicionarCliente(cliente: Cliente) {

  const clientes = getClientes()

  cliente.checklist = checklistPadrao()

  cliente.eventos = [
    {
      data: new Date().toLocaleString(),
      descricao: "Cliente criado"
    }
  ]

  clientes.push(cliente)

  salvarClientes(clientes)

}

export function atualizarCliente(clienteAtualizado: Cliente) {

  const clientes = getClientes()

  const index = clientes.findIndex(
    c => c.id === clienteAtualizado.id
  )

  clientes[index] = clienteAtualizado

  salvarClientes(clientes)

}
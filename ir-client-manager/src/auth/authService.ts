import { emailsAutorizados } from "../config/autorizados"

export function salvarUsuario(usuario: any) {

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  )

}

export function obterUsuario() {

  const usuario = localStorage.getItem("usuario")

  if (!usuario) return null

  return JSON.parse(usuario)

}

export function logout() {

  localStorage.removeItem("usuario")

  window.location.reload()

}

export function usuarioAutorizado(email: string) {

  return emailsAutorizados.includes(email)

}
export function salvarUsuario(usuario: any) {

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  )

}

export function obterUsuario() {

  const dados = localStorage.getItem("usuario")

  if (!dados) return null

  return JSON.parse(dados)

}

export function usuarioAutorizado(email: string) {

  const autorizados = [
    "89oliveirarafael@gmail.com", "mariane.pintenho@gmail.com", "mariane.pintenho.contabil@gmail.com"
  ]

  return autorizados.includes(email)

}

export function logout() {

  localStorage.removeItem("usuario")

}
import { useEffect, useRef } from "react"
import { salvarUsuario, usuarioAutorizado } from "./authService"

declare global {
  interface Window {
    google: any
  }
}

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {

  const iniciou = useRef(false)

  useEffect(() => {

    if (iniciou.current) return
    iniciou.current = true

    const google = window.google
    if (!google) return

    google.accounts.id.initialize({
      client_id: "102975317800-cbg1tke8f9lubqh2es5laqol57h5l52q.apps.googleusercontent.com",
      callback: handleLogin
    })

    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: 250
      }
    )

  }, [])

  function handleLogin(response: any) {

    const dados = JSON.parse(
      atob(response.credential.split(".")[1])
    )

    const usuario = {
      nome: dados.name,
      email: dados.email,
      foto: dados.picture
    }

    if (!usuarioAutorizado(usuario.email)) {

      alert("Seu email não está autorizado a usar o EasyCont.")
      return

    }

    salvarUsuario(usuario)

    onLogin()

  }

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        background: "#f5f7f6"
      }}
    >

      <h2 style={{ color: "#1f4d3e" }}>
        EasyCont
      </h2>

      <p>Gerenciamento de clientes IR</p>

      <div id="googleButton"></div>

    </div>

  )

}
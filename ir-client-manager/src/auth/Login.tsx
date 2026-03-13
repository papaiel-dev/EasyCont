import { useEffect } from "react"
import { salvarUsuario, usuarioAutorizado } from "./authService"
import { setAccessToken } from "../services/driveService"

declare global {
  interface Window {
    google: any
  }
}

export default function Login({ onLogin }: any) {

  useEffect(() => {

    const google = window.google

    if (!google) return

    google.accounts.id.initialize({
      client_id: "102975317800-cbg1tke8f9lubqh2es5laqol57h5l52q.apps.googleusercontent.com",
      callback: handleCredentialResponse
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

  function handleCredentialResponse(response: any) {

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

    solicitarPermissaoDrive(usuario)

  }

  function solicitarPermissaoDrive(usuario: any) {

    const client = window.google.accounts.oauth2.initTokenClient({

      client_id: "102975317800-cbg1tke8f9lubqh2es5laqol57h5l52q.apps.googleusercontent.com",

      scope: "https://www.googleapis.com/auth/drive.file",

      callback: (tokenResponse: any) => {

        setAccessToken(tokenResponse.access_token)

        salvarUsuario(usuario)

        onLogin()

      }

    })

    client.requestAccessToken()

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

      <h2
        style={{
          fontWeight: "bold",
          color: "#1f4d3e"
        }}
      >
        EasyCont
      </h2>

      <p
        style={{
          color: "#555"
        }}
      >
        Gerenciamento de clientes IR
      </p>

      <div id="googleButton"></div>

    </div>

  )

}
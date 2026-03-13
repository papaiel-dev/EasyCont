import { Navigate } from "react-router-dom"
import { obterUsuario } from "./authService"

export default function ProtectedRoute({ children }: any) {

  const usuario = obterUsuario()

  if (!usuario) {

    return <Navigate to="/" replace />

  }

  return children

}
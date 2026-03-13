import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

/* aplica tema antes de renderizar */

const temaSalvo = localStorage.getItem("tema")

if (temaSalvo === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark")
} else {
  document.documentElement.setAttribute("data-bs-theme", "light")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
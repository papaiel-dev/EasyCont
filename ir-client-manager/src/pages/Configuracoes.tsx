import { useEffect, useState } from "react"

export default function Configuracoes() {

  const [tema, setTema] = useState("light")

  useEffect(() => {

    const temaSalvo = localStorage.getItem("tema") || "light"

    setTema(temaSalvo)

    document.documentElement.setAttribute(
      "data-bs-theme",
      temaSalvo
    )

  }, [])

  function alternarTema() {

    const novoTema = tema === "light" ? "dark" : "light"

    setTema(novoTema)

    localStorage.setItem("tema", novoTema)

    document.documentElement.setAttribute(
      "data-bs-theme",
      novoTema
    )

  }

  return (

    <div>

      <h2 className="mb-4">
        Configurações
      </h2>

      <div className="card p-4">

        <h5 className="mb-4">
          Tema do sistema
        </h5>

        <div
          className="d-flex align-items-center"
          style={{ gap: "12px" }}
        >

          <span>☀️</span>

          <div
            onClick={alternarTema}
            style={{
              width: "60px",
              height: "30px",
              background: tema === "dark"
                ? "#1f4d3e"
                : "#ccc",
              borderRadius: "20px",
              position: "relative",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >

            <div
              style={{
                width: "24px",
                height: "24px",
                background: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "3px",
                left: tema === "dark"
                  ? "33px"
                  : "3px",
                transition: "0.2s"
              }}
            />

          </div>

          <span>🌙</span>

        </div>

        <p className="mt-3 text-muted">

          Tema atual: <strong>{tema}</strong>

        </p>

      </div>

    </div>

  )

}
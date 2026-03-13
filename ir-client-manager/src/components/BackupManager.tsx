import { useEffect, useRef } from "react"

import {
  exportarBackup,
  importarBackup,
  obterUltimoBackup,
  autoBackup
} from "../services/backupService"

export default function BackupManager() {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {

    const ultimoBackup = obterUltimoBackup()

    if (!ultimoBackup) {

      const desejaImportar = confirm(
        "Deseja importar um backup antes de começar?"
      )

      if (desejaImportar) {
        inputRef.current?.click()
      }

    }

    const intervalo = setInterval(() => {

      autoBackup()

      console.log("AutoBackup realizado")

    }, 600000)

    function avisoSaida(event: BeforeUnloadEvent) {

      const ultimo = obterUltimoBackup()

      if (!ultimo) return

      const diff =
        new Date().getTime() -
        new Date(ultimo).getTime()

      const horas = diff / 1000 / 60 / 60

      if (horas > 6) {

        event.preventDefault()

        event.returnValue =
          "Você não fez backup recentemente."

      }

    }

    window.addEventListener(
      "beforeunload",
      avisoSaida
    )

    return () => {

      clearInterval(intervalo)

      window.removeEventListener(
        "beforeunload",
        avisoSaida
      )

    }

  }, [])

  function handleImport(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0]

    if (!file) return

    importarBackup(file, () => {

      alert("Backup importado com sucesso!")

      window.location.reload()

    })

  }

  function mostrarUltimoBackup() {

    const ultimo = obterUltimoBackup()

    if (!ultimo) return "Nenhum backup"

    const data = new Date(ultimo)

    return data.toLocaleString("pt-BR")

  }

  return (

    <div className="card p-4">

      <h4 className="mb-3">
        Backup do sistema
      </h4>

      <p className="text-muted">

        Último backup: {mostrarUltimoBackup()}

      </p>

      <button
        className="btn btn-dark me-2"
        onClick={exportarBackup}
      >
        Exportar backup
      </button>

      <button
        className="btn btn-outline-dark"
        onClick={() =>
          inputRef.current?.click()
        }
      >
        Importar backup
      </button>

      <input
        type="file"
        accept=".json"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />

    </div>

  )

}
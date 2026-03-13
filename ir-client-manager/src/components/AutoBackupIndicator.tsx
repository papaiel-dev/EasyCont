import { useEffect, useState } from "react"

export default function AutoBackupIndicator() {

  const [ultimaSync, setUltimaSync] = useState<string | null>(null)

  useEffect(() => {

    function atualizar() {

      const autoBackup = localStorage.getItem("easycont-autobackup")

      if (!autoBackup) return

      const dados = JSON.parse(autoBackup)

      if (dados.dataBackup) {

        const data = new Date(dados.dataBackup)

        setUltimaSync(
          data.toLocaleTimeString("pt-BR")
        )

      }

    }

    atualizar()

    const intervalo = setInterval(
      atualizar,
      10000
    )

    return () => clearInterval(intervalo)

  }, [])

  return (

    <div
      className="d-flex align-items-center mb-3"
      style={{
        fontSize: "13px",
        color: "#6c757d",
        gap: "8px"
      }}
    >

      <span>💾 AutoBackup ativo</span>

      {ultimaSync && (

        <span>

          ✔ Última sincronização: {ultimaSync}

        </span>

      )}

    </div>

  )

}
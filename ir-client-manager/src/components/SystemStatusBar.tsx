import { useEffect, useState } from "react"

export default function SystemStatusBar() {

  const [ultimoBackup, setUltimoBackup] = useState<string | null>(null)

  useEffect(() => {

    const backup = localStorage.getItem("ultimoBackup")

    if (backup) {

      setUltimoBackup(backup)

    }

  }, [])

  return (

    <div
      style={{
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}
    >

      <span>💾 AutoBackup ativo</span>

      {ultimoBackup && (

        <span
          style={{
            opacity: 0.8
          }}
        >
          • Último backup: {ultimoBackup}
        </span>

      )}

    </div>

  )

}
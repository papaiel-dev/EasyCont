export function exportarBackup() {

  const clientes = localStorage.getItem("clientes")

  const dados = {
    clientes: clientes ? JSON.parse(clientes) : [],
    dataBackup: new Date().toISOString()
  }

  const blob = new Blob(
    [JSON.stringify(dados, null, 2)],
    { type: "application/json" }
  )

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")

  const data = new Date()

  const nomeArquivo =
    "easycont-backup-" +
    data.toISOString().slice(0, 10) +
    ".json"

  a.href = url
  a.download = nomeArquivo

  a.click()

  localStorage.setItem(
    "ultimoBackup",
    new Date().toISOString()
  )

}

export function autoBackup() {

  const clientes = localStorage.getItem("clientes")

  const dados = {
    clientes: clientes ? JSON.parse(clientes) : [],
    dataBackup: new Date().toISOString()
  }

  localStorage.setItem(
    "easycont-autobackup",
    JSON.stringify(dados)
  )

}

export function importarBackup(
  file: File,
  callback?: () => void
) {

  const reader = new FileReader()

  reader.onload = function(event: any) {

    const dados = JSON.parse(event.target.result)

    if (dados.clientes) {

      localStorage.setItem(
        "clientes",
        JSON.stringify(dados.clientes)
      )

    }

    localStorage.setItem(
      "ultimoBackup",
      new Date().toISOString()
    )

    if (callback) callback()

  }

  reader.readAsText(file)

}

export function obterUltimoBackup() {

  return localStorage.getItem("ultimoBackup")

}
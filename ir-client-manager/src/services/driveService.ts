let accessToken: string | null =
  localStorage.getItem("drive_token")

export function setAccessToken(token: string) {

  accessToken = token

  localStorage.setItem("drive_token", token)

}

export function getAccessToken() {

  return accessToken

}

const API = "https://www.googleapis.com/drive/v3"

async function driveRequest(
  url: string,
  options: any = {}
) {

  if (!accessToken) {

    console.warn("Token de acesso não definido")

    return null

  }

  const res = await fetch(`${API}/${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  })

  return res.json()

}

export async function inicializarDrive() {

  console.log("Drive inicializado")

}

export async function buscarPasta(nome: string) {

  const query =
    `name='${nome}' and mimeType='application/vnd.google-apps.folder' and trashed=false`

  const data = await driveRequest(
    `files?q=${encodeURIComponent(query)}&fields=files(id,name)`
  )

  return data?.files?.[0] || null

}

export async function criarPasta(nome: string) {

  return await driveRequest("files", {
    method: "POST",
    body: JSON.stringify({
      name: nome,
      mimeType: "application/vnd.google-apps.folder"
    })
  })

}

export async function garantirPastaCliente(nomeCliente: string) {

  let pastaClientes = await buscarPasta("Clientes")

  if (!pastaClientes) {

    pastaClientes = await criarPasta("Clientes")

  }

  let pastaCliente = await buscarPasta(nomeCliente)

  if (!pastaCliente) {

    pastaCliente = await driveRequest("files", {
      method: "POST",
      body: JSON.stringify({
        name: nomeCliente,
        mimeType: "application/vnd.google-apps.folder",
        parents: [pastaClientes.id]
      })
    })

  }

  return pastaCliente

}

export async function uploadArquivoDrive(
  file: File,
  pastaId: string
) {

  const metadata = {
    name: file.name,
    parents: [pastaId]
  }

  const form = new FormData()

  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json"
    })
  )

  form.append("file", file)

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: form
    }
  )

  return res.json()

}

export async function deletarArquivoDrive(fileId: string) {

  await fetch(`${API}/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

}

export async function deletarPastaDrive(pastaId: string) {

  await deletarArquivoDrive(pastaId)

}

export async function baixarBackup() {

  const query =
    "name='easycont_backup.json' and trashed=false"

  const lista = await driveRequest(
    `files?q=${encodeURIComponent(query)}&fields=files(id,name)`
  )

  const arquivo = lista?.files?.[0]

  if (!arquivo) return null

  const res = await fetch(
    `${API}/files/${arquivo.id}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return res.json()

}

export async function salvarBackupDrive(clientes: any[]) {

  const conteudo = JSON.stringify(clientes)

  const query =
    "name='easycont_backup.json' and trashed=false"

  const lista = await driveRequest(
    `files?q=${encodeURIComponent(query)}&fields=files(id,name)`
  )

  const arquivo = lista?.files?.[0]

  if (arquivo) {

    await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${arquivo.id}?uploadType=media`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: conteudo
      }
    )

  } else {

    await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: conteudo
      }
    )

  }

}
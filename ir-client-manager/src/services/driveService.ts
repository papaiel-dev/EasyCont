let accessToken: string | null = null

let pastaClientesId: string | null = null
let pastaBackupsId: string | null = null

export function setAccessToken(token: string) {

  accessToken = token

}

export function getUltimoBackup() {

  return localStorage.getItem("ultimoBackup")

}

function registrarBackup() {

  const agora = new Date().toISOString()

  localStorage.setItem("ultimoBackup", agora)

  window.dispatchEvent(
    new Event("backup-realizado")
  )

}

export async function deletarArquivoDrive(fileId: string) {

  try {

    await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

  } catch (error) {

    console.error("Erro ao deletar arquivo no Drive:", error)

  }

}

export async function deletarPastaDrive(folderId: string) {

  try {

    await fetch(
      `https://www.googleapis.com/drive/v3/files/${folderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

  } catch (error) {

    console.error("Erro ao deletar pasta no Drive:", error)

  }

}

async function driveRequest(url: string, options: any = {}) {

  const res = await fetch(
    "https://www.googleapis.com/drive/v3/" + url,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  )

  return res.json()

}

async function buscarPasta(nome: string, parentId?: string) {

  let query =
    `name='${nome}' and mimeType='application/vnd.google-apps.folder' and trashed=false`

  if (parentId) {
    query += ` and '${parentId}' in parents`
  }

  const data = await driveRequest(
    `files?q=${encodeURIComponent(query)}`
  )

  return data.files?.[0]

}

async function criarPasta(nome: string, parentId?: string) {

  const metadata: any = {
    name: nome,
    mimeType: "application/vnd.google-apps.folder"
  }

  if (parentId) metadata.parents = [parentId]

  const res = await fetch(
    "https://www.googleapis.com/drive/v3/files",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(metadata)
    }
  )

  return res.json()

}

async function garantirPasta(nome: string, parentId?: string) {

  const pasta = await buscarPasta(nome, parentId)

  if (pasta) return pasta

  return criarPasta(nome, parentId)

}

export async function inicializarDrive() {

  const raiz = await garantirPasta("EasyCont")

  const clientes = await garantirPasta("clientes", raiz.id)

  const backups = await garantirPasta("backups", raiz.id)

  pastaClientesId = clientes.id
  pastaBackupsId = backups.id

}

function slug(nome: string) {

  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")

}

export async function garantirPastaCliente(cliente: any) {

  if (cliente.driveFolderId) {

    return { id: cliente.driveFolderId }

  }

  if (!pastaClientesId) return null

  const pasta = await garantirPasta(
    slug(cliente.nome),
    pastaClientesId
  )

  return pasta

}

export async function uploadArquivoDrive(file: File, pastaId: string) {

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

async function buscarArquivo(nome: string, parentId: string) {

  const query =
    `name='${nome}' and '${parentId}' in parents and trashed=false`

  const data = await driveRequest(
    `files?q=${encodeURIComponent(query)}`
  )

  return data.files?.[0]

}

export async function baixarBackup() {

  if (!pastaBackupsId) return null

  const arquivo = await buscarArquivo(
    "easycont-backup.json",
    pastaBackupsId
  )

  if (!arquivo) return null

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${arquivo.id}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return res.json()

}

export async function salvarBackupDrive(clientes: any) {

  if (!pastaBackupsId) return

  const blob = new Blob(
    [JSON.stringify(clientes, null, 2)],
    { type: "application/json" }
  )

  const metadata = {
    name: "easycont-backup.json",
    parents: [pastaBackupsId]
  }

  const form = new FormData()

  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json"
    })
  )

  form.append("file", blob)

  await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: form
    }
  )

  registrarBackup()

}
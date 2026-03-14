let accessToken: string | null = null

export function setAccessToken(token: string) {

  accessToken = token

}

async function garantirTokenDrive(): Promise<string> {

  if (accessToken) return accessToken

  return new Promise<string>((resolve) => {

    const client = window.google.accounts.oauth2.initTokenClient({

      client_id:
        "102975317800-cbg1tke8f9lubqh2es5laqol57h5l52q.apps.googleusercontent.com",

      scope: "https://www.googleapis.com/auth/drive.file",

      callback: (tokenResponse: any) => {

        accessToken = tokenResponse.access_token

        resolve(accessToken as string)

      }

    })

    client.requestAccessToken()

  })

}

async function driveRequest(url: string, options: any = {}) {

  const token = await garantirTokenDrive()

  return fetch(url, {

    ...options,

    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }

  })

}

export async function inicializarDrive() {

  await garantirTokenDrive()

  console.log("Drive inicializado")

}

async function buscarArquivo(nome: string) {

  const query =
    `name='${nome}' and trashed=false`

  const url =
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`

  const res = await driveRequest(url)

  const data = await res.json()

  return data.files?.[0] || null

}

export async function salvarBackupDrive(clientes: any[]) {

  const arquivo = await buscarArquivo("easycont_backup.json")

  const conteudo = JSON.stringify(clientes)

  if (!arquivo) {

    await driveRequest(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: conteudo
      }
    )

  } else {

    await driveRequest(
      `https://www.googleapis.com/upload/drive/v3/files/${arquivo.id}?uploadType=media`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: conteudo
      }
    )

  }

}

export async function baixarBackup() {

  const arquivo = await buscarArquivo("easycont_backup.json")

  if (!arquivo) return null

  const res = await driveRequest(
    `https://www.googleapis.com/drive/v3/files/${arquivo.id}?alt=media`
  )

  return res.json()

}

async function buscarPasta(nome: string) {

  const query =
    `name='${nome}' and mimeType='application/vnd.google-apps.folder' and trashed=false`

  const url =
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`

  const res = await driveRequest(url)

  const data = await res.json()

  return data.files?.[0] || null

}

async function criarPasta(nome: string, parentId?: string) {

  const metadata: any = {

    name: nome,

    mimeType: "application/vnd.google-apps.folder"

  }

  if (parentId) {

    metadata.parents = [parentId]

  }

  const res = await driveRequest(

    "https://www.googleapis.com/drive/v3/files",

    {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(metadata)

    }

  )

  return res.json()

}

export async function garantirPastaCliente(nomeCliente: string) {

  let pastaClientes = await buscarPasta("Clientes")

  if (!pastaClientes) {

    pastaClientes = await criarPasta("Clientes")

  }

  let pastaCliente = await buscarPasta(nomeCliente)

  if (!pastaCliente) {

    pastaCliente = await criarPasta(
      nomeCliente,
      pastaClientes.id
    )

  }

  return pastaCliente

}

export async function uploadArquivoDrive(

  arquivo: File,

  pastaId: string

) {

  const metadata = {

    name: arquivo.name,

    parents: [pastaId]

  }

  const form = new FormData()

  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json"
    })
  )

  form.append("file", arquivo)

  const token = await garantirTokenDrive()

  const res = await fetch(

    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",

    {

      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`
      },

      body: form

    }

  )

  return res.json()

}

export async function deletarArquivoDrive(fileId: string) {

  await driveRequest(

    `https://www.googleapis.com/drive/v3/files/${fileId}`,

    {
      method: "DELETE"
    }

  )

}

export async function deletarPastaDrive(folderId: string) {

  await driveRequest(

    `https://www.googleapis.com/drive/v3/files/${folderId}`,

    {
      method: "DELETE"
    }

  )

}
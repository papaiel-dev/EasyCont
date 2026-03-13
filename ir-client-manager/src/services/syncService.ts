import { salvarBackupDrive } from "./driveService"

export async function syncClientes() {

  try {

    const clientes = JSON.parse(
      localStorage.getItem("clientes") || "[]"
    )

    await salvarBackupDrive(clientes)

  } catch (error) {

    console.error("Erro ao sincronizar com Drive:", error)

  }

}
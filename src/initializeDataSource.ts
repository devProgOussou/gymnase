import { AppDataSource } from "./data-source"

export async function initializeDataSource() {
  try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.error("Error during Data Source initialization:", err)
    process.exit(1)
  }
}

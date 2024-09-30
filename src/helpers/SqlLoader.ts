import { readFileSync } from "fs"
import { join } from "path"

class SqlLoader {
  static getQuery(dir: string, fileName: string): string {
    const filePath = join(dir, fileName)
    return readFileSync(filePath, "utf-8")
  }
}

export { SqlLoader }

import Express from "express"
import routerDex from "./inspector"

if ( !process.argv[1] ) {
  console.error("pass a import file")
  process.exit(1)
}

const clientPackageJson = require(`${process.cwd()}/package.json`)
const _module: string = process.argv[1]
const key: string = process.argv[2]

if ( key ) {
  process.argv.splice(2, 1)
}

try {
  const server: Express.Application = key === "default" ? require(_module) : require(_module)[key]

  // Inspecting...
  routerDex(server, clientPackageJson?.name)

} catch (e) {
  console.error("not a valid import")
}

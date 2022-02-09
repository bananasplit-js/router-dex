/**
 *  Router Dex Script
 *  @module .
 *
 *  @description allows to execute router dex directly via package script
 *  @author diegoulloao
 *
 */
require('module-alias/register')

import Express from "express"
import chalk from "chalk"

import routerDex from "@root/inspector"

// Exit if path from where to import the express server is not valid
if ( !process.argv[1] ) {
  console.error(chalk.bgRed.black("pass a import file"))
  process.exit(1)
}

// Local package.json
const clientPackageJson = require(`${process.cwd()}/package.json`)

// Module absolute path where to import the express server
const _module: string = process.argv[1]

// If module export the server as default or specific name
const importName: string = process.argv[2]

// Remove import name from process arguments
process.argv.splice(2, 1)

try {
  // Import the express server dinamycally
  const server: Express.Application = (importName === "default")
    ? require(_module)
    : require(_module)[importName]

  // Inspect routes
  routerDex(server, clientPackageJson.name)

} catch (e) {
  console.error(chalk.bgRed.black("not a valid import"))
}

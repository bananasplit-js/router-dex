/**
 *
 *  Router Dex Script
 *  @module .
 *
 *  @description allows to execute router dex directly via package script
 *  @author diegoulloao
 *
 */
require("module-alias/register")


import Express from "express"
import chalk from "chalk"

import routerDex from "@root/inspector"


// ts-node adds so many unnecessary parameters, we delete them
if ( /\.bin\/ts-node/.test(process.argv[1]) ) {
  process.argv.splice(0, process.argv.findIndex((a: string) => /router-dex/.test(a)))
}

// Exit if path from where to import the express server is not valid
if ( !process.argv[1] ) {
  console.log(chalk.bgRed.black(" Must specify a module to import. "), "\n")
  process.exit(1)
}

// Local package.json
const clientPackageJson: any = require(`${process.cwd()}/package.json`)

// Module absolute path where to import the express server
const _module: string = process.argv[1]

// If module export the server as default or specific name
const namespace: string = process.argv[2]

// Remove import name from process arguments
process.argv.splice(2, 1)

try {
  // Import the express server dinamycally
  const server: Express.Application = (namespace === "default")
    ? require(_module)
    : require(_module)[namespace]

  // Inspect routes
  routerDex(server, clientPackageJson.name)

} catch (e: any) {
  console.log( chalk.bgRed.black(" Must specify a valid namespace to import. "), "\n")
  console.log(chalk.red("If the module exports the application by default then use \"default\" right after the module path."), "\n")
}

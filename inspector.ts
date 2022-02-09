/**
 * 
 *  Router Dex
 *  @module .
 * 
 *  @description provides a function to inspect all server routes manually
 *  @author diegoulloao
 * 
 */


import chalk from "chalk"

// Helpers
import {
  combineStacks,
  generateTable,
  tablerizeRoutes,
  getRoutesFromStacks
} from "./lib/helpers"

// Types
import Express from "express"
import { Table as CliTable3 } from "cli-table3"

// This avoid no types declaration for this package
const sortPaths: any = require("sort-route-paths")


const routerDex = (server: Express.Application, appName?: string) => {
  // Group filter array passed as params
  const groupsParamArray: string[] = process.argv.slice(2)

  // First message spacing
  console.log("")

  if ( !groupsParamArray.length ) {
    // Message when inspecting all routes
    console.log(chalk.yellow("Inspecting all routes..."), "\n")

  } else {
    // Message when inspecting groups of routes
    const headMessageArray: string[] = [
      `Inspecting routes that matches with`,
      groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and ") + "..."
    ]

    console.log(chalk.yellow(headMessageArray.join(" ")), "\n")
  }

  // Checks if express version >= 4 or exit
  if ( !server._router?.stack ) {
    console.log("")
    console.log(chalk.bgRed.black(" You must use a express version >= 4 "), "\n")
    process.exit()
  }

  // Route Stacks from server application
  const stacks: any[] = server._router.stack.reduce(combineStacks, [])

  // Routes inspect and sorting
  const routes: any[] = getRoutesFromStacks(stacks)
  const sortedRoutes: any = sortPaths(routes, (r: any) => r.path)

  // Filtered routes collection if filter defined
  let filteredRoutes: any[] | undefined

  if ( groupsParamArray.length ) {
    filteredRoutes = sortedRoutes.filter(
      (r: any) => new RegExp(`^\/(${groupsParamArray.join("|")})(\/|$)`).test(r.path)
    )
  }

  // Colorizes all routes data parts
  const tablerizedRoutes: any[] = tablerizeRoutes(filteredRoutes || sortedRoutes)

  // Cli table generated ready to fill
  const table: CliTable3 = generateTable()

  // Show application name if defined in package.json
  if ( appName && appName.length > 1 ) {
    console.log(
      chalk.bgYellow.black.bold(
        ` ${appName.charAt(0).toUpperCase() + appName.substring(1)} `
      )
    )
  }

  // Push routes and an extra space to the table
  table.push(...tablerizedRoutes, Array(3).fill(""))

  // Log the table
  console.log(table.toString(), "\n")

  // Check if there is anonymous functions used as middlewares
  const hasAnonymous: boolean = (
    (filteredRoutes || sortedRoutes).some((r: any) => /<anonymous>/.test(r.middlewares))
  )

  if ( hasAnonymous ) {
    console.log(
      chalk.red.bold(
        "* Do not use anonymous functions as middlewares, store them in a constant instead.\n"
      )
    )
  }

  // Success message
  if ( !filteredRoutes ) {
    console.log(
      chalk.green(
        `${chalk.bold(`${routes.length} total`)} route${routes.length > 1 ? "s" : ""} available in your application 🚀`
      ),
      "\n"
    )

  } else {
    // Filtered routes total
    const totalFiltered: number = filteredRoutes.length

    // Message as array
    const filteredSuccessMessage: string[] = [
      `${chalk.bold(`${totalFiltered} of ${routes.length}`)} total route${routes.length > 1 ? "s" : ""}`,
      `that matches with ${chalk.bold(groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and "))}`,
      `${totalFiltered ? "🚀" : ""}`
    ]

    console.log(chalk.green(filteredSuccessMessage.join(" ")), "\n")
  }
}

export default routerDex

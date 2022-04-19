/**
 *
 *  Router Dex
 *  @module .
 * 
 *  @description provides functions to inspect all server routes manually
 *  @author diegoulloao
 * 
 */
import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}`,
  "@src": `${__dirname}/src`,
  "@helpers": `${__dirname}/src/helpers`,
  "@types": `${__dirname}/src/types`
})


import chalk from "chalk"

// Helpers
import {
  combineStacks,
  generateTable,
  tablerizeRoutes,
  getRoutesFromStacks
} from "@helpers"

// Types
import { Table as CliTable3 } from "cli-table3"
import { IRoutesTypes, DexRoute, Express } from "@types"

// This avoid no "types declaration" warning for this package
const sortPaths: any = require("sort-route-paths")


/**
 *
 *  Get All Routes
 *  @description gets all types of routes from the server
 *
 *  @param { Express.Application } server
 *  @returns { IRoutesTypes }
 *
 */
const getAllRoutes = (server: Express): IRoutesTypes => {

  // First message spacing
  console.log("")

  // Filter group passed as params in array form
  const groupsParamArray: string[] = process.argv.slice(2)

  if ( groupsParamArray.length ) {
    // Message when inspecting groups of routes
    const headMessageArray: string[] = [
      `Inspecting routes that matches with`,
      groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and ") + "..."
    ]

    console.log(chalk.white(headMessageArray.join(" ")), "\n")
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
  const routes: DexRoute[] = getRoutesFromStacks(stacks)
  const sortedRoutes: DexRoute[] = sortPaths(routes, (r: DexRoute) => r.path)

  // Filtered routes collection if filter defined
  let filteredRoutes: DexRoute[] | undefined

  if ( groupsParamArray.length ) {
    filteredRoutes = sortedRoutes.filter(
      (r: DexRoute) => new RegExp(`^\/(${groupsParamArray.join("|")})(\/|$)`).test(r.path)
    )
  }

  return { routes, sortedRoutes, filteredRoutes }

}


/**
 *
 *  Router Dex
 *  @description inspects all express server routes
 *
 *  @param { Express.Application } server
 *  @param { string? } appName
 *
 *  @returns { void }
 *
 */
const routerDex = (server: Express, appName?: string): void => {

  // Gets all routes types
  const { routes, sortedRoutes, filteredRoutes }: IRoutesTypes = getAllRoutes(server)

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
  console.log(table.toString())

  // Check if there is anonymous functions used as middlewares
  const hasAnonymous: boolean = (
    (filteredRoutes || sortedRoutes).some((r: DexRoute) => /<anonymous>/.test(r.middlewares.join(", ")))
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
        `${chalk.bold("total:")} ${routes.length} route${routes.length > 1 ? "s" : ""} available in your application 🚀`
      ),
      "\n"
    )

  } else {
    // Filtered routes total
    const totalFiltered: number = filteredRoutes.length

    // Filter group passed as params in array form
    const groupsParamArray: string[] = process.argv.slice(2)

    // Message as array
    const filteredSuccessMessage: string[] = [
      `${chalk.bold("total:")} ${totalFiltered} of ${routes.length} route${routes.length > 1 ? "s" : ""}`,
      `that matches with ${chalk.bold(groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and "))}`,
      `${totalFiltered ? "🚀" : ""}`
    ]

    console.log(chalk.green(filteredSuccessMessage.join(" ")), "\n")
  }

}

export default routerDex
export { getAllRoutes }

export type { IRoutesTypes as DexRoutesTypes, DexRoute }

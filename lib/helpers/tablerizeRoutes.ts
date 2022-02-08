import chalk from "chalk"
import colorizeRouteMethod from "./colorizeRouteMethod"

/**
 * 
 *  Colorizes all routes data in a nice way
 * 
 *  @param { any[] } routes
 *  @returns { any[] }
 * 
 */
const tablerizeRoutes = ( routes: any[] ): any[] => {

  const sortedRoutes: any[] = []
  const r: RegExp = /^\/[a-z0-9]*\/?/
  const i: RegExp = /\//g

  routes.reduce((p: any, n: any): any => {
    // Highlights each :param with chalk
    const highlightedParamsPath: string = n.path.replace(/:[a-z0-9]+/g, chalk.cyan.bold("$&"))

    // Changes <anonymous> by anonymous
    const cleanedMiddlewareString: string = n.middlewares.replace(/^<anonymous>$/g, chalk.red("anonymous"))

    // Add section label if previous and next routes have different base path
    if ( p?.path.match(r)[0].replace(i, "") !== n.path.match(r)[0].replace(i, "") ) {
      // Only add empty row when there is valid previous route
      if (p) sortedRoutes.push(Array(3).fill(""))

        const section: string = n.path.match(r)[0].replace(i, "") || "general"
        const sectionCapitalized: string = section.charAt(0).toUpperCase() + section.substring(1)

        // Push empty row
        sortedRoutes.push(["", chalk.gray(sectionCapitalized), ""])
    }

    // Push route detail row
    sortedRoutes.push([
      colorizeRouteMethod(n.method),
      chalk.white(highlightedParamsPath),
      chalk.gray(cleanedMiddlewareString)
    ])

    return n

  }, null)

  return sortedRoutes	

}

export default tablerizeRoutes

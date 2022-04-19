/**
 *
 *  Helper: Get Routes from Stacks
 *  @module ./src/helpers/getRoutesFromStacks
 *
 *  @description collects all the routes from each combined stack
 *  @author diegoulloao
 *
 */
import path from "path"


/**
 * 
 *  Get routes from merged stacks
 * 
 *  @param { any[] } stacks
 *  @returns { any[] }
 * 
 */
const getRoutesFromStacks = ( stacks: any[] ): any[] => {

  // Routes accumulator
  const routes: any[] = []

  if ( stacks ) {
    for ( const stack of stacks ) {
      if ( stack.route ) {
        const routeLogged: { [index: string]: any } = {}

        for ( const route of stack.route.stack ) {
          // Extract route method
          const method: string | null = route.method ? route.method.toUpperCase() : null

          if ( method && !routeLogged[method] ) {
            // Route path parts
            const fullPathArray: string[] = [stack.routerPath, stack.route.path, route.path]
            const middlewares: string[] = stack.middlewares || []

            // Convert path parts to a entire string
            let stackPath: string = fullPathArray
              .filter((s: string) => !!s)
              .join("")
              .replace("//", "/")

            // Delete end slash only if path is not just /
            if ( stackPath !== "/" ) {
              stackPath = stackPath.replace(/\/$/, "")
            }

            routes.push({
              path: stackPath,
              method,
              middlewares
            })

            // Avoid duplicated routes during iteration
            routeLogged[method] = true
          }
        }
      }
    }
  }

  return routes

}

export default getRoutesFromStacks

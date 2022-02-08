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
            const middlewaresString: string = stack.middlewares ? stack.middlewares.join(", ") : ""

            // Convert path parts to a entire string
            const stackPath: string = path.resolve(
              fullPathArray.filter((s: string) => !!s).join("")
            )

            routes.push({
              path: stackPath,
              method,
              middlewares: middlewaresString
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

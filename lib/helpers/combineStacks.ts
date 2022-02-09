/**
 *
 *  Helper: Combine Stacks
 *  @module ./lib/helpers/combineStacks
 *
 *  @description Combines all router stacks into one in a recursive way
 *  @author diegoulloao
 *
 */
import getPathFromRegex from "./getPathFromRegex"


/**
 * 
 *  Reducer Function: Combines all server application stacks in one
 * 
 *  @param { [] } acc
 *  @param { stacks } any
 *
 *  @returns { any[] }
 * 
 */
const combineStacks = ( acc: [], stack: any ): any[] => {

  if ( stack.handle.stack ) {
    // Extract route path from regex
    const routerPath: string = getPathFromRegex(stack.regexp)

    // Collect inner stack adding routePath
    const innerStack: object[] = stack.handle.stack.map((s: any) => {
      // Middlewares collection
      const middlewares: string[] = []

      if ( s.route?.stack ) {
        middlewares.push(...s.route.stack.map((s: any) => s.name))
      }

      return { routerPath, middlewares, ...s }
    })

    // Return accumulated inner stack
    return [...acc, ...innerStack]

  } else if ( stack.route ) {
    // Middlewares collection
    const middlewares: string[] = []

    if ( stack.route.stack ) {
      middlewares.push(...stack.route.stack.map((s: any) => s.name))
    }

    return [...acc, { middlewares, ...stack }]
  }

  // Return accumulated stack
  return [...acc, stack]

}

export default combineStacks

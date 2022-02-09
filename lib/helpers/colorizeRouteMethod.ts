/**
 *
 *  Helper: Colorize Route Method
 *  @module ./lib/helpers/colorizeRouteMethod
 *
 *  @description colorizes each route method with the properly color
 *  @author diegoulloao
 *
 */
import chalk from "chalk"


/**
 * 
 *  Colorizes route method string for nice output
 * 
 *  @param { string } method
 *  @returns { string }
 * 
 */
const colorizeRouteMethod = ( method: string ): string => {

  const colors: { [key: string]: string } = {
    "GET": chalk.bgGreen.black.bold(` ${method} `),
    "POST": chalk.bgBlue.black.bold(` ${method} `),
    "PUT": chalk.bgYellow.black.bold(` ${method} `),
    "DELETE": chalk.bgRed.black.bold(` ${method} `),
    "PATCH": chalk.bgCyan.black.bold(` ${method} `)
  }

  return colors[method] || chalk.white.bold(method)

}

export default colorizeRouteMethod

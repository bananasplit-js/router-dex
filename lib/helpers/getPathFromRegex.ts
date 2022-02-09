/**
 *
 *  Helper: Get Path from Regex
 *  @module ./lib/helpers/getPathFromRegex
 *
 *  @description gets the route path from the regex
 *  @author diegoulloao
 *
 */


/**
 * 
 *  Gets route path from route regex
 * 
 *  @param { RegExp } regexp
 *  @returns { string }
 * 
 */
const getPathFromRegex = ( regexp: RegExp ): string => {

  return regexp
    .toString()
    .replace("/^", "")
    .replace("?(?=\\/|$)/i", "")
    .replace(/\\\//g, "/")

}

export default getPathFromRegex

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

/**
 *
 *  Types
 *  @author diegoulloao
 *
 */
interface DexRoute {
  path: string
  method: string
  middlewares: string[]
}

interface IRoutesTypes {
  routes: DexRoute[]
  sortedRoutes: DexRoute[]
  filteredRoutes: DexRoute[] | undefined
}

type Express = any

export { IRoutesTypes, DexRoute, Express }

import { withInstall } from '@setaria-components/utils'

import HelloWould from './src/hello-would.vue'

export const ScHelloWould = withInstall(HelloWould)
export default ScHelloWould

export * from './src/hello-would'
export type { HelloWouldInstance } from './src/instance'

import { componentSizeMap } from '@setaria-components/constants'

import type { ComponentSize } from '@setaria-components/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}

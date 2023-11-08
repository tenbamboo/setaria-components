import installer from './defaults'
export * from '@setaria-components/components'
export * from '@setaria-components/constants'
export * from '@setaria-components/directives'
export * from '@setaria-components/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'

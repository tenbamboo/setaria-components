import fs from 'fs'
import path from 'path'
import { docRoot } from '@setaria-components/build-utils'
import { BASE_URL } from '../vitepress/constant'

export const languages = fs.readdirSync(path.resolve(__dirname, '../crowdin'))

export const ensureLang = (lang: string) => `${BASE_URL}/${lang}`

export const getLang = (id: string) =>
  path.relative(docRoot, id).split(path.sep)[0]

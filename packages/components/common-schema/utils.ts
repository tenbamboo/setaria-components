/* eslint-disable @typescript-eslint/ban-types */
import { isObject } from '@vue/shared'
export const looseEqual = function (a: any, b: any) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export const callbackExec = function (func: Function, params: any) {
  return new window.Promise((resolve, reject) => {
    if (typeof func === 'function') {
      // eslint-disable-next-line prefer-spread
      const funcExecResult = func.apply(
        null,
        // eslint-disable-next-line prefer-rest-params
        params
      )
      if (funcExecResult.then) {
        funcExecResult
          .then(() => {
            resolve(true)
          })
          .catch((err: any) => {
            reject(err)
          })
      } else {
        funcExecResult ? resolve(true) : reject()
      }
    } else {
      resolve(true)
    }
  })
}

function getItemDefaultValue(schemaItem: any) {
  const val = schemaItem.nullable
  if (val === undefined || val === true) {
    return null
  }
  return ''
}

/**
 * 根据schema定义生成指定初始化对象
 * @param {Object} schema
 * @returns
 */
export function getSchemaDefaultObject(schema: any) {
  const ret: { [key: string]: any } = {}
  Object.keys(schema?.properties).forEach((key) => {
    ret[key] = getItemDefaultValue(schema.properties[key])
  })
  return ret
}

// /**
//  * 根据formSchema生成初始化对象
//  * @param formSchema 对象或数组
//  * @param schema 完整schema对象
//  * @returns {{}}
//  */
// export function getSchemaDefaultObjectByFormSchema(formSchema, schema) {
//   let ret = {}
//   if (formSchema) {
//     if (_.isPlainObject(formSchema)) {
//       ret = getSchemaDefaultObject(formSchema)
//   }
//   return ret
// }

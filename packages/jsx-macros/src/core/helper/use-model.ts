import { customRef, watchSyncEffect, type ModelRef } from 'vue'

type DefineModelOptions<T = Record<string, any>> = {
  default?: any
  get?: (v: T) => any
  set?: (v: T) => any
}
export function useModel<
  M extends PropertyKey,
  T extends Record<string, any>,
  K extends keyof T,
>(props: T, name: K, options?: DefineModelOptions<T[K]>): ModelRef<T[K], M>
export function useModel(
  props: Record<string, any>,
  name: string,
  options: DefineModelOptions = {},
): any {
  const res = customRef((track, trigger) => {
    let localValue: any = options?.default
    let prevEmittedValue: any

    watchSyncEffect(() => {
      const propValue = props[name]
      if (!Object.is(prevEmittedValue, propValue)) {
        localValue = propValue
        trigger()
      }
    })

    return {
      get() {
        track()
        return options.get ? options.get(localValue) : localValue
      },

      set(value) {
        if (Object.is(value, localValue)) return
        localValue = value
        trigger()
        const emittedValue = (prevEmittedValue = options.set
          ? options.set(value)
          : value)
        for (const emit of [props[`onUpdate:${name}`]].flat()) {
          if (typeof emit === 'function') emit(emittedValue)
        }
      },
    }
  })

  const modifiers =
    name === 'modelValue' ? props.modelModifiers : props[`${name}Modifiers`]
  // @ts-expect-error
  res[Symbol.iterator] = () => {
    let i = 0
    return {
      next() {
        if (i < 2) {
          return { value: i++ ? modifiers || {} : res, done: false }
        } else {
          return { done: true }
        }
      },
    }
  }
  return res
}

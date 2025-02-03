# jsxMacros <PackageVersion name="@vue-macros/jsx-macros" />

<StabilityLevel level="experimental" />

A collection of JSX macros.

|     Directive     |    vue3 / vapor    |   react / preact   |       Volar        |
| :---------------: | :----------------: | :----------------: | :----------------: |
| `defineComponent` | :white_check_mark: |        :x:         | :white_check_mark: |
|   `defineModel`   | :white_check_mark: |        :x:         | :white_check_mark: |
|   `defineSlots`   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  `defineExpose`   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|   `defineStyle`   | :white_check_mark: | :white_check_mark: | :white_check_mark: |

## Options

```ts
interface Options {
  /**
   * @default 'vue'
   */
  lib?: 'vue' | 'vue/vapor' | 'react' | 'preact'
}
```

## defineComponent

- Support directly returns JSX.
- Support using `getCurrentInstance()` after an `await` expression.
- Automatically collects used props to the defineComponent's props option.

```vue twoslash
<script lang="tsx">
// @errors: 2307
import { getCurrentInstance, nextTick, Suspense } from 'vue'

const Comp = defineComponent(
  async (props: {
    foo?: string
    bar?: string
    // ^ unused prop will be as a fallthrough attribute.
  }) => {
    await nextTick()
    const i = getCurrentInstance()
    return (
      <div>
        <span>{props.foo}</span>
      </div>
    )
  },
)

export default () => (
  <Suspense>
    <Comp foo="foo" bar="bar" />
  </Suspense>
)
</script>
```

::: details Compiled Code

```tsx
import { getCurrentInstance, withAsyncContext } from 'vue'
defineComponent(
  async (props) => {
    let __temp, __restore
    ;([__temp, __restore] = withAsyncContext(() => nextTick())),
      await __temp,
      __restore()
    const i = getCurrentInstance()
    return () => (
      <div>
        <span>{props.foo}</span>
      </div>
    )
  },
  { props: { foo: null } },
)
```

:::

- The destructured props will be automatically restructured.
- If the prop's default value ends with `!`, the prop will be inferred as required.
- If a rest prop is defined, it will be converted to `useAttrs()`, and the `inheritAttrs` option will default to `false`.

```vue twoslash
<script lang="tsx">
// @errors: 2307 2322
const Comp = defineComponent(
  <T,>({ foo = undefined as T, bar = ''!, ...attrs }) => {
    return (
      <div>
        <span {...attrs}>{foo}</span>
      </div>
    )
  },
)

export default () => <Comp<string> foo={1} bar="bar" />
</script>
```

::: details Compiled Code

```tsx
import { defineComponent } from 'vue'
import { createPropsDefaultProxy } from '/vue-macros/jsx-macros/with-defaults'
defineComponent(
  (_props) => {
    const props = createPropsDefaultProxy(_props, { bar: '' })
    const attrs = useAttrs()
    return () => (
      <div>
        <span {...attrs}>{_props.foo}</span>
      </div>
    )
  },
  { props: { foo: null, bar: { required: true } }, inheritAttrs: false },
)
```

:::

## defineModel

- Doesn't support hyphenated model names.
- Will be inferred as a required prop when the expression ends with `!`.
- The modified model's value can be read synchronously, without needing to `await nextTick()`. [Related issue](https://github.com/vuejs/core/issues/11080)

```vue twoslash
<script lang="tsx">
// @errors: 2307 2322
import { ref } from 'vue'

function Comp() {
  const modelValue = defineModel<string>()!
  return <div>{modelValue.value}</div>
}

export default () => {
  const foo = ref(1)
  return <Comp v-model={foo.value} />
}
</script>
```

::: details Compiled Code

```tsx
import { ref } from 'vue'
import { useModel } from '/vue-macros/jsx-macros/use-model'

function Comp(_props: {
  modelValue: string
  'onUpdate:modelValue': (value: string) => any
}) {
  const modelValue = useModel<string>(_props, 'modelValue', { required: true })
  return <div>{modelValue.value}</div>
}
```

:::

## defineSlots

- If using generics to define slots, all slots will be optional.

```tsx
const slots = defineSlots<{
  default: () => any
}>()

slots.default?.()
//           ^ optional
```

- Support default slots (Recommended).

```vue twoslash
<script lang="tsx">
// @errors: 2307
function Comp<const T>() {
  const slots = defineSlots({
    title: (props: { bar?: T }) => <div>title slot: {props.bar}</div>,
    default: (props: { foo: number }) => <div>default slot: {props.foo}</div>,
  })

  return (
    <>
      <slots.title />
      <slots.default foo={1} />
    </>
  )
}

// ---cut-start---
// prettier-ignore
// ---cut-end---
export default () => (
  <Comp<1>>
    <template v-slot:title={{ bar }}>
      //                      ^?
      {bar}
    </template>
    <template v-slot={{ foo }}>
      //                ^?
      {foo}
    </template>
  </Comp>
)
</script>
```

## defineExpose

Just like in Vue SFC.

```vue twoslash
<script lang="tsx">
// @errors: 2307
import { shallowRef as useRef } from 'vue'

const Comp = <T,>({ foo = undefined as T }) => {
  defineExpose({
    foo,
  })
  return <div />
}

export default () => {
  const compRef = useRef()
  console.log(compRef.value!.foo === 1)
  return <Comp ref={compRef} foo={1 as const} />
}
</script>
```

::: details Compiled Code

::: code-group

```tsx [vue]
import { getCurrentInstance, shallowRef as useRef } from 'vue'
import { useExpose } from '/vue-macros/jsx-macros/use-expose'

const Comp = ({ foo }) => {
  useExpose(getCurrentInstance(), {
    foo,
  })
  return <div />
}
```

```tsx [react]
/**
 * vite.config.ts
 *
 * jsxMacros({
 *   lib: 'react'
 * })
 */
import { forwardRef, useImperativeHandle } from 'react'
import { useExpose } from '/vue-macros/jsx-macros/use-expose'

const Comp = forwardRef(({ foo }, _ref) => {
  useImperativeHandle(
    _ref,
    () => ({
      foo,
    }),
    [foo],
  )
  return <div />
})
```

```tsx [react19]
/**
 * vite.config.ts
 *
 * jsxMacros({
 *   lib: 'react',
 *   version: 19
 * })
 */
import { forwardRef, useImperativeHandle } from 'react'
import { useExpose } from '/vue-macros/jsx-macros/use-expose'

const Comp = ({ foo, ..._props }) => {
  useImperativeHandle(
    _props.ref,
    () => ({
      foo,
    }),
    [foo],
  )
  return <div />
}
```

```tsx [preact]
/**
 * vite.config.ts
 *
 * jsxMacros({
 *   lib: 'preact'
 * })
 */
import { forwardRef } from 'preact/compat'
import { useImperativeHandle } from 'preact/hooks'
import { useExpose } from '/vue-macros/jsx-macros/use-expose'

const Comp = forwardRef(({ foo }, _ref) => {
  useImperativeHandle(
    _ref,
    () => ({
      foo,
    }),
    [foo],
  )
  return <div />
})
```

:::

## defineStyle

```ts
declare function defineStyle(
  style: string,
  options?: { scoped?: boolean },
): void
```

- Support CSS-variable and JS-variable binding.
- Support defining multiple style macros in a file.
- Support CSS pre-processors: `css`, `scss`, `sass`, `less`, `stylus`, `postcss`.

```ts
defineStyle.scss(`...`)
defineStyle.stylus(`...`)
// ...
```

- Support scoped mode.
  - If defined at the top level of the file, the scoped option defaults to `false`.
  - If defined within a function, the scoped option defaults to `true`.

```tsx
function Comp({ color = 'red' }) {
  defineStyle.scss(`
    .foo {
      color: ${color};

      :deep(.bar) {
        color: blue;
      }
    }
  `)
  return <Comp color="red" class="foo bar" />
}

defineStyle(`
  .bar {
    background: black;
  }
`)
```

- Support `css modules`, if the macro is an assignment expression.

```vue twoslash
<script lang="tsx">
// @errors: 2307
export default () => {
  const styles = defineStyle.scss(`
    .foo {
      color: blue;
      .bar {
        background: red;
      }
    }
  `)

  return <div class={styles.bar} />
  //                  ^?
}
</script>
```

## Volar Configuration

```json {5} [tsconfig.json]
{
  "vueCompilerOptions": {
    "plugins": ["unplugin-vue-macros/volar"],
    "vueMacros": {
      "jsxMacros": true,
      "scriptSFC": true
    }
  }
}
```

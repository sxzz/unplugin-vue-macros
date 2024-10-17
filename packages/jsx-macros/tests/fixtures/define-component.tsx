import { defineComponent, nextTick } from 'vue'

const Comp = defineComponent(
  ({ bar = 'bar'!, ...props }: { bar: 'bar'; baz: 'baz' }) => {
    const foo = defineModel('foo', {
      validator: (value) => {
        return value === 'foo'
      },
      required: false,
      type: String,
    })
    return <div>{[foo.value, bar, props.baz]}</div>
  },
  { inheritAttrs: false },
)

const Comp1 = defineComponent((props: { bar: 'bar' }) => {
  const foo = defineModel('foo')
  return <div>{[foo.value, props['bar']]}</div>
})

const Comp2 = defineComponent(async () => {
  await nextTick()
  let foo = await new Promise((resolve) => {
    setTimeout(() => resolve('foo'), 1000)
  })
  return <div>{foo}</div>
})

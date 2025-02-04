import { defineComponent, nextTick } from 'vue'

const Comp = defineComponent(
  ({ bar = 'bar'!, ...attrs }: { bar: 'bar'; baz: 'baz' }) => {
    const foo = $(
      defineModel('foo', {
        validator: (value) => {
          return value === 'foo'
        },
        type: String,
      })!,
    )
    return <div>{[foo, bar, attrs.baz]}</div>
  },
  { name: 'Comp' },
)

const Comp1 = defineComponent((props: { bar: 'bar'; 'onUpdate:bar': any }) => {
  const foo = defineModel('foo')
  return <div>{[foo.value, props['bar'], props['onUpdate:bar']]}</div>
})

const Comp2 = defineComponent(async () => {
  await nextTick()
  let foo = await new Promise((resolve) => {
    setTimeout(() => resolve('foo'), 1000)
  })
  return () => <div>{foo}</div>
})

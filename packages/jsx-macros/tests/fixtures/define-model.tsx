export const Comp = ({ bar }: { bar: string }) => {
  const foo = defineModel('foo', { default: bar })
  return <div>{foo.value}</div>
}

export default function () {
  const modelValue = $(defineModel<string>()!)
  return (
    <Comp v-model:foo={modelValue} bar="bar">
      {modelValue}
    </Comp>
  )
}

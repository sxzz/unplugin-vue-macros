export const Comp = () => {
  const slots = defineSlots<{
    default: () => any
  }>()
  return <div>{slots.default?.()}</div>
}

export default function () {
  const slots = defineSlots({
    default: () => <div>default</div>,
  })
  return <div>{slots.default?.()}</div>
}

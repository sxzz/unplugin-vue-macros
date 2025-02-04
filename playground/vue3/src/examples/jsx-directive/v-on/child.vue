<script setup lang="tsx">
const slots = defineSlots<{
  default: () => any
  bottom: (props: { foo: 1 }) => any
}>()

const emit = defineEmits<{
  log: [foo: number]
  click: []
}>()

defineRender(() => (
  <form onSubmit_prevent onClick={() => emit('log', 1)}>
    <slots.default v-if={slots.default} />
  </form>
))
</script>

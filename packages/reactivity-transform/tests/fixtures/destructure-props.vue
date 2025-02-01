<script setup lang="ts">
const {
  foo = 'foo',
  bar = 10,
  ...props
} = defineProps<{
  foo: string
  bar: number
  baz: boolean
}>()
console.log(foo, bar, props)
</script>

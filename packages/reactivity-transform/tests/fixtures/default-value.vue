<script setup lang="ts">
declare const unknownValue: unknown
const {
  fn = () => {
    console.log('hello')
  },
  obj = { foo: 'bar' },
  arr = ['foo', 'bar'],
  unknown = unknownValue,
} = defineProps<{
  fn: () => void
  obj: Record<string, string>
  arr: string[]
  unknown: unknown
}>()

console.log(fn, obj, arr, unknown)
</script>

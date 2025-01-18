<script setup lang="ts">
const { foo, bar } = defineModels<{
  foo?: string
  bar?: ModelOptions<boolean, { defaultValue: true }>
}>()

console.log(foo.value, bar.value)
</script>

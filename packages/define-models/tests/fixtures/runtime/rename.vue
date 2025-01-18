<script setup lang="ts">
const { modelValue: visible, foo } = defineModels<{
  modelValue: boolean
  foo: string
}>()

console.log(visible, foo)
</script>

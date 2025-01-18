<script setup lang="ts">
const { modelValue, title } = defineModels<{
  modelValue: string
  title: string
}>()

modelValue.value = title.value = '123'
</script>

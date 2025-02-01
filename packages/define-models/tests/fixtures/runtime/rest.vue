<script setup lang="ts">
const { ...rest } = defineModels<{
  modelValue: string
  visible: boolean
}>()

rest.modelValue.value = 'foo'
</script>

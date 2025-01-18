<script setup lang="ts">
const { modelValue } = defineModels<{
  modelValue: string
  visible: boolean
}>()

defineProps<{
  title?: string
}>()
</script>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()

const { modelValue } = defineModels<{
  modelValue: string
  visible: boolean
}>()
</script>

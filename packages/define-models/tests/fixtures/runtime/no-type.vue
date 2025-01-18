<script setup lang="ts">
defineModels<{
  // @ts-expect-error
  foo
  // @ts-expect-error
  bar?
}>()
</script>

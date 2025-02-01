<script setup lang="ts">
const { foo = 'str' } = defineProps(['foo'])

console.log(foo)
</script>

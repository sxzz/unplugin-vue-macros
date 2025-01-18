import { ref } from 'vue'
import { $ as _ } from '@vue-macros/reactivity-transform/macros'
import { $$ as __ } from '@vue-macros/reactivity-transform/macros'

export let foo = _(ref('msg'))
foo = 'world'

console.log(__(foo))

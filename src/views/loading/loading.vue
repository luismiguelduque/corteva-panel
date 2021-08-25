<template>
   <b-overlay
      no-wrap
      :show="show"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      opacity="1"
   >
   </b-overlay>
</template>

<script>
import { BOverlay } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
   props: {
      show: {
         type: Boolean,
         default: () => false,
      }
   },
   components: {
      BOverlay,
   },
   directives: {
      Ripple,
   },
}
</script>

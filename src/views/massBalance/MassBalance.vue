<template>
  <div>
    <loading :show="loader"></loading>
    <template v-if="!loader">
      <b-card title="Kick start your project 🚀">
        Balance de masas
      </b-card>
    </template>
  </div>
</template>

<script>
  import { BCard, BCardText, BLink } from 'bootstrap-vue'
  import Loading from '../loading/loading'
  export default {
    data(){
      return {
        loader: false,
      }
    },
    components: {
      Loading,
      BCard,
      BCardText,
      BLink,
    },
  }
</script>

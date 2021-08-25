<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

    <b-tabs
      v-if="userData"
      pills
    >
      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Cuenta</span>
        </template>
        <tab-account
          :user-data="userData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Información</span>
        </template>
        <tab-information class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Social -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Social</span>
        </template>
        <tab-social class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Security -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="LockIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Seguridad</span>
        </template>
        <tab-security class="mt-2 pt-75" />
      </b-tab>

    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BLink,
} from 'bootstrap-vue'
import tabAccount from './tabAccount'
import tabInformation from './tabInformation'
import tabSocial from './tabSocial'
import tabSecurity from './tabSecurity'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BLink,

    tabAccount,
    tabInformation,
    tabSecurity,
    tabSocial,
  },
  created(){
    this.userData = JSON.parse(localStorage.getItem('user'));
  },
  setup() {
    return {
      userData: {},
    }
  },
}
</script>

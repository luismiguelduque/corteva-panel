<template>
   <div>
      <!-- Loading -->
      <loading :show="loader"></loading>
      <!-- Loading -->
      <b-card v-if="!loader">
         <!-- Alert: No item found -->
         <b-alert
            variant="danger"
            :show="!data"
         >
            <h4 class="alert-heading">
               Usuario no encontrado.
            </h4>
            <div class="alert-body">
               <b-link
                  class="alert-link"
                  :to="{ name: 'users'}"
               >
                  <feather-icon
                     icon="ArrowLeftIcon"
                     class="mr-50"
                  />
                  {{ $t('message.back') }}
               </b-link>
            </div>
         </b-alert>
         <template v-if="data">
            <b-row>
               <b-col cols="12" xl="12" class="pb-50">
                  <div class="d-flex justify-content-end">
                   <b-button
                     v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                     variant="outline-primary"
                     @click="$router.push({ name: 'users'})"
                     >
                        <feather-icon
                           icon="ArrowLeftIcon"
                           class="mr-50"
                        />
                        <span class="align-middle">{{ $t('message.back') }}</span>
                  </b-button>
                  </div>
               </b-col>
               <b-col cols="12" xl="12" class="d-flex justify-content-between flex-column">
                  <div class="d-flex justify-content-start">
                     <b-avatar
                        :src="data.image_url"
                        :text="avatarText(data.name)"
                        variant="light-primary"
                        size="104px"
                        rounded
                     />
                     <div class="d-flex flex-column ml-1">
                        <div class="mb-1">
                           <h4 class="mb-0">{{ data.name }}</h4>
                           <span class="card-text">{{ data.email }}</span><br>
                           <span class="card-text">
                              <b-badge pill :variant="parseInt(data.status) | statusFilter | resolveStatusVariantFilter" class="text-capitalize">
                                 {{ parseInt(data.status) | statusFilter }}
                              </b-badge>
                           </span><br>
                           <span class="card-text">{{ $t('message.role') }}: {{ data.roles | arrayStringFilter}}</span>
                        </div>
                     </div>
                  </div>
               </b-col>
            </b-row>
         </template>
      </b-card>
   </div>
</template>

<script>
import { BAlert, BLink, BButton, BBadge, BRow, BCol, BCard, BMedia, BMediaAside, BAvatar, BMediaBody, } from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import Loading from '../loading/loading'
import Ripple from 'vue-ripple-directive'
export default {
  components: {
      Loading, BCard, BButton, BBadge, BRow, BCol, BAvatar, BMedia, BMediaAside, BAvatar, BMediaBody, BAlert, BLink,
   },
   data(){
		return {
         loader: true,
			data: null,
         avatarText
		}
	},
   directives: {
      Ripple,
   },
   mounted() {
      setTimeout(this.getUser(this.$router.history.current.query.id), 3000);
	},
	methods: {
		getUser(idUser) {
			this.$store.dispatch('appUsers/getUser', idUser).then(response => {
				this.data = response.data.data;
            this.$handleSuccessResponse(response);
            this.loader = false;
			}).catch(error => {
				this.$handleErrorResponse(error);
            this.loader = false;
			});
		},
	},
}
</script>
<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar v-if="previewImage == null" :src="userData.image_url" :text="avatarText(userData.name)" variant="light-primary" size="90px" rounded/>
        <b-avatar v-else :src="previewImage" size="90px" rounded/>
      </template>
      <h4 class="mb-1">{{ userData.name }}</h4>
      <div class="d-flex flex-wrap">
        <b-button variant="outline-primary" @click="$refs.refInputEl.click()">
          <input ref="refInputEl" type="file" class="d-none" @input="uploadImage($event)" accept=".jpg, .jpeg, .png, .bmp, .gif, .svg, .webp">
          <span class="d-none d-sm-inline">{{ $t('message.upload') }}</span>
        </b-button>
        <b-button variant="outline-secondary" class="ml-1" @click="previewImage = null; userData.image = null;">
          <span class="d-none d-sm-inline">{{ $t('message.remove') }}</span>
        </b-button>
      </div>
		</b-media>

    <!-- User Info: Input Fields -->
    <b-form @submit.prevent="update" autocomplete="off">
      <b-row>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Name"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              v-model="userData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="userData.email"
              type="email"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Action Buttons -->
      <b-button
        variant="primary"
        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
        type="submit"
      >
        {{$t('message.save')}}
      </b-button>

    </b-form>

  </div>
</template>

<script>
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCard, BCardHeader, BCardTitle, BFormCheckbox,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      avatarText,
      previewImage: null,
    }
  },
  methods: {
    uploadImage(event) {
			if (event == null)
			{ this.previewImage = null; this.userData.image = null; this.$refs.refInputEl.value = null; return; }

			this.userData.image = event.target.files[0];
			const reader = new FileReader();
			reader.onload = event => { this.previewImage = reader.result; };
			reader.readAsDataURL(this.userData.image);
			this.$refs.refInputEl.value = null;
		},
    update() {
      let formData = new FormData();
      formData.append('id', this.userData.id);
      formData.append('name', this.userData.name);
      formData.append('email', this.userData.email);
      if(this.userData.image != null){
        formData.append('image', this.userData.image);
        formData.append('original_image_name', this.userData.original_image_name);
      }
      this.$store.dispatch('appUsers/updateUser', formData).then(response => {
        this.$store.commit('appAuth/SET_USER_FRESH', response.data.data);
        this.previewImage = null;
        this.$handleSuccessResponse(response);
      }).catch(error => {
        this.$handleErrorResponse(error);
      });
		},
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

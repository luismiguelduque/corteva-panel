<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            Corteva
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Adventure starts here 🚀
        </b-card-title>
        <b-card-text class="mb-2">
          Make your app management easy and fun!
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm"
          >
            <!-- Name -->
            <b-form-group
              label="Name"
              label-for="Name"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Name"
                  :rules="{
                     required,
                  }"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false:null"
                  name="register-name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group
              label="Email"
              label-for="email"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Email"
                  :rules="{
                     required,
                     email,
                  }"
              >
                <b-form-input
                  id="email"
                  v-model="regEmail"
                  :state="errors.length > 0 ? false:null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Password"
              label-for="password"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Password"
                  :rules="{
                     required,
                     min: 6,
                  }"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Confirm Password"
              label-for="password-confirmation"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  :rules="{
                     required,
                     confirmed: 'Password',
                  }"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password-confirmation"
                    v-model="password_confirmation"
                    type="password"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password-confirmation"
                    placeholder="············"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="register-privacy-policy"
                v-model="status"
                name="checkbox-1"
              >
                I agree to
                <b-link>privacy policy & terms</b-link>
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="submit"
            >
              Sign up
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{name:'login'}">
            <span>Sign in instead</span>
          </b-link>
        </b-card-text>
      </b-card>
    <!-- /Register v1 -->
    </div>
  </div>

</template>

<script>
import {
  BCard, BLink, BCardTitle, BCardText, BForm,
  BButton, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { ValidationProvider, ValidationObserver } from "vee-validate"
import { required, email, min } from '@validations'

export default {
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  data() {
      return {
         regEmail: '',
         name: '',
         password: '',
         password_confirmation: '',
         status: '',

         required,
         email,
         min
      }
  },
  methods: {
      validationForm() {
         this.$refs.registerForm.validate().then(success => {
            if (success) {
               if(this.status == '' || this.status == false){
                  return this.$notify('Términos & condiciones', 'Debe aceptar nuestros términos y condiciones para continuar.', 'XCircleIcon', 'danger');
               }
               let formData = new FormData();
               formData.append('email', this.regEmail);
               formData.append('name', this.name);
               formData.append('password', this.password);
               formData.append('password_confirmation', this.password_confirmation);
               this.$store.dispatch('appAuth/register', formData).then(response => {
                  //this.flag = true;
                  this.$handleSuccessResponse(response);
                  setTimeout(() => this.$router.replace('/'), 1500);
               }).catch(error => {
                  //this.flag = false;
                  this.$handleErrorResponse(error);
               });
            }
         })
      },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

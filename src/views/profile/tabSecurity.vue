<template>
  <div>
      <div class="d-flex">
         <feather-icon
            icon="LockIcon"
            size="19"
         />
         <h4 class="mb-0 ml-50">
            Cambio de Contraseña
         </h4>
      </div>
      <validation-observer ref="security">
         <b-form @submit.prevent="handleSubmitSecurity" autocomplete="off" class="mt-1">
            <validation-provider #default="{ errors }" name="Contraseña Actual">
               <b-form-group label="Contraseña Actual:" label-for="s-current-password">
                  <b-form-input
                     id="s-current-password"
                     v-model="security.password"
                     placeholder="********"
                     type="password"
                     :state="errors.length == 0"
                     ref="password"
                     autocomplete="current-password"
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="errors" v-text="errors[0]"></b-form-invalid-feedback>
               </b-form-group>
            </validation-provider>
            <validation-provider
               #default="{ errors }"
               name="Nueva Contraseña"
               :rules="{
                  required: security.password ? true : false,
                  min: 8,
                  mayus: 1,
                  minus: 1,
                  num: 1,
                  charesp: 1,
               }"
            >
               <b-form-group label="Nueva Contraseña:" label-for="s-new-password">
                  <b-form-input
                     id="s-new-password"
                     v-model="security.new_password"
                     :state="errors.length == 0"
                     type="password"
                     :disabled="!security.password"
                     autocomplete="new-password"
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="errors" v-text="errors[0]"></b-form-invalid-feedback>
               </b-form-group>
            </validation-provider>
            <validation-provider
               #default="{ errors }"
               name="Confirmación de Contraseña"
               :rules="{
                  required: security.password || security.new_password ? true : false,
                  confirmed: 'Nueva Contraseña',
               }"
            >
               <b-form-group label="Confirmación de Contraseña:" label-for="s-confirm-password">
                  <b-form-input
                     id="s-confirm-password"
                     :state="errors.length == 0"
                     v-model="security.confirm_password"
                     type="password"
                     :disabled="!security.new_password"
                     autocomplete="new-password"
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="errors" v-text="errors[0]"></b-form-invalid-feedback>
               </b-form-group>
            </validation-provider>
            <!-- Action Buttons -->
            <b-button
               type="submit"
               variant="primary"
               class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            >
               {{$t('message.save')}}
            </b-button>
         </b-form>
   </validation-observer>
  </div>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormInvalidFeedback,
} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver, localize, extend } from "vee-validate";
import es from "vee-validate/dist/locale/es";
import * as validations from "vee-validate/dist/rules";
import { mayus, minus, num, charesp } from "@/libs/custom-rules";
const rules = {
   ...validations,
   mayus: mayus,
   minus: minus,
   num: num,
   charesp: charesp,
};

localize("es", es);
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

export default {
  components: {
      ValidationProvider,
      ValidationObserver,

      BRow,
      BCol,
      BForm,
      BFormGroup,
      BFormInput,
      BButton,
      BFormInvalidFeedback,
  },
  data() {
    return {
      security: {
         password: null,
			new_password: null,
			confirm_password: null,
      },
    }
  },
  methods:{
      handleSubmitSecurity() {
         this.$refs.security.validate().then((success) => {
            if (success) {
               let formData = new FormData();
               formData.append('current_password', this.security.password);
               formData.append('new_password', this.security.new_password);
               formData.append('repeat_new_password', this.security.confirm_password);
               this.$store.dispatch('appAuth/changePassword', formData).then(response => {
                  this.security = {};
                  this.$refs.security.reset();
                  this.$handleSuccessResponse(response);
               }).catch(error => {
                  this.$handleErrorResponse(error);
               });
            }
         });
      },
  }
}
</script>

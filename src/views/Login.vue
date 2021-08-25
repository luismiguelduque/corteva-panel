<template>
	<div class="auth-wrapper auth-v2">
		<b-row class="auth-inner m-0">
			<!-- Brand logo-->
			<b-link class="brand-logo">
				<span class="brand-logo">
          <b-img class="logo-login"
              :src="appLogoImage"
              alt="logo"
          />
        </span>
			</b-link>
			<!-- /Brand logo-->
			<!-- Left Text-->
			<b-col lg="8" >
        <b-img fluid class="background-login" :src="imgUrl" alt="Login" />
			</b-col>
			<!-- /Left Text-->
			<!-- Login-->
			<b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
				<b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
					<b-card-title title-tag="h2" class="font-weight-bolder mb-1">{{ $t('message.welcomeToPanel') }} <!--👋--> </b-card-title>
					<b-card-text class="mb-2">{{ $t('message.messageLoginForm') }}</b-card-text>
					<!-- form -->
					<validation-observer ref="loginValidation">
						<b-form class="auth-login-form mt-2" @submit.prevent>
							<!-- email -->
							<b-form-group :label="$t('Email')" label-for="login-email">
								<validation-provider #default="{ errors }" name="Email" rules="required|email">
									<b-form-input id="login-email" v-model="userEmail" :state="errors.length > 0 ? false:null" name="login-email" placeholder="john@example.com" />
									<small class="text-danger">{{ errors[0] }}</small>
								</validation-provider>
							</b-form-group>
							<!-- forgot password -->
							<b-form-group>
								<div class="d-flex justify-content-between">
									<label for="login-password">{{ $t('message.password') }}</label>
									<b-link>
										<small>{{ $t('message.forgotPassword') }}</small>
									</b-link>
								</div>
								<validation-provider #default="{ errors }" name="Password" rules="required">
									<b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
										<b-form-input
											id="login-password"
											v-model="password"
											:state="errors.length > 0 ? false:null"
											class="form-control-merge"
											:type="passwordFieldType"
											name="login-password"
											placeholder="············"
										/>
										<b-input-group-append is-text>
											<feather-icon
												class="cursor-pointer"
												:icon="passwordToggleIcon"
												@click="togglePasswordVisibility"
											/>
										</b-input-group-append>
									</b-input-group>
									<small class="text-danger">{{ errors[0] }}</small>
								</validation-provider>
							</b-form-group>
							<!-- checkbox -->
							<b-form-group>
								<b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">{{ $t('message.rememberMe') }}</b-form-checkbox>
							</b-form-group>
							<!-- submit buttons -->
							<b-button id="login-enter" type="submit" block variant="primary" :disabled="flag" @click="login">
								{{ $t('message.signIn') }}
							</b-button>
						</b-form>
					</validation-observer>
          <!--
					 <b-card-text class="text-center mt-2">
						<span>{{ $t('message.newOnOurPlatform') }} </span>
						<b-link :to="{name:'register'}">
							<span>{{ $t('message.createAnAccount') }}</span>
						</b-link>
					</b-card-text>
					-->
				</b-col>
			</b-col>
			<!-- /Login-->
		</b-row>
	</div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { $themeConfig } from '@themeConfig'

export default {
	components: {
		BRow,
		BCol,
		BLink,
		BFormGroup,
		BFormInput,
		BInputGroupAppend,
		BInputGroup,
		BFormCheckbox,
		BCardText,
		BCardTitle,
		BImg,
		BForm,
		BButton,
		VuexyLogo,
		ValidationProvider,
		ValidationObserver,
	},
	mixins: [togglePasswordVisibility],
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
	data() {
		return {
			status: '',
			password: '',
			userEmail: '',
			sideImg: require('@/assets/images/pages/background.jpg'),
			// validation rulesimport store from '@/store/index'
			required,
			email,
      	flag: false
		}
	},
	computed: {
		passwordToggleIcon() {
			return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
		},
		imgUrl() {
			if (store.state.appConfig.layout.skin === 'dark') {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.sideImg = require('@/assets/images/pages/background.jpg')
				return this.sideImg
			}
			return this.sideImg
		},
	},
	methods: {
		login() {
			this.$refs.loginValidation.validate().then(success => {
				if (success) {
					let formData = new FormData();
					formData.append('email', this.userEmail);
					formData.append('password', this.password);
					this.$store.dispatch('appAuth/login', formData).then(response => {
            		this.flag = true;
						this.$handleSuccessResponse(response);
            		setTimeout(() => this.$router.replace('/'), 1500);
					}).catch(error => {
            		this.flag = false;
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

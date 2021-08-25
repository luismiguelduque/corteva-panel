<template>
<div>
	<!-- Loading -->
   <loading :show="loader"></loading>
	<!-- Alert: No item found -->
	<template  v-if="!loader">
		<b-alert
			variant="danger"
			:show="form.id === null && method === 'edit'"
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
		<b-card no-body v-if="(form.id != null && method == 'edit') || method === 'create'">
			<b-card-body>
				<b-media class="mb-2">
					<template #aside>
						<b-avatar v-if="previewImage == null" :src="method == 'edit' ? form.image_url : null" :text="avatarText(name)" variant="light-primary" size="90px" rounded/>
						<b-avatar v-else :src="previewImage" size="90px" rounded/>
					</template>
					<h4 class="mb-1" v-if="method == 'edit'">{{ name }}</h4>
					<div class="d-flex flex-wrap">
						<b-button variant="outline-primary" @click="$refs.refInputEl.click()">
							<input ref="refInputEl" type="file" class="d-none" @input="uploadImage($event)" accept=".jpg, .jpeg, .png, .bmp, .gif, .svg, .webp">
							<span class="d-none d-sm-inline">{{ method == 'create' ?  $t('message.upload') : $t('message.edit') }}</span>
							<feather-icon icon="EditIcon" class="d-inline d-sm-none"/>
						</b-button>
						<b-button variant="outline-secondary" class="ml-1" @click="previewImage = null; form.image = null;">
							<span class="d-none d-sm-inline">{{ $t('message.remove') }}</span>
							<feather-icon icon="TrashIcon" class="d-inline d-sm-none"/>
						</b-button>
					</div>
				</b-media>
				<validation-observer ref="refFormObserver" #default="{ handleSubmit }">
					<b-form @submit.prevent="handleSubmit()">
						<b-row>
							<b-col cols="12" md="6">
								<validation-provider #default="{ errors }" name="Full Name" rules="required">
									<b-form-group :label="$t('message.tableHeader.name')" label-for="full-name">
										<b-form-input id="full-name" v-model="form.name" :state="errors.length > 0 ? false:null" trim />
										<b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
									</b-form-group>
								</validation-provider>
							</b-col>
							<b-col cols="12" md="6">
								<validation-provider #default="{ errors }" name="Email" rules="required|email">
									<b-form-group :label="$t('message.tableHeader.email')" label-for="email">
										<b-form-input id="email" :state="errors.length > 0 ? false:null" v-model="form.email" trim />
										<b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
									</b-form-group>
								</validation-provider>
							</b-col>
							<b-col cols="12" md="6">
									<validation-provider #default="{ errors }" name="Password" :rules="{required: method == 'create' ? true:false, min: 6, confirmed: 'confirmation'}">
										<b-form-group :label="$t('message.password')" label-for="password">
											<b-form-input id="password" v-model="form.password" :state="errors.length > 0 ? false:null" type="password" trim />
											<b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
										</b-form-group>
									</validation-provider>
							</b-col>
							<b-col cols="12" md="6">
								<validation-provider #default="{ errors }" name="Password Confirmation" :rules="{required: method == 'create' ? true:false}" vid="confirmation">
									<b-form-group :label="$t('message.password_confirmation')" label-for="password_confirmation">
										<b-form-input id="password_confirmation" v-model="form.password_confirmation" type="password" :state="errors.length > 0 ? false:null" trim />
										<b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
									</b-form-group>
								</validation-provider>
							</b-col>
							<b-col cols="12" md="6">
								<validation-provider #default="{ errors }" name="User Role" rules="required">
									<b-form-group :label="$t('message.tableHeader.role')" label-for="user-role">
										<v-select v-model="form.role_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="roleOptions" :reduce="val => val.id" label="description" multiple/>
										<b-form-invalid-feedback :state="errors.length > 0 ? false:null">{{ errors[0] }}</b-form-invalid-feedback>
									</b-form-group>
								</validation-provider>
							</b-col>
							<b-col cols="12">
								<b-button variant="primary" type="submit" class="mb-1 mb-sm-0 mr-0 mr-sm-1" @click="action()">{{ method == 'create' ?  $t('message.save') : $t('message.edit') }}</b-button>
								<b-button variant="outline-secondary" type="button" @click="resetForm(), $router.push({ name: 'users'})">{{ $t('message.cancel') }}</b-button>
							</b-col>
						</b-row>
					</b-form>
				</validation-observer>
			</b-card-body>
		</b-card>
	</template>
</div>

</template>
<script>
import {
  BButton, BAlert, BLink, BMedia, BAvatar, BFormDatepicker, BFormInvalidFeedback, BRow, BCol, BCardBody, BFormGroup, BFormInput, BForm, BCard,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import User from "@models/user"
import { mapGetters } from "vuex"
import { ref } from '@vue/composition-api'
import { required, confirmed, email } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Loading from '../loading/loading'
import vSelect from 'vue-select'
export default {
  	components: {
		Loading,
		BButton,
		BMedia,
		BAvatar,
		BRow,
		BAlert, BLink,
		BCol,
		BCardBody,
		BFormDatepicker,
		BFormGroup,
		BFormInput,
		BFormInvalidFeedback,
		BForm,
		BCard,
		vSelect,
		ValidationProvider,
		ValidationObserver
  	},
	data(){
		return {
			dir: 'ltr',
			loader: true,
			previewImage: null,
			avatarText,
			form: new User(),
			name: null,
			method: null,
			idUser: null,
			typeUser: null,
			refInputEl: null,
			statusOptions: [
				{
					id: 1,
					value: 'Activo'
				},
				{
					id: 2,
					value: 'Bloqueado'
				},
			]
		}
	},
	created() {
		this.getRoles();
	},
	computed: {
		...mapGetters({
			roleOptions: "appRoles/rolesList",
		}),
	},
  	mounted() {
		this.verifyMethod(this.$router.history.current.query.id);
	},
	methods: {
		getRoles() {
			this.$store.dispatch('appRoles/getRolesList').then(response => {
				//console.log(response);
			}).catch(error => {
				this.$handleErrorResponse(error);
			});
		},
		verifyMethod(id) {
			if(id === null){
				this.method = 'create';
				setTimeout(() => this.loader = false, 3000);
			}else{
				this.method = 'edit';
				this.idUser = id;
				this.getUser();
			}
		},
		action(){
			if(this.method == 'create') {
				this.storeUser();
			}else if(this.method == 'edit'){
				this.editUser();
			}
		},
		uploadImage(event) {
			if (event == null)
			{ this.previewImage = null; this.form.image = null; this.$refs.refInputEl.value = null; return; }

			this.form.image = event.target.files[0];
			const reader = new FileReader();
			reader.onload = event => { this.previewImage = reader.result; };
			reader.readAsDataURL(this.form.image);
			this.$refs.refInputEl.value = null;
		},
		editUser() {
			this.$refs.refFormObserver.validate().then(success => {
				if (success) {
					let data = {
						id: this.form.id,
						data: {
							name: this.form.name,
							email: this.form.email,
							role_id: this.form.role_id,
							password: this.form.password
						}
					}
					this.$store.dispatch('appUsers/updateUser', data).then(response => {
						console.log(response);
						this.resetForm();
						this.$handleSuccessResponse(response);
						this.$router.push('/users');
					}).catch(error => {
						this.$handleErrorResponse(error);
					});
				}
			})
		},
		storeUser() {
			this.$refs.refFormObserver.validate().then(success => {
				if (success) {
					let formData = new FormData();
					formData.append('name', this.form.name);
					//formData.append('status', this.form.status);
					formData.append('email', this.form.email);
					formData.append('role_id', this.form.role_id);
					formData.append('password', this.form.password);
					formData.append('password_confirmation', this.form.password_confirmation);
					this.$store.dispatch('appUsers/storeUser', formData).then(response => {
						this.resetForm();
						this.$handleSuccessResponse(response);
						setTimeout(() => this.$router.push('/users'), 700);
					}).catch(error => {
						this.$handleErrorResponse(error);
					});
				}
			})
		},
		getUser() {
			this.$store.dispatch('appUsers/getUser', this.idUser).then(response => {
				this.form = new User(response.data.data);
				this.name = response.data.data.name;
				setTimeout(() => this.loader = false, 3000);
			}).catch(error => {
				setTimeout(() => this.loader = false, this.$handleErrorResponse(error), 3000);
			});
		},
		resetForm() {
			this.$refs.refFormObserver.reset();
			this.form.clear();
			this.name = null;
		}
	},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
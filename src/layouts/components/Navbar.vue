<template>
	<div class="navbar-container d-flex content align-items-center">

		<!-- Nav Menu Toggler -->
		<ul class="nav navbar-nav d-xl-none">
			<li class="nav-item">
			<b-link
				class="nav-link"
				@click="toggleVerticalMenuActive"
			>
				<feather-icon
					icon="MenuIcon"
					size="21"
				/>
			</b-link>
			</li>
		</ul>

		<!-- Left Col -->
		<div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
			<dark-Toggler class="d-none d-lg-block" />
		</div>

		<b-navbar-nav class="nav align-items-center ml-auto">
			<locale />
			<b-nav-item-dropdown
				right
				toggle-class="d-flex align-items-center dropdown-user-link"
				class="dropdown-user"
        id="user-options-dropdown"
				>
				<template #button-content>
					<div class="d-sm-flex d-none user-nav">
						<p class="user-name font-weight-bolder mb-0">
						{{ userLoggedIn.name ? userLoggedIn.name : ''}}
						</p>
						<span class="user-status">{{ userLoggedIn.roles ? userLoggedIn.roles : [] | arrayStringFilter }}</span>
					</div>
					<b-avatar :src="userLoggedIn.image_url ? userLoggedIn.image_url : null" size="40" class="badge-minimal" badge badge-variant="success" :text="avatarText(userData.name)" variant="light-primary"/>
				</template>

				<b-dropdown-item link-class="d-flex align-items-center" :to="{ name: 'profile' }">
					<feather-icon
						size="16"
						icon="UserIcon"
						class="mr-50"
					/>
					<span>{{ $t('message.profile') }}</span>
				</b-dropdown-item>

				<b-dropdown-divider />

				<b-dropdown-item id="logout-button" link-class="d-flex align-items-center" @click="logout()">
					<feather-icon
						size="16"
						icon="LogOutIcon"
						class="mr-50"
					/>
					<span>{{ $t('message.logout') }}</span>
				</b-dropdown-item>
			</b-nav-item-dropdown>
		</b-navbar-nav>
	</div>
</template>

<script>
import { avatarText } from '@core/utils/filter'
import { mapGetters } from "vuex";
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import Locale from '@core/layouts/components/app-navbar/components/Locale.vue'

export default {
	components: {
		BLink,
		BNavbarNav,
		BNavItemDropdown,
		BDropdownItem,
		BDropdownDivider,
		BAvatar,

		// Navbar Components
		DarkToggler,
		Locale,
	},
	props: {
		toggleVerticalMenuActive: {
			type: Function,
			default: () => {},
		},
	},
	data(){
		return {
			userData: {
				name: '',
				roles: [],
				avatar: '',
			},
			avatarText
		}
	},
	computed: {
		...mapGetters({
			userLoggedIn: "appAuth/getUserLoggedIn",
		}),
	},
	methods: {
		logout(){
			this.$store.dispatch('appAuth/logout').then(response => {
				this.$handleSuccessResponse(response);
			}).catch(error => {
				this.$handleErrorResponse(error);
			});
		}
	},
}
</script>

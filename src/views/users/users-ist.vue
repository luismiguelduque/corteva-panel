<template>
<div>
	<!-- Loading -->
   <loading :show="loader"></loading>
	<b-card no-body v-if="!loader">
		<b-card-body>
			<div class="d-flex justify-content-between  flex-wrap">
				<b-form-group
					:label="$t('message.filter')"
					label-cols-sm="3"
					label-align-sm="left"
					label-size="sm"
					label-for="filterInput"
					class="mb-0 align-items-center"
				>
					<b-input-group size="sm">
						<b-form-input id="filterInput" v-model="filter" :placeholder="$t('message.seachLabel')"/>
						<b-input-group-append>
							<b-button :disabled="!filter" @click="filter = ''"><feather-icon icon="XIcon" size="16"/></b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
				<div class="d-flex  justify-content-end">
					<b-button variant="primary" @click="$router.push({ name: 'users-form', query: { id: null }})">
						<feather-icon icon="PlusIcon" class="mr-50" size="16"/>
						<span class="text-nowrap">{{ $t('message.add') }} {{ $t('message.user') }}</span>
					</b-button>
				</div>
			</div>
		</b-card-body>
		<b-table
			striped
			hover
			responsive
			class="position-relative"
			:per-page="perPage"
			:current-page="currentPage"
			:items="items"
			:fields="fields"
			:filter="filter"
			:filter-included-fields="filterOn"
			@filtered="onFiltered"
		>
			<template #cell(avatar)="data"><b-avatar :text="avatarText(data.item.name)" variant="light-primary"/></template>
			<template #cell(email)="data">{{ data.item.email }}</template>
			<template #cell(roles)="data">{{ data.item.roles | arrayStringFilter }}</template>
			<template #cell(status)="data">
				<b-badge
					pill
					:variant="parseInt(data.item.status) | statusFilter | resolveStatusVariantFilter"
					class="text-capitalize"
				>
					{{ parseInt(data.item.status) | statusFilter }}
				</b-badge>
			</template>
			<template #cell(actions)="data">
				<div class="text-nowrap">
					<feather-icon
						:id="`user-row-${data.item.id}-file-text-icon`"
						icon="SearchIcon"
						class="cursor-pointer"
						size="21"
						@click="$router.push({ name: 'users-view', query: { id: data.item.id }})"
					/>
					<b-tooltip
						:title="$t('message.details')"
						class="cursor-pointer"
						:target="`user-row-${data.item.id}-file-text-icon`"
					/>

					<feather-icon
						:id="`user-row-${data.item.id}-edit-icon`"
						icon="EditIcon"
						size="21"
						class="mx-1 cursor-pointer"
						@click="$router.push({ name: 'users-form', query: { id: data.item.id }})"
					/>
					<b-tooltip
						:title="$t('message.edit')"
						class="cursor-pointer"
						:target="`user-row-${data.item.id}-edit-icon`"
					/>

					<feather-icon
						:id="`user-row-${data.item.id}-trash-icon`"
						icon="TrashIcon"
						size="21"
						class="cursor-pointer"
						@click="confirmationDelete =  true, userID = data.item.id"
					/>
					<b-tooltip
						:title="$t('message.delete')"
						class="cursor-pointer"
						:target="`user-row-${data.item.id}-trash-icon`"
					/>
				</div>
			</template>
		</b-table>
		<b-card-body class="d-flex justify-content-between flex-wrap pt-0">
			<!-- page length -->
			<b-form-group
				label="Per Page"
				label-cols="6"
				label-align="left"
				label-size="sm"
				label-for="sortBySelect"
				class="text-nowrap mb-md-0 mr-1"
			>
				<b-form-select
					id="perPageSelect"
					v-model="perPage"
					size="sm"
					inline
					:options="pageOptions"
				/>
			</b-form-group>
			<!-- pagination -->
			<div>
				<b-pagination
					v-model="currentPage"
					:total-rows="totalRows"
					:per-page="perPage"
					first-number
					last-number
					prev-class="prev-item"
					next-class="next-item"
					class="mb-0"
				>
				<template #prev-text>
					<feather-icon
					icon="ChevronLeftIcon"
					size="18"
					/>
				</template>
				<template #next-text>
					<feather-icon
					icon="ChevronRightIcon"
					size="18"
					/>
				</template>
				</b-pagination>
			</div>
		</b-card-body>

		<b-modal
			v-model="confirmationDelete"
			:title="$t('message.delete')+' '+$t('message.user')"
			:ok-title="$t('message.delete')"
			:ok-cancel="$t('message.cancel')"
			cancel-variant="outline-secondary"
			ok-variant="danger"
			centered
			@hidden="userID = null, confirmationDelete = false"
			@cancel="userID = null, confirmationDelete = false"
			@ok="deleteUser(userID)"
    	>
			<b-card-text>
				{{ $t('message.messageDelete') }}
			</b-card-text>
    	</b-modal>
  	</b-card>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { avatarText } from '@core/utils/filter'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import Loading from '../loading/loading'
import {
  BTable, BRow, BCol, BCardText, BBadge, BCardBody, BAvatar, BTooltip, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton, BCard,
} from 'bootstrap-vue'

export default {
	components: {
		Loading,
		BCardCode,
		BTable,
		BCardText,
		BAvatar,
		BTooltip,
		BFormGroup,
		BFormSelect,
		BPagination,
		BInputGroup,
		BFormInput,
		BInputGroupAppend,
		BButton,
		BBadge,
		BCard,
		BRow,
		BCol,
		BCardBody,
	},
	data() {
		return {
			loader: true,
			userID: null,
			confirmationDelete: false,
			avatarText,
			perPage: 5,
			pageOptions: [3, 5, 10],
			totalRows: 1,
			currentPage: 1,
			filter: null,
			filterOn: [],
			fields: [
				{ key: 'avatar', label: 'Avatar', },
				{ key: 'name', label: this.$t('message.name'), sortable: true },
				{ key: 'roles', label: this.$t('message.role'), },
				{ key: 'email', label: this.$t('message.email'), sortable: true },
				{ key: 'status', label: this.$t('message.status'), sortable: true },
				{ key: 'actions', label: this.$t('message.actions'), },
			],
		}
	},
	computed: {
		...mapGetters({
			items: "appUsers/usersList",
		}),
		sortOptions() {
			return this.fields
			.filter(f => f.sortable)
			.map(f => ({ text: f.label, value: f.key }))
		},
	},
	mounted() {
		this.getUsers();
		setTimeout(() => this.totalRows = this.items.length, 600);
	},
	methods: {
		getUsers() {
			this.$store.dispatch('appUsers/getUsersList', {role_name: ''}).then(response => {
				setTimeout(() => this.loader = false, /*this.$handleSuccessResponse(response),*/ 3000);
			}).catch(error => {
				setTimeout(() => this.loader = false, this.$handleErrorResponse(error), 3000);
			});
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
		deleteUser(userID) {
			this.loader = true;
			this.$store.dispatch('appUsers/deleteUser', userID).then(response => {
				this.getUsers();
				setTimeout(() => this.loader = false, 900);
				this.$handleSuccessResponse(response);
			}).catch(error => {
				setTimeout(() => this.loader = false, 900);
				this.$handleErrorResponse(error);
			});
    	},
	},
}
</script>

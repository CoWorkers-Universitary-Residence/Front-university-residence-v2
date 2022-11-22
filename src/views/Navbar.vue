<template id="search">
  <v-toolbar max-height="64px" color="primary">
    <v-toolbar-items class="container pa-0">
      <v-col cols="3" class="pa-0 d-none d-sm-flex d-md-flex d-lg-flex">
        <router-link to="/" v-on:click="reloadPage()">
          <img class="mx-3"  width="70px" v-bind:src="require('../assets/logo.png') " alt="Image of a snowy mountain, University Residence logo">
        </router-link>
      </v-col>
      <v-col cols="4" class="col-sm-3 col-md-3 d-flex flex-row align-center pa-0">
        <div class="d-flex justify-center align-center my-auto ml-3 rounded-pill white dense--btn">
          <v-btn height="40px" @click="isUserLogged()" class="rounded-l-pill white" icon>
            <v-icon v-if="this.idUser == null">mdi-account</v-icon>
            <v-avatar color="secondary" v-else size="36"><v-img v-bind:src=this.$store.state.auth.user.photo></v-img></v-avatar>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-app-bar-nav-icon
                  class="rounded-r-pill dense--btn"
                  v-bind="attrs"
                  v-on="on"
              ></v-app-bar-nav-icon>
            </template>
            <!-- Type Menus -->
            <v-list class="rounded-xl" v-if="this.idUser == null">
              <v-list-item
                  v-for="item in notRegistered"
                  :key="item.id"
                  @click="onOptionSelectedNotRegistered(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list class="rounded-xl" v-else-if="this.typeUser === 'customer'">
              <v-list-item
                  v-for="item in registeredCustomer"
                  :key="item.id"
                  @click="onOptionSelectedRegisteredCustomer(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list class="rounded-xl" v-else-if="this.typeUser === 'agency'">
              <v-list-item
                  v-for="item in registeredAgency"
                  :key="item.id"
                  @click="onOptionSelectedRegisteredAgency(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col cols="8" class="col-sm-6 col-md-6 py-0 pr-3 d-flex align-center justify-end">
        <div class="my-auto">
          <v-text-field
              clearable
              dense
              type="text"
              full-width
              solo
              hide-details
              single-line
              flat
              class="rounded-pill adjust"
              placeholder="What are you looking for?"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              v-on:keyup.enter="searchCommand()"
          ></v-text-field>
        </div>
      </v-col>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  props: [
    'idUser', 'typeUser'
  ],
  data: () => ({
    notRegistered: [
      { id: 0, title: 'Sign in'},
      { id: 1, title: 'Sign up as tenant' },
      { id: 2, title: 'Sign up as owner' },
    ],
    registeredCustomer: [
      { id: 0, title: 'My Profile'},
      { id: 1, title: 'Log Out'}
    ],
    registeredAgency: [
      { id: 0, title: 'My Profile'},
      { id: 1, title: 'Clients'},
      { id: 2, title: 'Change Subscription'},
      { id: 3, title: 'Log Out'}
    ],
    search: '',
  }),
  methods: {
    searchCommand() {
      if (!(this.search.length == 0)) {
        this.$router.push({ path: `/services/search/`});
        this.$router.push({ path: `/services/search/${this.search}`});
      }
    },
    onOptionSelectedNotRegistered(option) {
      if(option.id == 0) this.$emit('sign-in');
      if(option.id == 1) this.$emit('sign-up-user');
      if(option.id == 2) this.$emit('sign-up-agency');
    },
    onOptionSelectedRegisteredCustomer(option) {
      if(option.id == 0) this.$router.push({ path: `/${this.typeUser}/profile` });
      if(option.id == 1) this.closeSession();
    },
    onOptionSelectedRegisteredAgency(option) {
      if(option.id == 0) this.$router.push({ path: `/${this.typeUser}/profile` });
      if(option.id == 1) this.$router.push({ path: `/${this.typeUser}/clients` });
      if(option.id == 2) this.$emit('subscription');
      if(option.id == 3) this.closeSession();
    },

    reloadPage() {
      location.reload();
    },
    closeSession() {
      this.$emit('closeSession');
    },

    //Button of profile in navbar
    isUserLogged() {
      if (this.idUser == null) this.$emit('sign-in');
      else if (this.typeUser === 'agency') this.$router.push({ path: `/agency/profile` });
      else if (this.typeUser === 'customer') this.$router.push({ path: `/customer/profile` });
    }
  },
  mounted(){
  },
}
</script>

<style scoped>
  @media (min-width: 750px) {
    .adjust {
      width: 350px;
    }
  }
  @media (min-width: 900px) {
    .adjust {
      width: 500px;
    }
  }
  .dense--btn {
    max-height: 40px;
  }
</style>

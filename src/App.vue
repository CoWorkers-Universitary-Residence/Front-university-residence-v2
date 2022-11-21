<template>
  <v-app>
    <navbar v-on:closeSession="logout" v-bind:typeUser="typeUser" v-bind:idUser="idSignIn" app v-on:sign-in="setDialogLogin"
            v-on:sign-up-user="setDialogRegistrationCustomer"
            v-on:sign-up-agency="setDialogRegistrationAgency"
            v-on:subscription="setDialogSubscription"
    ></navbar>
    <template>
      <router-view v-on:sign-in="setDialogLogin" v-bind:idUser="idSignIn" v-bind:typeUser="typeUser" app></router-view>
      <LogIn :dialog="dialogLogin" v-on:dialog-false="setDialogLogin" v-on:set-id-sign-in="login"></LogIn>
      <registration-customer :dialog="dialogRegistrationCustomer" v-on:dialog-false="setDialogRegistrationCustomer"></registration-customer>
      <registration-agency :dialog="dialogRegistrationAgency" v-on:dialog-false="setDialogRegistrationAgency"></registration-agency>
      <subscription :dialog="dialogSubscription" v-on:dialog-false="setDialogSubscription"></subscription>
    </template>
    <Footer app></Footer>
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar";
import Footer from "./views/Footer";
import LogIn from "./authentication/pages/Login";
import RegistrationCustomer from "./authentication/pages/RegistrationCustomer";
import RegistrationAgency from "./authentication/pages/RegistrationAgency";
import Subscription from '../src/agency/pages/Subscription'
export default {
  name: 'App',
  components: { RegistrationAgency, Navbar, RegistrationCustomer, LogIn, Footer, Subscription },
  data: () => ({
    idSignIn: null,
    typeUser: '',
    dialogLogin: false,
    dialogRegistrationCustomer: false,
    dialogRegistrationAgency: false,
    dialogSubscription: false,
  }),
  mounted() {
    this.login();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    setDialogLogin(){
      this.dialogLogin = !this.dialogLogin;
    },
    setDialogRegistrationCustomer(){
      this.dialogRegistrationCustomer = !this.dialogRegistrationCustomer;
    },
    setDialogRegistrationAgency(){
      this.dialogRegistrationAgency = !this.dialogRegistrationAgency;
    },
    setDialogSubscription() {
      this.dialogSubscription = !this.dialogSubscription;
    },
    login(){
      this.idSignIn = this.$store.state.auth.user.id;
      this.typeUser = this.$store.state.auth.type;
      console.log(this.$store.state.auth.user);
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.idSignIn = null;
      this.typeUser = '';
      this.$router.push('/');
    }
  },
};
</script>

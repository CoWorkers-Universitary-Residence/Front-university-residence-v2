<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="rounded-xl">
      <v-card-text class="pa-2">
        <div cols="12" class="d-flex align-center justify-space-around">
          <v-btn icon color="black" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="mx-auto"><h3>Log In</h3></div>
          <v-btn icon disabled></v-btn>
        </div>
        <hr class="hr">
        <v-form ref="form" class="mx-8" lazy-validation>
          <h3 class="mt-4">Welcome to University Residence</h3>
          <v-text-field
              label = "Email"
              v-model="user.email"
              :rules="emailRules"
              required
          ></v-text-field>
          <v-text-field
              label = "Password"
              v-model="user.password"
              type="password"
              :rules="passwordRules"
              required
          ></v-text-field>
          <span v-show="incorrectData" class="red--text text-caption">The data entered is not correct</span>
          <h4 class="mt-3">Do you forgot your password?</h4>
          <v-btn color="primary" class="mt-6" block rounded  @click="handleSubmit()">Sign in</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import AuthService from '../services/auth.service'
export default {
  name: "LogIn",
  props: {
    dialog: Boolean
  },
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    response: [],
    emailRules: [
      v => !!v || 'Email is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    incorrectData: false
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.closeForm();
    }
  },
  methods: {
    closeForm(){
      this.dialog = false;
      this.$refs.form.reset();
      this.incorrectData = false;
      this.$emit('dialog-false');
    },
    handleSubmit: function() {
      this.$refs.form.validate();
      if(this.user.email && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            (user) => {
              console.log('Logged In');
              console.log(user);
              this.$emit('set-id-sign-in');
              this.closeForm();
            },
            error => {
              console.log(error);
              this.incorrectData = true;
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>

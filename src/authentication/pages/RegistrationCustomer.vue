<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="rounded-xl">
      <v-card-text class="pa-2">
        <div cols="12" class="d-flex align-center justify-space-around">
          <v-btn icon color="black" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="mx-auto"><h3>Registration Tenant</h3></div>
          <v-btn icon disabled></v-btn>
        </div>
        <hr>
        <v-form ref="form" class="mx-8" lazy-validation>
          <h3 class="mt-4">Welcome to University Residence</h3>
          <v-text-field
              label = "Email"
              v-model="customer.email"
              :rules="emailRules"
              error-count="2"
              required
          ></v-text-field>
          <v-text-field
              label = "Password"
              v-model="customer.password"
              type="password"
              :rules="passwordRules"
              error-count="2"
              required
          ></v-text-field>
          <h3 class="mt-3">Account information</h3>
          <v-row>
            <v-col cols="6">
              <v-text-field label = "Name"
                            v-model="customer.name"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label = "Lastname"
                            v-model = "customer.lastname"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-combobox label = "Gender"
                          v-model="customer.gender"
                          :rules="textRules"
                          :items="items"
                            required
              ></v-combobox>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  required
                  type="date"
                  v-model="customer.date_of_birth"
                  :rules="textRules"
                  label="Date of Birth"
                  class="rounded-pill"
                  placeholder="Enter the date"
                  outlined
                  color="blue">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
          <v-col cols="6">
            <v-text-field label = "Description"
                          v-model="customer.description"
                          :rules="textRules"
                          required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label = "Occupation"
                          v-model = "customer.occupation"
                          :rules="textRules"
                          required
            ></v-text-field>
          </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field label = "Country"
                            v-model="customer.country"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label = "City"
                            v-model = "customer.city"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field cols="6"
                        label = "Phone number"
                        type = 'tel'
                        v-model="customer.phone_number"
                        :rules="phoneNumberRules"
                        required
          ></v-text-field>
          <v-text-field cols="6"
                        label = "Photo URL"
                        v-model="customer.photo"
                        :rules="textRules"
                        required
          ></v-text-field>
          <v-checkbox
              class="my-0"
              label="I accept the terms and conditions of University Residence"
              type="checkbox"
              :rules="checkboxRules"
              required
          ></v-checkbox>
          <v-btn color="primary" class="mb-6" block rounded  @click="handleRegister">Complete</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AuthService from '../services/auth.service'

export default {
  name: "RegistrationCustomer",
  props: {
    dialog: Boolean
  },
  data: () => ({
    customer: {
      email: '',
      password: '',
      name: '',
      lastname: '',
      gender: '',
      date_of_birth: '',
      description: '',
      occupation: '',
      country: '',
      city: '',
      phone_number: 0,
      photo: ''
    },
    items: [
      '',
      'M',
      'F',
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must have at least 6 characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number',
    ],
    textRules: [
      v => !!v || 'Field is required',
    ],
    phoneNumberRules: [
      v => !!v || 'Phone number is required',
      v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999) || 'Phone number can only contain numbers'
    ],
    checkboxRules: [
      v => !!v || 'You must agree to continue!'
    ]
  }),
  methods: {
    closeForm(){
      this.$refs.form.reset();
      this.dialog = false;
      this.$emit('dialog-false');
    },

    async handleRegister(){
      if(this.$refs.form.validate())
      {
        await AuthService.registerTenant(this.customer);
      }
      this.closeForm();
    }
  }
}
</script>

<style scoped>

</style>

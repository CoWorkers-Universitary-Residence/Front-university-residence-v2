<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="rounded-xl">
      <v-card-text class="pa-2">
        <div cols="12" class="d-flex align-center justify-space-around">
          <v-btn icon color="black" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="mx-auto"><h3>Registration Owner</h3></div>
          <v-btn icon disabled></v-btn>
        </div>
        <hr>
        <v-form ref="form" class="mx-8" lazy-validation>
          <h3 class="mt-4">Welcome to University Residence</h3>
          <v-text-field
              label = "Email"
              v-model="agency.email"
              :rules="emailRules"
              error-count="2"
              required
          ></v-text-field>
          <v-text-field
              label = "Password"
              v-model="agency.password"
              type="password"
              :rules="passwordRules"
              error-count="2"
              required
          ></v-text-field>
          <h3 class="mt-3">Agency information</h3>
          <v-row>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "Name"
                            v-model="agency.name"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "Last Name"
                            v-model="agency.lastName"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-combobox label = "Gender"
                          v-model="agency.gender"
                          :rules="textRules"
                          :items="items"
                          required
              ></v-combobox>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  required
                  type="date"
                  v-model="agency.date_of_birth"
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
              <v-text-field cols="6"
                            label = "Description"
                            v-model="agency.description"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "Phone number"
                            type = 'tel'
                            v-model="agency.phone_number"
                            :rules="phoneNumberRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "Country"
                            v-model="agency.country"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "City"
                            v-model="agency.city"
                            :rules="textRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field label = "Address"
                        v-model = "agency.address"
                        :rules="textRules"
                        required
          ></v-text-field>
          <v-text-field label = "Photo URL"
                        v-model = "agency.photo"
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
  name: "RegistrationAgency",
  props: {
    dialog: Boolean
  },
  data: () => ({
    agency: {
      email: '',
      password: '',
      name: '',
      lastName: '',
      gender: '',
      date_of_birth: '',
      description: '',
      phone_number: '',
      country: '',
      city: '',
      address: '',
      photo: '',
      score: 0,
      subscriptionId: 1
    },
    payDialog: false,
    togglePlan: undefined,
    items: [
      '',
      'M',
      'F',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must have at least 6 characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number'
    ],
    textRules: [
      v => !!v || 'Field is required',
    ],
    phoneNumberRules: [
      v => !!v || 'Phone number is required',
      v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999) || 'Phone number can only contain numbers'
    ],
    locationRules: [
      v => !!v || 'Location is required',
    ],
    checkboxRules: [
      v => !!v || 'You must agree to continue!',
    ],
    cardRules: [
      v => !!v || 'Number credit card is required',
    ],
    holderRules: [
      v => !!v || 'Cardholder name is required',
    ],
    campRules: [
      v => !!v || 'This camp is required',
    ]
  }),
  methods: {
    closeForm(){
      this.$refs.form.reset();
      this.dialog = false;
      this.$emit('dialog-false');
    },
    closePayDialog() {
      this.$refs.form.reset();
      this.$refs.payForm.reset();
      this.payDialog = false;
    },
    handleNext(){
      if(this.$refs.form.validate())
      {
        //Close data form
        this.dialog = false;
        this.$emit('dialog-false');
        //Open pay form
        this.payDialog = true;
      }
    },
    async handleRegister(){
      if(this.$refs.form.validate()) {
        await AuthService.registerOwner(this.agency);
      }
      else{
        console.log("Something bad")
      }
      this.closeForm();
    }
  }
}
</script>

<style scoped>
 .personalization {
   max-width: 33.5%;
 }
 .btn-diff {
   text-transform: none;
   display: block;
 }

</style>

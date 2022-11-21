<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="rounded-xl">
      <v-card-text class="pa-2">
        <div cols="12" class="d-flex align-center justify-space-around">
          <v-btn icon color="black" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="mx-auto"><h3>Registration Agency</h3></div>
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
          <v-text-field label = "Agency name"
                        v-model="agency.name"
                        :rules="nameRules"
                        required
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "RUC"
                            type = 'tel'
                            v-model="agency.RUC"
                            :rules="RucRules"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field cols="6"
                            label = "Phone number"
                            type = 'tel'
                            v-model="agency.phoneNumber"
                            :rules="phoneNumberRules"
                            required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field label = "Physical location"
                        v-model = "agency.location"
                        :rules="locationRules"
                        required
          ></v-text-field>
          <v-text-field label = "Description of my agency"
                        v-model = "agency.description"
                        :rules="descriptionRules"
                        required
          ></v-text-field>
          <v-checkbox
              class="my-0"
              label="I accept the terms and conditions of University Residence"
              type="checkbox"
              :rules="checkboxRules"
              required
          ></v-checkbox>
          <v-btn color="primary" class="mb-6" block rounded  @click="handleNext">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!--Pay dialog-->
    <v-dialog v-model="payDialog" persistent max-width="600px">
      <v-card class="rounded-xl">
        <v-card-text class="pa-2">
          <div cols="12">
            <v-btn icon color="black" @click="closePayDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <hr>
          <v-form ref="payForm" class="mx-8" lazy-validation>
            <h3 class="mt-4">Select a subscription plan</h3>

            <div class="personalization">
              <v-btn-toggle v-model="togglePlan" class="pt-4" color="primary" rounded mandatory>
                <v-btn color="white" block>
                  <div class="btn-diff">
                    <div>Basic plan</div>
                    <v-icon color="#CD7F32"> mdi-key </v-icon>
                  </div>
                </v-btn>
                <v-btn color="white" block>
                  <div class="btn-diff">
                    <div>Standard plan</div>
                    <v-icon color="#C0C0C0"> mdi-key </v-icon>
                  </div>
                </v-btn>
                <v-btn color="white" block>
                  <div class="btn-diff">
                    <div>Premium plan</div>
                    <v-icon color="#FFBF00"> mdi-key </v-icon>
                  </div>
                </v-btn>
              </v-btn-toggle>
            </div>

            <h3 class="mt-4">Payment details</h3>
            <v-text-field label = "Credit card number"
                          :rules="cardRules"
                          required
            ></v-text-field>
            <v-text-field label = "Cardholder name"
                          :rules="holderRules"
                          required
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field cols="6"
                              label = "MM/AA"
                              :rules="campRules"
                              required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field cols="6"
                              label = "CVC/CVV"
                              :rules="campRules"
                              required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" class="mb-6 mt-2" block rounded  @click="handleRegister">Complete</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      name: '',
      email: '',
      password: '',
      description: '',
      location: '',
      RUC: '',
      phoneNumber: '',
    },
    payDialog: false,
    togglePlan: undefined,

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must have at least 6 characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number',
      v => /([!@$%])/.test(v) || 'Must have one special character [!@$%]'
    ],
    nameRules: [
      v => !!v || 'Agency name is required',
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
    ],
    RucRules: [
      v => !!v || 'RUC is required',
      v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999) || 'RUC can only contain numbers'
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
      if(this.$refs.payForm.validate()) {
        await AuthService.registerAgency(this.agency);
      }
      this.closePayDialog();
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

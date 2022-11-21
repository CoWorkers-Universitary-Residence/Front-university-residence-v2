<template>
  <v-dialog v-model="dialogSolicit" persistent max-width="600px">
    <v-card class="rounded-xl">
      <v-card-text class="pa-2">
        <div cols="12" class="d-flex align-center justify-space-around">
          <v-btn icon color="black" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="mx-auto"><h3>Pay Service</h3></div>
          <v-btn icon disabled></v-btn>
        </div>
        <hr class="hr">
        <v-form ref="form" class="mx-8 v-border-none" lazy-validation border-none>
          <h3 class="mt-4">Service Selected</h3>
          <v-card class="mt-5 mb-7 rounded-xl">
            <v-row class="px-4">
              <v-col cols="6">
                <v-img class="rounded-xl" v-bind:src="service.photos"></v-img>
              </v-col>
              <v-col cols="6" class="d-flex flex-column justify-center">
                <p class="font-weight-bold">{{service.name}}</p>
                <div class="d-flex">
                  <p class="font-weight-bold text-secondary pr-1">Ofrecido por</p>
                  <span class="font-weight-bold black-text">{{this.agencyName}}</span>
                </div>
              </v-col>
              <v-col cols="6">
                <p><span class="font-weight-bold">Output date:</span> {{dateFormatted}}</p>
                <p><span class="font-weight-bold">People number:</span> {{nPeople}}</p>
              </v-col>
              <v-col cols="6" class="d-flex flex-column align-end">
                <p class="font-weight-bold ma-0">Total amount:</p>
                <p class="font-weight-bold ma-0 title">${{service.price}}.00</p>
              </v-col>
            </v-row>
          </v-card>
          <h3 class="my-4">Payment method</h3>
          <v-text-field outlined required :rules="rules" hide-details type="text" placeholder="Credit/debit card number" solo dense class="rounded-t-xl rounded-b-0"></v-text-field>
          <v-text-field outlined required :rules="rules" hide-details type="text" placeholder="Name of the account holder" solo dense class="rounded-0"></v-text-field>
          <div class="d-flex mb-4">
            <v-text-field outlined required :rules="rules" hide-details type="text" placeholder="MM/YY" solo dense class="rounded-bl-xl rounded-t-0 rounded-r-0"></v-text-field>
            <v-text-field outlined required :rules="rules" hide-details type="text" placeholder="CVC/CVV" solo dense class="rounded-br-xl rounded-t-0 rounded-l-0"></v-text-field>
          </div>
        </v-form>
        <div class="mx-8 d-flex justify-end">
          <v-btn block color="primary" class="mb-2" rounded @click="saveServiceReview">Pay</v-btn>
        </div>

        <!-- Dialog -->
        <v-dialog v-model="dialogConfirmed" max-width="500px">
          <v-card class="rounded-xl pa-4">
            <p class="h6 text-center">Your trip has been registered satisfactorily, the agency will contact you shortly.</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary darken-1" class="pl-2" text @click="gotToProfile">Go to profile</v-btn>
              <v-btn color="primary darken-1" text @click="closeForm">Ok</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import HiredService from '../services/hiredServices.service'
import moment from 'moment'
export default {
  name: "SolicitService",
  props: ['service', 'date', 'nPeople', 'dialogSolicit', 'agencyName'],
  data: () => ({
    errors: [],
    service: [],
    dateOutput: '',
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
    dialogConfirmed: false
  }),
  computed: {
    dateFormatted: function () {
      let dateFormatted = moment(dateFormatted).format('DD/MM/YYYY');
      return dateFormatted;
    }
  },
  methods:{
    closeForm() {
      this.$refs.form.reset();
      this.dialogSolicit = false;
      this.dialogConfirmed = false;
      this.$emit('dialog-solicit-false');
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    setDialogConfirmed() {
      this.dialogConfirmed = !this.dialogConfirmed;
    },
    gotToProfile() {
      this.$router.push({ path: `/customer/profile` });
    },
    saveServiceReview() {
      if (this.validateForm()) {
        let hiredServiceDto = {
          customerId: this.$store.state.auth.user.id,
          serviceId: this.service.id,
          amount: this.nPeople,
          price: this.service.price,
          scheduledDate: this.dateFormatted,
          status: 'pending'
        }
        HiredService.create(hiredServiceDto)
          .then(response => {
            if (response.status === 200) {
              this.setDialogConfirmed();
            }
          })
          .catch(errors => {
            this.errors.push(errors);
          })
      }
    }
  },
  mounted(){
    this.dateOutput = this.date;
  },
}
</script>

<style scoped>
  .text-secondary {
    color: gray;
  }
</style>

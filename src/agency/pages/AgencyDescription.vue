<template>
  <v-container class="pa-0">
    <v-card class="rounded-lg">
      <v-col class="d-flex align-center justify-center">
        <v-img
            class="logo align-center justify-center ma-0"
            :src= "agency.photo">
        </v-img>
      </v-col>
      <div v-if="editInformation == false">
        <v-card-text class="pt-0 pb-0">
          <v-card-title class="pt-0">{{agency.name}}</v-card-title>
          <v-card-subtitle>{{ agency.email }}</v-card-subtitle>
          <v-row align="center" class="mx-3">
            <v-rating
                :value="agency.score"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
            ></v-rating>
          </v-row>
          <v-card-text class="pb-0">
            <p>{{agency.description}}</p>
          </v-card-text>
          <v-card-text class="pt-0 pb-0">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Location</p>
              <p>{{agency.location}}</p>
            </div>
            <div class="d-flex flex-column">
              <p class="font-weight-bold">RUC</p>
              <p>{{ agency.ruc }}</p>
            </div>
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Telephone</p>
              <p>{{agency.phoneNumber}}</p>
            </div>
          </v-card-text>
        </v-card-text>
        <v-card-actions class="justify-center">
          <template>
            <v-btn v-on:click="changeEditInformation" color="primary mb-2" >
              Edit information
            </v-btn>
          </template>
        </v-card-actions>
      </div>
      <v-form v-else class="px-8 py-4">
        <v-row class="pb-0">
          <v-col cols="12">
            <p class="text-help pb-2">Just enter the information you want to edit...</p>
            <v-text-field
              solo dense
              hint="Enter a new agency name"
              v-model="newInformation.name"
              :placeholder="agency.name"
            ></v-text-field>
            <v-text-field
              solo dense
              hint="Enter a new email"
              v-model="newInformation.email"
              :placeholder="agency.email">
            </v-text-field>
            <v-textarea
              solo dense
              auto-grow
              rows="3"
              hint="Enter a new description"
              v-model="newInformation.description"
              :placeholder="agency.description"
              counter="200"
              maxlength="200">
            </v-textarea>
            <v-text-field
              solo dense
              hint="Enter a new location"
              v-model="newInformation.location"
              :placeholder="agency.location">
            </v-text-field>
            <v-text-field
              solo dense
              hint="Enter a new RUC"
              v-model="newInformation.RUC"
              :placeholder="agency.ruc">>
            </v-text-field>
            <v-text-field
              solo dense
              hint="Enter a new phone number"
              v-model="newInformation.phoneNumber"
              :placeholder="agency.phoneNumber">
            </v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <template>
            <v-btn v-on:click="changeEditInformation" color="secondary" >Cancel</v-btn>
            <v-btn v-on:click="save" color="primary" >Save</v-btn>
          </template>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import AgenciesService from '../services/agencies.service'

export default {
  name: "AgencyDescription",
  data: () => ({
    errors: [],
    agency: [],
    id: null,
    editInformation: false,
    newInformation: {
      name: "",
      email: "",
      description: "",
      score: "",
      location: "",
      RUC: "",
      phoneNumber: "",
    },
  }),

  methods: {
    clearInputs() {
      this.newInformation.name = '';
      this.newInformation.email = '';
      this.newInformation.description = '';
      this.newInformation.location = '';
      this.newInformation.RUC = '';
      this.newInformation.phoneNumber = '';
    },
    retrieveAgency(){
      this.id = this.$store.state.auth.user.id;
      AgenciesService.getById(this.id)
      .then((response) =>{
        this.agency = response.data;
      })
      .catch(error => {
        this.errors.push(error);
      })
    },
    changeEditInformation(){
      this.editInformation = !this.editInformation;
    },
    async save(){
      let diff = 0;
      let name = '', email = '', phoneNumber = '', description = '', location = '', ruc = '';

      if (this.newInformation.name.length === 0) name = this.agency.name;
      else { name = this.newInformation.name; diff += 1; }
      if (this.newInformation.email.length === 0) email = this.agency.email;
      else { email = this.newInformation.email; diff += 1; }
      if (this.newInformation.phoneNumber.length === 0) phoneNumber = this.agency.phoneNumber;
      else { phoneNumber = this.newInformation.phoneNumber; diff += 1; }
      if (this.newInformation.description.length === 0) description = this.agency.description;
      else { description = this.newInformation.description; diff += 1; }
      if (this.newInformation.location.length === 0) location = this.agency.location;
      else { location = this.newInformation.location; diff += 1; }
      if (this.newInformation.RUC.length === 0) ruc = this.agency.ruc;
      else { ruc = this.newInformation.RUC; diff +=1; }

      let agencyDto = {
        name: name,
        email: email,
        password: this.agency.password,
        phoneNumber: phoneNumber,
        description: description,
        location: location,
        photo: this.agency.photo,
        score: this.agency.score,
        ruc: ruc
      };

      if (diff >= 1) {
        await AgenciesService.update(this.id, agencyDto)
          .then(response => {
            if (response.status == 200) {
              this.retrieveAgency()
              this.editInformation = false;
              this.clearInputs();
            }
          })
          .catch(error => {
            this.errors.push(error);
          });
      }
    }
  },
  mounted() {
    this.retrieveAgency()
  }
}
</script>

<style scoped>
  .logo{
    border-radius: 50%;
    min-height: 150px;
    max-height: 150px;
    min-width: 150px;
    max-width: 150px;
  }
  .text-help {
    font-size: 14px;
    color: gray;
  }
  p {
    margin: 0 0 5px 0;
  }
</style>

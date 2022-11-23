<template>
  <v-main>
    <v-row>
      <v-col cols="12" class="col-sm-12">
        <v-card class="mb-6 px-6 py-2 rounded-lg">
          <v-card-title class="font-weight-bold pa-0 pt-4 ma-0">Add new publication</v-card-title>
          <v-card-subtitle class="font-weight-bold ma-0 pb-4 pa-0">General information</v-card-subtitle>
          <v-form ref="formAddService" lazy-validation border-none class="v-border-none">
            <v-row>
              <v-col cols="11" class="pl-0">
                <v-text-field
                    v-model="newService.about"
                    :rules="rules"
                    color="primary"
                    placeholder="About"
                    dense
                    solo
                    hide-details
                    required
                    outlined
                    class="rounded-tr-xl rounded-b-0 rounded-l-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.country"
                    :rules="rules"
                    placeholder="Country"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.city"
                    :rules="rules"
                    placeholder="City"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.address"
                    :rules="rules"
                    placeholder="Address"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.rooms"
                    :rules="rules"
                    placeholder="Rooms"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.bathrooms"
                    :rules="rules"
                    placeholder="Bathrooms"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.width"
                    :rules="rules"
                    placeholder="Width (m)"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.height"
                    :rules="rules"
                    placeholder="Height (m)"
                    solo dense
                    hide-details
                    outlined
                    class="rounded-br-xl rounded-t-0 rounded-l-0">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="12">
                <v-card-subtitle class="font-weight-black mx-0 mt-5 pa-0">Price information</v-card-subtitle>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex flex-column">
                <p class="py-0">Price</p>
                <v-text-field :rules="rulesPrice" required outlined solo v-model="newService.price" color="primary" type="number" placeholder="Price monthly" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex flex-column">
                <p class="py-0">Escrow</p>
                <v-text-field :rules="rulesPrice" required outlined solo v-model="newService.escrow" color="primary" type="number" placeholder="Escrow" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="12" class="col-lg-12 d-flex flex-column">
                <p class="py-0">Extra expenses</p>
                <v-text-field :rules="rules" required outlined solo v-model="newService.extra_expenses" color="primary" placeholder="Extra expenses" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="px-4">
            <v-col cols="12">
              <v-card-subtitle class="font-weight-black mx-0 mt-5 pa-0">Other</v-card-subtitle>
            </v-col>
            <v-col cols="12" class="col-lg-6 d-flex flex-column">
              <p class="py-0">Gender</p>
              <v-combobox label = "Gender"
                          v-model="newService.gender"
                          :rules="rules"
                          :items="genders"
                          required
              ></v-combobox>
            </v-col>
            <v-col cols="12" class="col-lg-6 d-flex flex-column">
              <p class="py-0">Allow Visits</p>
              <v-combobox label = "Allow Visits"
                          v-model="newService.visit"
                          :rules="rules"
                          :items="visits"
                          required
              ></v-combobox>
            </v-col>
          </v-row>
          <v-card-actions class="mt-8 mb-4">
            <v-spacer></v-spacer>
            <v-btn min-width="150" class="mr-2" color="secondary" rounded @click="cancelAddService">Cancel</v-btn>
            <v-btn min-width="150" color="primary" rounded @click="continueForm">Finalize</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import ServicesService from '../services/services.service'
export default {
  name: "AddServices",
  components: {},
  data: () => ({
    errors: [],
    rulesActivityName: [
      v => !!v || 'Activity name is required!',
    ],
    rulesActivityDescription: [
      v => !!v || 'Activity description is required!',
    ],
    rulesDate: [
      v => !!v || 'Date is required',
    ],
    rulesPrice: [
      v => !!v || 'Price is required',
    ],
    rules: [
      v => !!v || 'Field is required',
    ],
    genders: [
      'Male',
      'Female',
      'Any'
    ],
    visits: [
        'Yes',
        'No'
    ],
    activities: [],
    search: null,
    newService: {
      about: '',
      country: '',
      city: '',
      address: '',
      rooms: '',
      bathrooms: '',
      width: '',
      height: '',
      price: '',
      escrow: '',
      extra_expenses: '',
      gender: '',
      visit: ''
    },
    activity: {
      name: '',
      description: '',
    },
  }),
  methods: {
    validateFormActivities() {
      return this.$refs.formAddActivity.validate();
    },
    validateFormAddService() {
      return this.$refs.formAddService.validate();
    },
    async continueForm() {
      if (this.validateFormAddService()) {
        let newServiceDto = {
          id: 0,
          about: this.newService.about,
          price: parseInt(this.newService.price),
          escrow: parseInt(this.newService.escrow),
          extra_expenses: this.newService.extra_expenses,
          gender: this.newService.gender,
          availability: true,
          rooms: parseInt(this.newService.rooms),
          bathrooms: this.newService.bathrooms,
          width: parseInt(this.newService.width),
          height: parseInt(this.newService.height),
          country: this.newService.country,
          city: this.newService.city,
          address: this.newService.address,
          visit: this.newService.visit === "Yes",
          views: 0,
          ownerId: this.$store.state.auth.user.id,
          score: 0,
          reviews: 0
        };

        console.log(newServiceDto)

        await ServicesService.create(newServiceDto)
          .then(response => {
            console.log(response.data)
            this.clearInputs();
            //this.cancelAddService();
            location.reload();
          })
          .catch(error => {
            this.errors.push(error);
          })
        }
    },
    clearInputs() {
      this.newService.about = '';
      this.newService.country =  '';
      this.newService.city =  '';
      this.newService.address =  '';
      this.newService.rooms = '';
      this.newService.bathrooms = '';
      this.newService.width =  '';
      this.newService.height =  '';
      this.newService.price =  '';
      this.newService.escrow = '';
      this.newService.extra_expenses = '';
      this.newService.gender = '';
      this.newService.visit = '';
    },
    saveActivity(){
      if (this.validateFormActivities()) {
        let activityDto = {
          name: this.activity.name,
          description: this.activity.description
        }
        this.activities.push(activityDto);
        this.activity.name = null;
        this.activity.description = null;
      }
    },
    async pushActivities(data){
      for(let i = 0; i < this.activities.length; i++){
        this.activities[i].serviceId = data.id;
        await ServicesService.createActivity(this.activities[i])
            .then(response => {
              if (response.status === 200) {
                console.log(response.data);
              }
            })
            .catch(error => {
              this.errors.push(error);
            })
      }
    },
    getServiceId(id){
      this.$router.push({ path: `/agency/add-service/promotion/${id}`})
    },
    cancelAddService(){
      this.$emit('cancelAddService');
    },
    deleteActivity(index){
      this.activities.splice(index, 1);
    }
  },
  beforeMount() {
    //this.newService.agencyId = this.$store.state.auth.user.id;
  },
  onMounted() {

  }
}
</script>

<style scoped>
  .full-size {
    min-width: 100%;
    min-height: 100%;
  }
  .img{
    margin:0px auto;
    width:90%;
    height:100%;
    border: 0px solid black;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    background-size: cover;
  }
  .img img{
    width: 100%;
  }
  @media all and (min-width: 500px) and (max-width: 1000px)
  {
    .img{
      margin:0px auto;
      width:90%;
      height:100%;
      border: 0 solid black;
      background-size: 100% 100%;
      background-repeat:no-repeat;
      background-size: cover;

    }
  }
  .img img{
    width:100%;
  }
</style>

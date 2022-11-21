<template>
  <v-main>
    <v-row>
      <v-col cols="12" class="col-sm-12">
        <v-card class="mb-6 px-6 py-2 rounded-lg">
          <v-card-title class="font-weight-bold pa-0 pt-4 ma-0">Add new service</v-card-title>
          <v-card-subtitle class="font-weight-bold ma-0 pb-4 pa-0">General information</v-card-subtitle>
          <v-form ref="formAddService" lazy-validation border-none class="v-border-none">
            <v-row>
              <v-col cols="4" class="px-0">
                <v-card class="rounded-l-xl rounded-r-0 pr-0 img mr-0">
                  <img height="100% ma-0" class="rounded-r-0 rounded-l-xl" :src="newService.photos" alt="">
                </v-card>
              </v-col>
              <v-col cols="8" class="pl-0">
                <v-text-field
                    v-model="newService.name"
                    :rules="rules"
                    color="primary"
                    placeholder="Service name"
                    dense
                    solo
                    hide-details
                    required
                    outlined
                    class="rounded-tr-xl rounded-b-0 rounded-l-0">
                </v-text-field>
                <v-textarea
                    v-model="newService.description"
                    :rules="rules"
                    placeholder="Service description"
                    counter="300"
                    solo
                    height="60"
                    hide-details
                    dense
                    auto-grow
                    required
                    outlined
                    class="rounded-0">
                </v-textarea>
                <v-text-field
                    v-model="newService.location"
                    :rules="rules"
                    placeholder="Location"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.photos"
                    :rules="rules"
                    placeholder="Url photo"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="newService.video"
                    placeholder="Reference video (optional)"
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
                <v-text-field :rules="rulesPrice" required outlined solo v-model="newService.price" color="primary" type="number" placeholder="Enter the price" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex">
                <div class="mr-2">
                  <p>From: </p>
                  <v-text-field :rules="rulesDate" type="date" solo dense required outlined></v-text-field>
                </div>
                <div class="ml-2">
                  <p>To: </p>
                  <v-text-field :rules="rulesDate" type="date" solo dense required outlined></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-form>
          <v-form>
            <v-row class="px-4">
              <v-col cols="12">
                <v-card-subtitle class="font-weight-black mx-0 mt-5 pa-0">Price offer (Optional)</v-card-subtitle>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex flex-column">
                <p class="py-0">Price</p>
                <v-text-field required outlined solo v-model="newService.newPrice" color="primary" type="number" placeholder="Enter the price" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex">
                <div class="mr-2">
                  <p>From: </p>
                  <v-text-field type="date" solo dense required outlined></v-text-field>
                </div>
                <div class="ml-2">
                  <p>To: </p>
                  <v-text-field :rules="rulesDate" type="date" solo dense required outlined></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-form>
          <v-form ref="formAddActivity">
            <v-col class="px-6">
              <v-row><v-card-subtitle class="font-weight-black ma-0 py-4 px-0">Activities information (Optional)</v-card-subtitle></v-row>
              <v-row>
                <v-col cols="8" class="pa-0 col-lg-10">
                  <v-form ref="formActivities">
                    <v-text-field
                        v-model="activity.name"
                        :rules="rulesActivityName"
                        color="primary"
                        placeholder="Name"
                        solo dense
                        hide-details
                        outlined
                        class="rounded-bl-0 rounded-l-xl pa-0 ma-0">
                    </v-text-field>
                    <v-text-field
                        v-model="activity.description"
                        :rules="rulesActivityDescription"
                        color="primary"
                        placeholder="Description"
                        solo dense
                        hide-details
                        outlined
                        class="rounded-tl-0 rounded-l-xl rounded-r-0 pa-0 ma-0">
                    </v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="4" class="pa-0 col-lg-2">
                  <v-btn color="primary" block class="white-text rounded-l-0 rounded-r-xl full-size" @click="saveActivity">Add Activity</v-btn>
                </v-col>
              </v-row>
              <div v-if="activities != null" class="mt-8">
                <v-card v-for="(act, index) in activities" v-bind:key="index" class="py-1 px-2 mb-2 d-flex align-center secondary rounded-xl">
                  <p class="black-text rounded-xl ma-0 px-2">{{index+1}}: {{act.name}}</p>
                  <v-spacer></v-spacer>
                  <v-btn icon disabled color="blue"><v-icon small>mdi-pencil</v-icon></v-btn>
                  <v-btn icon color="red" @click="deleteActivity(index)"><v-icon small>mdi-delete</v-icon></v-btn>
                </v-card>
              </div>
            </v-col>
          </v-form>
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
      v => !!v || 'Comment is required',
    ],
    activities: [],
    search: null,
    newService: {
      agencyId: null,
      name: '',
      price: '',
      newPrice: '',
      location: '',
      isOffer: 0,
      photos: '',
      description: '',
      video: ''
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

        let date = Date.now();
        let dateNow = new Date(date);
        let isOffer = false, newPrice = 0;
        if (this.newService.newPrice !== '') { isOffer = true; newPrice = this.newService.newPrice }

        let newServiceDto = {
          name: this.newService.name,
          score: 1,
          price: this.newService.price,
          newPrice: newPrice,
          location: this.newService.location,
          creationDate: `${dateNow.getFullYear()}/${dateNow.getMonth()}/${dateNow.getDay()}`,
          photos: this.newService.photos,
          description: this.newService.description,
          isOffer: isOffer,
          agencyId: this.newService.agencyId,
          video: this.newService.video
        };

        await ServicesService.create(newServiceDto)
          .then(response => {
            if (response.status === 200) {
              this.pushActivities(response.data);
              this.clearInputs();
              this.cancelAddService();
              location.reload();
            }
          })
          .catch(error => {
            this.errors.push(error);
          })
        }
    },
    clearInputs() {
      this.newService.agencyId =  null;
      this.newService.name =  '';
      this.newService.price =  '';
      this.newService.newPrice = '';
      this.newService.location = '';
      this.newService.isOffer =  0;
      this.newService.photos =  '';
      this.newService.description = '';
      this.newService.video = '';
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
    this.newService.agencyId = this.$store.state.auth.user.id;
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

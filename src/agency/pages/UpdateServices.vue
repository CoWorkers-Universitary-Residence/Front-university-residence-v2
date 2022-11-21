<template>
  <v-main>
    <v-row>
      <v-col cols="12" class="col-sm-12">
        <v-card class="mb-6 px-6 py-2 rounded-lg">
          <v-card-title class="font-weight-bold pa-0 pt-4 ma-0">Update service</v-card-title>
          <v-card-subtitle class="font-weight-bold ma-0 pb-4 pa-0">General information</v-card-subtitle>
          <v-form ref="formUpdateService" lazy-validation border-none class="v-border-none">
            <v-row>
              <v-col cols="4" class="px-0">
                <v-card class="rounded-l-xl rounded-r-0 pr-0 img mr-0">
                  <img height="100% ma-0" class="rounded-r-0 rounded-l-xl" :src="updateService.photos" alt="">
                </v-card>
              </v-col>
              <v-col cols="8" class="pl-0">
                <v-text-field
                    v-model="updateService.name"
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
                    v-model="updateService.description"
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
                    v-model="updateService.location"
                    :rules="rules"
                    placeholder="Location"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="updateService.photos"
                    :rules="rules"
                    placeholder="Url photo"
                    solo dense
                    hide-details
                    required
                    outlined
                    class="rounded-0">
                </v-text-field>
                <v-text-field
                    v-model="updateService.video"
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
                <v-text-field :rules="rulesPrice" required outlined solo v-model="updateService.price" color="primary" type="number" placeholder="Enter the price" min="0" dense class="rounded-xl"></v-text-field>
              </v-col>
              <v-col cols="12" class="col-lg-6 d-flex">
                <div class="mr-2">
                  <p>From: </p>
                  <v-text-field :rules="rulesDate" type="date" solo dense required outlined ></v-text-field>
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
                <v-text-field :rules="rulesPrice" required outlined solo v-model="updateService.newPrice" color="primary" type="number" placeholder="Enter the price" min="0" dense class="rounded-xl"></v-text-field>
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
          <v-form ref="formUpdateActivity">
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
            <v-btn min-width="150" class="mr-2" color="secondary" rounded @click="cancelUpdateService">Cancel</v-btn>
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
  name: "UpdateServices",
  components: {},
  props: {
    id: Number
  },
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
    service: null,
    updateService: {
      agencyId: null,
      name: '',
      price: '',
      newPrice: '',
      location: '',
      isOffer: false,
      photos: '',
      video: '',
      description: '',
      date: null,
      score: 0,
    },
    activity: {
      name: '',
      description: '',
    },

  }),
  created() {
    ServicesService.getById(this.id).then((response) => {
      this.updateService.name = response.data.name
      this.updateService.description = response.data.description
      this.updateService.agencyId = response.data.agencyId
      this.updateService.price = response.data.price
      this.updateService.location = response.data.location
      this.updateService.photos = response.data.photos
      this.updateService.video = response.data.video
      this.updateService.newPrice = response.data.newPrice
      this.updateService.score = response.data.score
      this.updateService.date = response.data.date
      this.updateService.newPrice = response.data.newPrice
      this.updateService.isOffer = response.data.isOffer
      console.log("===============")
      console.log(response.data)
    })
  },
  methods: {
    validateFormActivities() {
      return this.$refs.formUpdateActivity.validate();
    },
    validateFormUpdateService() {
      return this.$refs.formUpdateService.validate();
    },
    async continueForm() {
      if (this.validateFormUpdateService()) {

        if (this.updateService.newPrice !== '') { this.updateService.isOffer = true; }

        let updateServiceDto = {
          name: this.updateService.name,
          score: this.updateService.score,
          price: this.updateService.price,
          newPrice: this.updateService.newPrice,
          location: this.updateService.location,
          creationDate: "5/3/2019",
          photos: this.updateService.photos,
          video: this.updateService.video,
          description: this.updateService.description,
          isOffer: this.updateService.isOffer,
          agencyId: this.updateService.agencyId
        };
        console.log(updateServiceDto)

        await ServicesService.update(this.id, updateServiceDto)
            .then(response => {

              if (response.status === 200) {
                this.clearInputs();
                this.cancelUpdateService();
                location.reload();
              }
            })
            .catch(error => {
              this.errors.push(error);
            })


      }
    },
    clearInputs() {
      this.updateService.agencyId =  null;
      this.updateService.name =  '';
      this.updateService.price =  '';
      this.updateService.updatePrice = '';
      this.updateService.location = '';
      this.updateService.isOffer =  0;
      this.updateService.photos =  '';
      this.updateService.video =  '';
      this.updateService.description = '';
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
    getServiceId(id){
      this.$router.push({ path: `/agency/add-service/promotion/${id}`})
    },
    cancelUpdateService(){
      this.$emit('cancelUpdateService');
    },
    deleteActivity(index){
      this.activities.splice(index, 1);
    }
  },
  beforeMount() {
    this.updateService.agencyId = this.$store.state.auth.user.id;
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

<template>
  <v-main class="secondary">
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-3">
          <AgencyDescription></AgencyDescription>
        </v-col>
        <v-col cols="12" class="col-md-9" v-if="!createService && !updateService">
          <v-card class="mb-6 px-4 rounded-lg">
            <v-card-title>Services</v-card-title>
            <div class="px-4 d-flex justify-space-between">
              <v-btn
                  depressed dark
                  v-on:click="setOnlyOffer()"
                  v-bind:class="[onlyOffer? active: noActive]">Offers
              </v-btn>
              <v-btn v-on:click="setAddService" dark fab small color="primary">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-row class="px-4 py-2 wrap">
              <v-col cols="12" class="col-md-3 pb-0 pt-1" v-for="(service, index) in services" :key="index">
                <v-card
                    class="my-2"
                    min-height="255"
                    max-height="255"
                >
                  <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                  </template>
                  <v-hover v-slot="{ hover }">
                    <v-img
                        class="rounded-t-lg"
                        height=120
                        :src=service.photos
                    >
                      <v-expand-transition>
                        <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out bg-black-transparent darken-2 v-card--reveal text-h2 white--text"
                            style="height: 100%;"
                        >
                          <v-btn dark fab icon @click="setUpdateService(service.id)"><v-icon color="blue">mdi-pencil</v-icon></v-btn>
                          <v-btn dark fab icon @click="deleteService(service.id)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                  <a v-on:click="goServiceSelected(service.id)">
                    <div class="text-center text-truncate pa-2">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <a class="text-decoration-none font-weight-bold">
                            <p
                                class="black--text h4 truncate-text"
                                v-bind="attrs"
                                v-on="on"
                            >{{ service.name }}</p>
                          </a>
                        </template>
                        <p>{{ service.name }}</p>
                      </v-tooltip>
                    </div>
                    <v-card-text class="d-flex flex-column align-center">
                      <v-row
                          align="center"
                          class="mx-0"
                      >
                        <a class="text-decoration-none">
                          <v-rating
                              :value=service.score
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="20"
                          ></v-rating>
                        </a>
                      </v-row>
                      <div class="pt-3 text-subtitle-1 d-flex flex-row">
                        <a  class="text-decoration-none d-flex">
                          <div v-if="service.isOffer" class="text-decoration-line-through pr-2 black--text">${{service.price}}</div>
                          <div v-if="service.isOffer" class="black--text">${{service.newPrice}}</div>
                          <div v-else class="black--text">${{service.price}}</div>
                        </a>
                      </div>
                    </v-card-text>
                  </a>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mb-4 rounded-lg py-4 px-8">
            <v-card-title class="pa-0">Reviews</v-card-title>
            <v-row>
              <v-col cols="12" class="d-flex flex-row align-center col-md-6">
                <div class="pr-4 col-5">Professionalism</div>
                <v-progress-linear class="col-7" value="100" light background-color="grey" color="black"></v-progress-linear>
              </v-col>
              <v-col cols="12" class="d-flex flex-row align-center col-md-6">
                <div class="pr-4 col-5">Price/Quality</div>
                <v-progress-linear class="col-7" value="100" light background-color="grey" color="black"></v-progress-linear>
              </v-col>
              <v-col cols="12" class="d-flex flex-row align-center col-md-6">
                <div class="pr-4 col-5">Security</div>
                <v-progress-linear class="col-7" value="100" light background-color="grey" color="black"></v-progress-linear>
              </v-col>
              <v-col cols="12" class="d-flex flex-row align-center col-md-6">
                <div class="pr-4 col-5">Costs</div>
                <v-progress-linear class="col-7" value="100" light background-color="grey" color="black"></v-progress-linear>
              </v-col>
            </v-row>
            <div class="mt-4">
              <list-reviews v-bind:typeReview="'agency'" :reviews="reviews"></list-reviews>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-9" v-else-if="createService">
          <add-service v-on:cancelAddService="setAddService"></add-service>
        </v-col>
        <v-col cols="12" class="col-md-9" v-else-if="updateService">
          <update-service :id="serviceId" v-on:cancelUpdateService="setUpdateService(serviceId)"></update-service>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AgencyDescription from "./AgencyDescription";
import AgencyService from '../services/agencies.service';
import ServicesService from '../services/services.service';
import AddService from '../pages/AddServices';
import ListReviews from '../../common/pages/ListReviews';
import UpdateService from "@/agency/pages/UpdateServices";
export default {
  name: "CustomerProfile",
  components: { AgencyDescription, ListReviews, AddService, UpdateService },
  data: () => ({
    errors: [],
    serviceId: 0,
    idAgency: null,
    onlyOffer: 0,
    active: "primary",
    noActive: "secondary",
    services: [],
    reviews: [],
    createService: false,
    updateService: false
  }),
  methods: {
    async getServiceOfAgency(id) {
      await AgencyService.getServices(id)
        .then((response) => {
          this.services = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        })
    },
    async getReviewsOfAgency(id) {
      await AgencyService.getReviews(id)
        .then((response) => {
          this.reviews = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        })
    },
    async deleteService(id) {
      await ServicesService.delete(id)
        .then(response => {
          if (response.status === 200) location.reload();
        })
        .catch(error => {
          this.errors.push(error);
        })
    },
    async getServiceOfferOfAgency() {
      //Fatal error in backend (pending of revision)
      let prov = this.services;
      this.services = [];
      for(let i=0; i < prov.length; i++) {
        if (prov[i].isOffer)
          this.services.push(prov[i]);
      }
      /*
      await AgencyService.getServiceOffer(id)
        .then((response) => {
          this.services = [];
          for(let i=0; i < response.data.length; i++){
            if (response.data[i].isOffer)
              this.services.push(response.data[i]);
          }
        })
        .catch(error => {
          this.errors.push(error);
        })*/
    },

    setOnlyOffer(){
      this.onlyOffer = !this.onlyOffer;
      if (this.onlyOffer) this.getServiceOfferOfAgency();
      else this.getServiceOfAgency(this.idAgency);
    },
    setAddService(){
      this.createService = !this.createService;
    },
    getAgencyId(id){
      this.$router.push({ path: `/agency/add-service/${id}`})
    },
    goServiceSelected(id) {
      this.$router.push({ path: `/services/${id}`})
    },
    setUpdateService(id){
      this.serviceId = id
      this.updateService = !this.updateService
    }
  },
  mounted() {
    this.idAgency = this.$store.state.auth.user.id;
    this.getServiceOfAgency(this.idAgency);
    this.getReviewsOfAgency(this.idAgency);
  },

}
</script>

<style scoped>
  .truncate-text {
    margin: 10px 0 0 0;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bg-black-transparent {
    background-color: rgba(0, 0, 0, .5);
  }
  .v-card--reveal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

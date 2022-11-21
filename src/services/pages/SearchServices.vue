<template>
  <v-main app class="secondary">
    <v-container>
      <v-row class="d-flex flex-md-row flex-xl-column">
        <v-col cols="12" class="col-md-3">
          <v-card class="px-6 py-4 mb-8 rounded-lg">
            <v-subheader class="font-weight-bold title pa-0">Filters</v-subheader>
            <div>
              <v-card-subtitle class="px-0">Price</v-card-subtitle>
              <v-content>
                <v-text-field v-model="minMoney" dense type="number" placeholder="MIN" solo class=""></v-text-field>
                <v-text-field v-model="maxMoney" dense type="number" placeholder="MAX" solo class=""></v-text-field>
                <v-btn v-on:click="byFilterAll(scoreFilter)" class="primary">Ok</v-btn>
              </v-content>
            </div>
            <div class="pt-2">
              <v-card-subtitle class="px-0">Service score</v-card-subtitle>
              <div class="pb-1" v-for="(score, index) in serviceScore" v-bind:key="index">
                <a v-on:click="byFilterAll(score)" v-bind:class="scoreSelected(score)" class="text-decoration-none">
                  <div class="d-flex align-center">
                    <v-rating
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half"
                        size="14"
                        :value="score"
                        readonly
                        class="mr-2"
                        dense
                        color="amber"
                        background-color="black"
                    ></v-rating>
                    <p class="ma-0 black--text">o más</p>
                  </div>
                </a>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-9">
          <v-card min-height="250" class="pa-4 mb-8 rounded-lg">
            <div v-if="this.services.length >= 10">
              <v-card-subtitle class="px-0">More than {{this.services.length}} matches for <span class="font-weight-bold">{{this.word}}</span></v-card-subtitle>
            </div>
            <div v-else>
              <v-card-subtitle class="px-0">Found {{this.services.length}} matches for <span class="font-weight-bold">{{this.word}}</span></v-card-subtitle>
            </div>
            <v-divider></v-divider>
            <div v-if="this.services.length != 0">
              <div class="d-flex flex-column">
                <div>
                  <v-card max-height="180" min-height="180" class="d-flex mt-4 mb-1 rounded-xl" v-for="(service, index) in this.services" v-bind:key="index">
                    <v-row>
                      <v-col cols="4" class="col-4">
                        <a v-on:click="showService(service.id)">
                          <v-img min-width="250px" max-width="250px" min-height="180px" max-height="180px" class="rounded-l-xl banner" :src="service.photos"></v-img>
                        </a>
                      </v-col>
                      <v-col cols="8" class="pa-3 d-flex flex-column justify-center">
                        <a  class="text-decoration-none black--text">
                          <v-card-title v-on:click="showService(service.id)" class="pa-0">{{service.name}}</v-card-title>
                          <v-rating
                              v-bind:value=service.score
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="14"
                          ></v-rating>
                        </a>
                        <div class="d-flex flex-column ma-0">
                          <p class="my-1"><span class="font-weight-bold black--text">Location: </span>{{service.location}}</p>
                          <p class="mb-1">{{service.description}}</p>
                        </div>
                        <p class="font-weight-bold headline ma-0">${{service.price}}</p>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
            <div v-else class="d-flex flex-column justify-center align-center pa-4">
              <img width="150px" src="https://cdn-icons-png.flaticon.com/512/65/65842.png">
              <p>We are sorry, we have not found results for the applied filters</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ServiceSearchService from '../services/services.service'
export default {
  name: "SearchServices",
  data: () => ({
    service: [],
    moreServices: [],
    serviceScore: [4, 3, 2, 1],
    maxMoney: null,
    minMoney: null,
    start: 0,
    limit: 100,
    NUM_MIN: 0,
    NUM_MAX: 99999,
    scoreFilter: 1
  }),
  computed: {
    word: function () {
      this.getServicesByName(this.$route.params.name, this.start, this.limit);
      return this.$route.params.name;
    },
    services: function () {
      return this.service;
    }
  },
  methods: {
    getServicesByName(word, start, limit) {
      ServiceSearchService.getByName(word, start, limit)
          .then((response) => {
            this.service = response.data;
          })
          .catch(e => {
            console.log(e);
          })
    },
    byFilterAll(score) {

      // Others Validations
      let min, max;
      if (this.minMoney === undefined || !this.minMoney) min = this.NUM_MIN;
      else min = this.minMoney;
      if (this.maxMoney === undefined || !this.maxMoney) max = this.NUM_MAX;
      else max = this.maxMoney

      this.scoreFilter = score;

      ServiceSearchService.getByAllFilter(this.word, this.scoreFilter, min, max, this.start, this.limit)
          .then((response) => {
            this.service = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
    },
    filterBy(score) {
      this.scoreFilter = score;
      this.byFilterAll();
    },
    scoreSelected: function (score) {
      if (score == this.scoreFilter) {
        return 'font-weight-bold';
      }
      return 'font-weight-regular';
    },
    showService(serviceId) {
      this.$router.push({ path: `/services/${serviceId}`});
    }
  }
}
</script>

<style scoped>
  .banner {
    position: relative;
    display: inline-block;
    text-align: center;
  }
  .banner-before {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .score {
    font-size: 16px;
  }
</style>

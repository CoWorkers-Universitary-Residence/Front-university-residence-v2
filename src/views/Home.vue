<template>
  <v-main app class="secondary">
    <v-container>
      <v-row class="d-flex flex-md-row flex-xl-column">
        <!--Filters-->
        <v-col cols="12" class="col-md-3"><v-card class="rounded-lg pa-1">
          <v-subheader class="font-weight-bold title">Categories</v-subheader>
          <v-list>
            <a class="text-decoration-none" v-bind:href="'#'+category.id" v-for="(category, index) in categories" v-bind:key="index">
              <v-list-item link >
                <v-list-item-title>{{category.name}}</v-list-item-title>
              </v-list-item>
            </a>
          </v-list>
        </v-card></v-col>
        <!--Sections-->
        <v-col cols="12" class="col-md-9">
          <!-- SECTION: OFFERS -->
          <v-card id="offers" class="py-4 px-8 mb-4 rounded-lg">
            <v-list>
              <v-subheader class="title font-weight-bold pl-0">Economic</v-subheader>
              <v-list-item-group>
                <v-row>
                  <v-col cols="12" class="col-md-3" v-for="service in serviceOffers" v-bind:key="service.id">
                    <v-card class="my-2 text-truncate text-center" min-height="255" max-height="255" v-on:click="setId(service.id)">
                      <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="100"
                            indeterminate
                        ></v-progress-linear>
                      </template>
                      <a><v-img height=120 v-bind:src="service.photo"></v-img></a>
                      <div class="pa-3">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <a class="text-decoration-none font-weight-bold">
                              <p
                                  class="black--text h4 truncate-text"
                                  v-bind="attrs"
                                  v-on="on"
                              >{{ service.about }}</p>
                            </a>
                          </template>
                          <p>{{ service.about }}</p>
                        </v-tooltip>
                        <v-card-text class="d-flex flex-column align-center">
                          <v-row align="center" class="mx-0">
                            <a class="text-decoration-none">
                              <v-rating
                                  :value="service.score"
                                  color="amber"
                                  dense
                                  half-increments
                                  readonly
                                  size="20"
                              ></v-rating>
                            </a>
                          </v-row>
                          <div class="pt-3 text-subtitle-1 d-flex flex-row">
                            <a class="text-decoration-none">
                              <div class="black--text"> {{ `$${service.price}.00` }} </div>
                            </a>
                          </div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-list-item-group>
            </v-list>
          </v-card>

          <!-- SECTION: MORE POPULAR -->
          <v-card id="populars" class="py-4 px-8 mb-4 rounded-lg">
            <v-list>
              <v-subheader class="title font-weight-bold pl-0">Comfortable</v-subheader>
              <v-list-item-group>
                <v-row>
                  <v-col cols="12" class="col-md-3" v-for="service in servicePopulars" v-bind:key="service.id">
                    <v-card class="my-2 text-truncate text-center" min-height="255" max-height="255" v-on:click="setId(service.id)">
                      <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="100"
                            indeterminate
                        ></v-progress-linear>
                      </template>
                      <a><v-img height=120 v-bind:src="service.photo"></v-img></a>
                      <div class="pa-3">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <a class="text-decoration-none font-weight-bold">
                              <p
                                  class="black--text h4 truncate-text"
                                  v-bind="attrs"
                                  v-on="on"
                              >{{ service.about }}</p>
                            </a>
                          </template>
                          <p>{{ service.about }}</p>
                        </v-tooltip>
                        <v-card-text class="d-flex flex-column align-center">
                          <v-row align="center" class="mx-0">
                            <a class="text-decoration-none">
                              <v-rating
                                  :value="service.score"
                                  color="amber"
                                  dense
                                  half-increments
                                  readonly
                                  size="20"
                              ></v-rating>
                            </a>
                          </v-row>
                          <div class="pt-3 text-subtitle-1 d-flex flex-row">
                            <a class="text-decoration-none">
                              <div class="black--text"> {{ `$${service.price}.00` }} </div>
                            </a>
                          </div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-list-item-group>
            </v-list>
          </v-card>

          <!-- SECTION: FOR YOU -->
          <v-card id="forYou" class="py-4 px-8 rounded-lg">
            <v-list>
              <v-subheader class="title font-weight-bold pl-0">Luxury</v-subheader>
              <v-list-item-group>
                <v-row>
                  <v-col cols="12" class="col-md-3" v-for="service in serviceForYou" v-bind:key="service.id">
                    <v-card class="my-2 text-truncate text-center" min-height="255" max-height="255" v-on:click="setId(service.id)">
                      <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="100"
                            indeterminate
                        ></v-progress-linear>
                      </template>
                      <a><v-img height=120 v-bind:src="service.photo"></v-img></a>
                      <div class="pa-3">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <a class="text-decoration-none font-weight-bold">
                              <p
                                  class="black--text h4 truncate-text"
                                  v-bind="attrs"
                                  v-on="on"
                              >{{ service.about }}</p>
                            </a>
                          </template>
                          <p>{{ service.about }}</p>
                        </v-tooltip>
                        <v-card-text class="d-flex flex-column align-center">
                          <v-row align="center" class="mx-0">
                            <a class="text-decoration-none">
                              <v-rating
                                  :value="service.score"
                                  color="amber"
                                  dense
                                  half-increments
                                  readonly
                                  size="20"
                              ></v-rating>
                            </a>
                          </v-row>
                          <div class="pt-3 text-subtitle-1 d-flex flex-row">
                            <a class="text-decoration-none">
                              <div class="black--text"> {{ `$${service.price}.00` }} </div>
                            </a>
                          </div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ServiceServices from '../services/services/services.service'
export default {
  name: "Home",
  props:{
    serviceId: {
      type: String
    }
  },
  data: () => ({
    errors: [],
    start: 0,
    limit: 10,
    serviceOffers: [],
    servicePopulars: [],
    serviceForYou: [],
    categories: [
      { id: 'offers', name: "Economic" },
      { id:'populars', name: "Comfortable" },
      { id: 'forYou', name: "Luxury"}],
    id: ''
  }),

  methods: {
    async filterPublicationsByLowCost() {
      let services = [];
      await ServiceServices.getAll()
        .then(response => {
          services = response.data;
        })
        .catch(errors => {
          this.errors.push(errors);
        });

      let lowPrices = [];

      for(let i = 0; i <= services.length; i++){
        if(services[i]?.price <= 1000){
          lowPrices.push(services[i]);
        }
      }

      return lowPrices;
    },
    async filterPublicationsByMediumCost() {
      let services = [];
      let mediumPrices = [];

      await ServiceServices.getAll()
          .then(response => {
            services = response.data;
          })
          .catch(errors => {
            this.errors.push(errors);
          });

      for(let i = 0; i <= services.length; i++){
        if(services[i]?.price > 1000 && services[i]?.price <= 5000){
          mediumPrices.push(services[i]);
        }
      }

      return mediumPrices;
    },
    async filterPublicationsByHighCost() {
      let services = [];
      let highPrices = [];

      await ServiceServices.getAll()
          .then(response => {
            services = response.data;
          })
          .catch(errors => {
            this.errors.push(errors);
          });

      for(let i = 0; i <= services.length; i++){
        if(services[i]?.price > 5000){
          highPrices.push(services[i]);
        }
      }

      return highPrices;
    },
    setId(i){
      this.id = i
      this.$router.push({ path: `/services/${this.id}`});
    }
  },
  async mounted() {
    this.serviceOffers = await this.filterPublicationsByLowCost();
    this.servicePopulars = await this.filterPublicationsByMediumCost();
    this.serviceForYou = await this.filterPublicationsByHighCost();
  }
}
</script>

<style scoped>
  .truncate-text {
    margin: 10px 0 0 0;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

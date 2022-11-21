<template>
  <v-card class="py-4 px-8 mb-4 rounded-lg">
      <v-list>
        <p>{{ this.AgId }}</p>
        <v-subheader class="title font-weight-bold pl-0"> {{ services.name }}</v-subheader>
        <v-row>
          <v-col>
            <v-subheader> <v-icon color ="blue"> mdi-map-marker-circle </v-icon> {{ services.location }}</v-subheader>
          </v-col>
          <v-col>
            <v-subheader class="title font-weight-bold justify-end"> <v-icon color ="amber"> mdi-star </v-icon>  {{ services.score }}</v-subheader>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col class="d-flex child-flex ">
            <v-img
                :src= services.photos
                :lazy-src="`https://picsum.photos/10/6?image=${125}`"
                aspect-ratio="1"
                max-height="200"
                class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col class="d-flex child-flex justify-center">
            <v-row>
              <v-col
                  v-for="n in 4"
                  :key="n"
                  class="d-flex child-flex"
                  cols="5"
              >
                <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    max-height="85"
                    class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                      <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-list-item-group>
          <v-row>
            <v-col cols = "1">
              <v-img :src="`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxU5N0gjC5KeKFAVkh-sN7ogtf4lSQ_WsMJQ&usqp=CAU`"
                     max-height="75px"
                     max-width="75px"
                     class="logo"
              ></v-img>
            </v-col>
            <v-col>
              <v-subheader>Offered by {{ agency.name }}</v-subheader>
              <v-subheader class="align-lg-start">Registered agency since October 2020</v-subheader>
            </v-col>
            <v-col>
              <v-subheader class="font-weight-bold title justify-end">${{ services.price }}</v-subheader>
            </v-col>
          </v-row>
          <v-subheader class="font-weight-bold align-lg-start">{{ services.description }}</v-subheader>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>

<script>
import ServicesService from "../../agency/services/services.service";
import AgenciesService from "../services/agencies.service";
export default {
  name: "AgencyInfo",
  props: ['Sid','AgId'],
  data: () => ({
    errors: [],
    services: [],
    agency: [],
    aId: " "
  }),
  methods: {
    async retrieveServices(){
      await ServicesService.getById(this.Sid)
        .then((response) => {
          this.services = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        })
    },
    async retrieveAgency(){
      await AgenciesService.getById(this.AgId)
        .then((response) =>{
          this.agency = response.data;})
        .catch(error => {
          this.errors.push(error);
        })
    }
  },
  mounted() {
    this.retrieveServices();
    this.retrieveAgency();
  },
}
</script>


<style scoped>
.logo{
  margin-top: 25px;
  border-radius: 50%;
}

</style>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-3">
          <AgencyDescription></AgencyDescription>
        </v-col>
        <v-col cols="12" class="col-md-9">
          <v-card class="mb-6">
            <v-card-title class="mb-2 font-weight-bold tpromotion">Add new service</v-card-title>
            <v-text class="ma-4 font-weight-medium sbpromotion">Promote service</v-text>
            <br>
            <v-text class="ma-4 font-weight-medium">Promote your service and reach more customers</v-text>
            <br>
            <v-text class="ma-4 font-weight-medium">Agencies that promote their service have a greater relevance when customers are searching</v-text>
            <v-divider></v-divider>
            <v-row>
              <v-text class="ml-6 pt-10">Duration of the promotion</v-text>
              <v-col cols="4.25">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="start_date" label="Start Date" outlined dense prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" class="rounded-xl mx-4 pt-6"></v-text-field>
                  </template>
                  <v-date-picker v-model="start_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(start_date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4.25">
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="end_date" label="End Date" outlined dense prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" class="rounded-xl mx-4 pt-6"></v-text-field>
                  </template>
                  <v-date-picker v-model="end_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu1.save(end_date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-text class="ml-7 pt-10">Total Price</v-text>
              <v-text-field class="mx-6 pt-8 py-4" placeholder="0.00"  suffix="USD" hint="Daily Price for promotion 0.00 USD" persistent-hint rounded dense outlined></v-text-field>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-text class="ml-6 pt-10">Payment Method</v-text>
              <v-col cols="10">
                <template>
                  <v-container fluid>
                    <v-combobox color="primary" :items="items" label="Credit Card" :search-input.sync="search" class="rounded-xl pt-3" outlined dense hide-selected prepend-inner-icon="mdi-card"></v-combobox>
                  </v-container>
                </template>
              </v-col>
            </v-row>
            <v-btn to="/agency/profile" class="ma-6 black--text float-right" color="primary" rounded>Continue</v-btn>
            <v-btn to="/agency/profile" class="ma-6 black--text float-right" color="primary" rounded>Skip</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AgencyDescription from "./AgencyDescription";

export default {
  name: "PromoteService",
  components: { AgencyDescription },
  data: () => ({
    start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    items: ['Tarjeta01 xxxx - xxxx - xxxx - xx45', 'Tarjeta02 xxxx - xxxx - xxxx - xx54'],
    item: {
      id: '',
    }
  }),
  beforeMount() {
    this.item.id = this.$route.params.id;
  },
}
</script>

<style scoped>
.sbpromotion{
  font-size: 1.2rem;
}
.tpromotion{
  font-size: 1.25rem;
}
</style>
<template>
  <v-main class="secondary">
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-3">
          <!--Profile-->
          <customer-info></customer-info>
        </v-col>
        <v-col cols="12" class="col-md-9">
          <v-card class="pt-md-4 pa-4" >
            <h2 class="mb-6 title font-weight-bold">Hired services</h2>
            <!--servicios-->
            <customer-services></customer-services>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CustomerInfo from "./CustomerInfo";
import CustomerServices from "./CustomerServices";
export default {
  name: "CustomerProfile",
  components: {CustomerServices, CustomerInfo}
}
</script>

<style scoped>

</style>

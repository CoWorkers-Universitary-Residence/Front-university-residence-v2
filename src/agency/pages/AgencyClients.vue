<template>
  <v-main class="secondary">
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-3">
          <AgencyDescription></AgencyDescription>
        </v-col>
        <v-col cols="12" class="col-md-9">
          <v-card class="pt-md-4">
            <hired-services></hired-services>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AgencyDescription from "./AgencyDescription";
import HiredServices from "./HiredServices";
export default {
  name: "AgencyClients",
  components: {HiredServices, AgencyDescription}
}
</script>

<style scoped>

</style>
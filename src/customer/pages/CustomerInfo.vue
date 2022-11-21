<template>
<v-card v-if="!editInfo" class="pt-md-4">
  <div>
    <v-img
        class="mt-2 imgProfile"
        :src="customer.photo"
    ></v-img>
  </div>
  <v-card-text class="mx-3">
    <h3 class="black--text"> {{customer.name + " " + customer.lastName}} </h3>
    <p class="grey--text"> {{ customer.email }}</p>
    <div>
      <h4 class="black--text"> Phone number: </h4>
      <p class="grey--text font-italic"> {{customer.phoneNumber}} </p>
    </div>
  </v-card-text>
</v-card>
</template>

<script>
import CustomersService from '../services/customers.service'

export default {
  name: "CustomerInfo",
  data: () => ({
    errors: [],
    editInfo: false,
    customer: [],
  }),
  methods: {
    retrieveCustomer(){
      CustomersService.getById(this.$store.state.auth.user.id)
        .then(response => {
          this.customer = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        })
    }
  },
  mounted(){
    this.retrieveCustomer();
  }
}
</script>

<style scoped>
.imgProfile {
  margin: auto;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  max-height: 50%;
  max-width: 50%;
}
</style>

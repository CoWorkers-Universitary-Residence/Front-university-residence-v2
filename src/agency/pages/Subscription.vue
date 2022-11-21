<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card class="rounded-xl">
        <v-card-text class="pa-2">
          <div cols="12">
            <v-btn icon color="black" @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <hr>
          <v-form ref="payForm" class="mx-8" lazy-validation>
            <h3 class="mt-4">Select a subscription plan</h3>
            <div class="personalization">
              <v-btn-toggle v-model="togglePlan" class="pt-4" color="primary" rounded mandatory>
                <v-btn color="white" v-for="subscription in subscriptions" :key="subscription.id" height="140px">
                  <div class="btn-diff">
                    <div class="my-2 text-h5"><strong>{{subscription.name}}</strong></div>
                    <div class="my-2">{{subscription.description}}</div>
                    <div class="my-2 text-h6">${{subscription.price}}</div>
                    <v-icon class="mb-2">mdi-key</v-icon>
                  </div>
                </v-btn>
              </v-btn-toggle>
            </div>
            <h3 class="mt-4">Payment details</h3>
            <v-text-field label = "Credit card number"
                          required
            ></v-text-field>
            <v-text-field label = "Cardholder name"
                          required
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field cols="6"
                              label = "MM/AA"
                              required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field cols="6"
                              label = "CVC/CVV"
                              required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="mx-8">
            <v-btn color="primary" class="mt-6" block rounded @click="updateSubscription">Update</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SubscriptionService from '../services/subscription.service';

export default {
  name: "Subscription",
  props: {
    dialog: Boolean
  },
  data: () => ({
    id : '',
    subscriptions: [],
    togglePlan: undefined
  }),
  methods: {
    closeForm(){
      this.$refs.payForm.reset();
      this.dialog = false;
      this.$emit('dialog-false');
    },
    getDisplaySubscription(subscription) {
      return {
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        description: subscription.description
      }
    },
    retrieveSubscriptions(){
      SubscriptionService.getAll()
          .then((response) => {
            this.subscriptions = response.data.map(this.getDisplaySubscription);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
    },
    updateSubscription() {
      if(this.$refs.payForm.validate())
      {
        SubscriptionService.update(this.subscription);
      }
      this.closeForm();
    }
  },
  mounted() {
    this.retrieveSubscriptions();
  }
}
</script>

<style scoped>
.personalization {
  max-width: 33.5%;
}
.btn-diff {
  text-transform: none;
  display: block;
}
</style>

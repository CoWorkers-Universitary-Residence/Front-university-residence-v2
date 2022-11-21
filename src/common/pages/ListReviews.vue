<template>
  <div>
    <div v-if="Object.keys(reviews).length === 0">
      <div class="d-flex justify-center align-center">
        <v-img
            max-height="100px"
            max-width="100px"
            src="https://i.ibb.co/82q8FhX/65842.png">
        </v-img>
      </div>
      <div class="d-flex justify-center">
        <p>You still do not have user reviews, get
          customers by promoting your services</p>
      </div>
    </div>
    <v-card v-for="(review, index) in reviews" v-bind:key="index" class="pa-4 mb-4">
      <div class="d-flex align-center">
        <v-avatar><img v-bind:src="review.customer.photo"></v-avatar>
        <div>
          <v-card-title>{{review.customer.name}} {{review.customer.lastName}}</v-card-title>
          <v-card-subtitle>{{review.date}}</v-card-subtitle>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-icon color ="amber"> mdi-star </v-icon>
          <p>{{extractScore(review)}}</p>
        </div>
      </div>
      <v-card-text>
        <p>{{review.comment}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Reviews",
  props:['reviews', 'typeReview'],
  data: () => ({
    score: 0,
    typeUser: 'agency'
  }),
  methods: {
    calcScore(review) {
      return (review.professionalismScore + review.securityScore + review.qualityScore +  review.costScore) / 4;
    },
    extractScore(review) {
      if (this.typeReview === 'agency') return this.calcScore(review);
      else if (this.typeReview === 'service') return review.score;
    }
  },
  mounted() {
    this.typeUser = this.$store.state.auth.typeUser;
  }
}
</script>

<style scoped>
  .logo{
    border-radius: 50%;
  }
</style>

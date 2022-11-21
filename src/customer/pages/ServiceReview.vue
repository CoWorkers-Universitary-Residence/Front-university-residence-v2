<template>
  <v-row justify="center">
    <v-dialog v-model="dialogService" persistent max-width="600px">
      <v-card class="rounded-xl">
        <v-card-text class="pa-2">
          <div cols="12" class="d-flex align-center justify-space-around">
            <v-btn icon color="black" @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="mx-auto"><h3>Service review</h3></div>
            <v-btn icon disabled></v-btn>
          </div>
          <hr class="hr">
          <v-form ref="form" class="mx-8 v-border-none" lazy-validation border-none>
            <h3 class="mt-4">Overall service score</h3>
            <p>Enter a score from 0.0 to 5.0</p>
            <v-text-field
                class="mt-2 rounded-lg"
                placeholder = "Your rating is..."
                oninput="if(this.value <= 0) this.value = 1; else if (this.value > 5) this.value = 5;"
                type="number"
                min="0"
                max="5"
                required
                solo
                dense
                v-model="score"
                :rules="scoreRules"
            ></v-text-field>
            <h3 class="my-4">Comment (optional)</h3>
            <v-textarea
                class="rounded-lg "
                auto-grow
                solo
                rows="3"
                row-height="25"
                placeholder="Your comment.."
                counter="360"
                maxlength="360"
                v-model="message"
                :rules="commentRules"
            ></v-textarea>
          </v-form>
          <div class="mx-8 d-flex justify-end">
            <v-btn color="primary" class="mt-6 btn-size" rounded @click="saveServiceReview">Continue</v-btn>
          </div>
          <!-- Dialog Finish -->
          <v-dialog v-model="dialogContinue" max-width="500px">
            <v-card class="rounded-xl pa-4">
              <p class="h6 text-center">The service was satisfactorily rated!</p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="continueForm">Continue</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ServiceReviewService from '../services/service-review.service'
export default {
  name: "CustomerReviews",
  computed: {
  },
  props: {
    errors: [],
    service: [],
    dialogService: Boolean,
    idService: Number
  },
  data: () => ({
    score: null,
    message: '',
    commentRules: [
      v => !!v || 'Comment is required',
    ],
    scoreRules: [
      v => !!v || 'Score is required',
    ],
    dialogContinue: false
  }),
  methods: {
    closeForm: function (){
      this.$refs.form.reset();
      this.dialogService = false;
      this.$emit('dialog-service-false');
    },
    continueForm: function () {
      this.$refs.form.reset();
      this.dialogAgency = true;
      this.dialogContinue = false;
      this.$emit('dialog-continue');
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    setDialogContinue() {
      this.dialogContinue = !this.dialogContinue;
    },
    async saveServiceReview(){
      let isCorrect = this.validateForm();

      if (isCorrect) {
        let time = Date.now();
        let dateNow = new Date(time);
        let saveServiceReview = {
          serviceId: this.service.serviceId,
          customerId: this.$store.state.auth.user.id,
          date: dateNow.toDateString(),
          comment: this.message,
          score: Number(this.score)
        };
        console.log(saveServiceReview);
        await ServiceReviewService.create(saveServiceReview)
            .then(response => {
              if (response.status === 200) this.setDialogContinue();
            })
            .catch(e => {
              this.errors.push(e.message);
            });
      }
    }
  }
}
</script>

<style scoped>
  .v-border-none {
    border: 0px solid white;
  }
  .hr {
    border-top: 1px solid gray;
    border-bottom: 0px solid white;
    height: 0px;
  }
  .btn-size {
    width: 150px;
  }
</style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialogAgency" persistent max-width="600px">
      <v-card class="rounded-xl">
        <v-card-text class="pa-2">
          <div cols="12" class="d-flex align-center justify-space-around">
            <v-btn icon color="black" @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="mx-auto"><h3>Agency review</h3></div>
            <v-btn icon disabled></v-btn>
          </div>
          <hr class="hr">
          <v-form ref="form" class="mx-8 v-border-none" lazy-validation border-none>
            <h3 class="mt-4">Agency score</h3>
            <p>Enter a score from 0.0 to 5.0</p>
            <v-row wrap>
              <v-col cols="6" v-for="(score, index) in scores" v-bind:key="index">
                <p>{{score.name}}</p>
                <v-text-field
                    v-model="score.score"
                    type="number"
                    placeholder="Your rating is..."
                    solo
                    dense
                    :rules="scoreRules"
                    oninput="if(this.value <= 0) this.value = 1; else if (this.value > 5) this.value = 5;"
                ></v-text-field>
              </v-col>
            </v-row>
            <h3 class="my-4">Comment (optional)</h3>
            <v-textarea
                v-model="message"
                class="rounded-lg "
                auto-grow
                solo
                rows="3"
                row-height="25"
                placeholder="Your comment.."
                counter="360"
                maxlength="360"
                :rules="messageRules"
            ></v-textarea>
          </v-form>
          <div class="mx-8 d-flex justify-end">
            <v-btn color="secondary" class="mt-6 btn-size mr-2" v-on:click="setDialogOmit" rounded>Omit</v-btn>
            <v-btn color="primary" class="mt-6 btn-size" v-on:click="saveAgencyReview" rounded>Finish</v-btn>
          </div>
          <!-- Dialog Finish -->
          <v-dialog v-model="dialogFinish" max-width="500px">
            <v-card class="rounded-xl pa-4">
              <p class="h6 text-center">The rating of the agency has been done correctly,
                <span class="font-weight-bold">the University Residence community thanks you!</span></p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="finishAllDialog">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Dialog Omit -->
          <v-dialog v-model="dialogOmit" max-width="500px">
            <v-card class="rounded-xl pa-4">
              <p class="h6 text-center">Are you sure you don't qualify the agency that carried out your service?</p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary darken-1" text @click="setDialogOmit">No</v-btn>
                <v-btn color="primary darken-1" text @click="finishAllDialog">Yes</v-btn>
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
import AgencyReviewService from '../services/agency-review.service'
import ServicesService from '../services/services.service'
export default {
  name: "AgencyReview",
  props: {
    service: [],
    dialogAgency: Boolean,
  },
  data: () => ({
    errors: [],
    scores: [
      { name: 'Professionalism', score: null },
      { name: 'Quality', score: null },
      { name: 'Security', score: null },
      { name: 'Costs', score: null }
    ],
    scoreRules: [
      v => !!v || 'Score is required',
    ],
    message: '',
    messageRules: [
      v => !!v || 'Comment is required',
    ],
    dialogFinish: false,
    dialogOmit: false,
  }),
  methods: {
    closeForm(){
      this.$refs.form.reset();
      this.dialogAgency = false;
      this.$emit('dialog-agency-false');
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    setDialogFinish() {
      this.dialogFinish = !this.dialogFinish;
    },
    setDialogOmit() {
      this.dialogOmit = !this.dialogOmit;
    },
    finishAllDialog() {
      this.dialogOmit = false;
      this.dialogOmitOk = false;
      this.dialogAgency = false;
      this.dialogFinish = false;
      this.$emit('dialog-agency-false');
      this.$refs.form.reset();
    },
    async getAgencyId(serviceId) {
      let agencyId;
      await ServicesService.getById(serviceId)
        .then(response => {
          agencyId = response.data.agencyId;
        })
        .catch(e => {
          this.errors.push(e.message);
          agencyId = -1;
        });
      return agencyId;
    },
    async saveAgencyReview() {
      let isCorrect = this.validateForm();
      if (isCorrect) {
        let now = Date.now();
        let dateNow = new Date(now);

        let agencyId = await this.getAgencyId(this.service.serviceId);

        let agencyReviewDto = {
          agencyId: agencyId,
          customerId: this.$store.state.auth.user.id,
          date: dateNow.toDateString(),
          comment: this.message,
          professionalismScore: this.scores[0].score,
          securityScore: this.scores[2].score,
          qualityScore: this.scores[1].score,
          costScore: this.scores[3].score
        };
        await AgencyReviewService.create(agencyReviewDto)
          .then(response => {
            if (response.status === 200) this.setDialogFinish();
          })
          .catch(e => {
            this.errors.push(e.message);
          })
      }
      else {
        this.validateForm();
      }
    },
  }
}
</script>

<style scoped>
  .btn-size {
    width: 150px;
  }
</style>

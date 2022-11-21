<template>
  <v-row justify="center">
    <v-dialog v-model="dialogReport" persistent max-width="600px">
      <v-card class="rounded-xl">
        <v-card-text class="pa-2">
          <div cols="12" class="d-flex align-center justify-space-around">
            <v-btn icon color="black" @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="mx-auto"><h3>Report Service</h3></div>
            <v-btn icon disabled></v-btn>
          </div>
          <hr class="hr">
          <v-form ref="form" class="mx-8 v-border-none" lazy-validation border-none>
            <h3 class="my-4">Write below why you want to report this service</h3>
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
            <v-btn color="primary" class="mt-6 btn-size" rounded @click="saveReport">Continue</v-btn>
          </div>
          <!-- Dialog Finish -->
          <v-dialog v-model="dialogContinue" max-width="500px">
            <v-card class="rounded-xl pa-4">
              <p class="h6 text-center">The report was satisfactorily saved!</p>
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
import ReportServiceService from "@/customer/services/report-service.service";

export default {
  name: "ReportService",
  props: {
    errors: [],
    service: [],
    dialogReport: Boolean,
    idService: Number
  },
  data: () => ({
    message: '',
    commentRules: [
      v => !!v || 'Comment is required',
    ],
    dialogContinue: false
  }),
  methods: {
    closeForm: function (){
      this.$refs.form.reset();
      this.dialogReport = false;
      this.$emit('dialog-service-false');
    },
    continueForm: function () {
      this.$refs.form.reset();
      this.dialogContinue = false;
      this.closeForm();
      //this.$emit('dialog-continue');
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    setDialogContinue() {
      this.dialogContinue = !this.dialogContinue;
    },
    async saveReport(){
      let isCorrect = this.validateForm();

      if (isCorrect) {
        let time = Date.now();
        let dateNow = new Date(time);
        let saveReport = {
          serviceId: this.service.serviceId,
          customerId: this.$store.state.auth.user.id,
          date: dateNow.toDateString(),
          comment: this.message,
        };
        console.log(saveReport);
        await ReportServiceService.create(saveReport)
            .then(() => {
              this.setDialogContinue();
            })
            .catch(e => {
              this.setDialogContinue();
              this.errors.push(e.message);
            });
        this.$router.go(0);
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

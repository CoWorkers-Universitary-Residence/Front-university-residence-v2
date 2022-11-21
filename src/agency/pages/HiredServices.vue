<template>
  <v-row align="center" class="pa-4">
    <v-col cols="12">
      <h2 class="mb-3 title font-weight-bold">Hired services</h2>
      <div class="d-flex justify-end">
        <v-btn color="primary" class="mb-3">Download</v-btn>
      </div>
      <v-card class="mx-auto">
        <v-data-table :headers="headers" :items="hiredServices" sort-by="name" class="elevation-1" show-group-by>
          <template v-slot:item.status="props">
            <v-edit-dialog large persistent v-on:save="saveEditDialog(props)">
              <div>{{ props.item.status }}</div>
              <template v-slot:input>
                <div class="mt-4 text-h6">
                  Update status
                </div>
                <v-select
                  :items = "serviceStatus"
                  v-model="props.item.status"
                  label="Edit"
                ></v-select>
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import HiredService from '../services/hiredServices.service'

export default {
  name: "hired-services",
  data: () => ({
    errors: [],
    headers: [
      {text: 'Name and lastname', align: 'start', value: 'customer.name', groupable: false},
      {text: 'Email', align: 'left', value: 'customer.email', sortable: false, groupable: false},
      {text: 'Phone', align: 'left', value: 'customer.phoneNumber', sortable: false, groupable: false},
      {text: 'Quantity (people)', align: 'left', value: 'amount', groupable: false},
      {text: 'Service', align: 'left', value: 'service.name'},
      {text: 'Departure date', align: 'left', value: 'scheduledDate', groupable: false},
      {text: 'Mount', align: 'left', value: 'price', groupable: false},
      {text: 'Status', align: 'left', value: 'status', groupable: false},
    ],
    hiredServices: [],
    dialogChangeStatus: false,
    dialogDelete: false,
    editIndex: -1,
    editedItem: {
      name: '',
      email: '',
      phoneNumber: '',
      amount: '',
      service: '',
      scheduledDate: '',
      price: 0,
      status: ''
    },
    serviceStatus: ['pending', 'active', 'finished'],
  }),
  watch: {
    dialogChangeStatus(val) {
      val || this.closed(); console.log("here");
    },
    dialogDelete(val) {
      val || this.dialogDelete();
    }
  },
  methods: {
    retrieveHiredServices() {
      HiredService.getExtendInformation(this.$store.state.auth.user.id, "true")
      .then(response => {
        this.hiredServices = response.data;
        for (let i = 0; i < response.data.length; i++){
          let name = `${response.data[i].customer.name} ${response.data[i].customer.lastName}`;
          this.hiredServices[i].customer.name = name;
        }
      })
      .catch(error => {
        this.errors.push(error);
      })
      console.log(this.hiredServices)
    },
    refreshList() {
      this.retrieveHiredServices();
    },
    async editStatusService(id, item) {
      let hiredServiceDto = {
        customerId: item.customerId,
        serviceId: item.serviceId,
        amount: item.amount,
        price: item.price,
        scheduledDate: item.scheduledDate,
        status: item.status
      };
      console.log(hiredServiceDto);
      await HiredService.update(id, hiredServiceDto)
        .then(response => {
          if(response.status === 200) console.log("Ready!");
        })
        .catch(error => {
          this.errors.push(error);
          console.log("error");
        })
    },
    saveEditDialog(props) {
      this.editStatusService(props.item.id, props.item);
    },
    cancelEditDialog(item, props) {
      props.item.status = item.status;
    },
    changeStatusItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editStatusService(item);
      this.dialogChangeStatus = true;
    },
    deleteItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    closeChangeStatus() {
      this.dialogChangeStatus = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    }
  },
  mounted() {
    this.retrieveHiredServices();
  }
}
</script>

<style scoped>

</style>

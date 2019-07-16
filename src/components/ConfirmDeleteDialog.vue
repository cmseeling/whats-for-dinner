<template>
  <v-dialog v-model="isOpen" max-width="300">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this {{itemTypeText}}?</v-card-title>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" @click="$emit('dialog:confirm')">Ok</v-btn>
        <v-btn color="error" @click="$emit('dialog:cancel')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ConfirmDeleteDialog',
  props: {
    isOpen: Boolean,
    itemTypeText: {
      type: String,
      default: 'item'
    }
  }
});
</script>

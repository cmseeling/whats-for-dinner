<template>
  <v-list-item tag="li" class="pa-0 line-item">
    <v-list-item-icon class="ma-0">
      <v-btn class="remove-item-button" color="error" @click="$emit('line-item:remove', index)" text icon>
        <v-icon small>fa fa-times</v-icon>
      </v-btn>
    </v-list-item-icon>
    <v-list-item-content class="pa-0">
      <div class="item-text" v-if="!isEditing">
        {{itemText}}
      </div>
      <div class="item-text" v-else>
        <v-text-field class="edit-item-input" :label="label" v-model="itemText" autofocus @keyup.enter="saveChanges"/>
      </div>
    </v-list-item-content>
    <v-list-item-action class="ma-0">
      <v-btn class="edit-item-confirm" color="success" @click="saveChanges" small text icon v-if="isEditing">
        <v-icon small>fa fa-save</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action class="ma-0">
      <v-btn class="edit-item-button" small text icon @click="isEditing = !isEditing">
        <v-icon small>fa fa-edit</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  isEditing: boolean;
  itemText: string;
}

export default Vue.extend({
  name: 'LineItem',
  props: {
    index: Number,
    text: String,
    label: String
  },
  data(): Data {
    return {
      isEditing: false,
      itemText: this.text
    };
  },
  // mounted() {
  //   console.log('line item: ' + this.index);
  // },
  methods: {
    saveChanges() {
      // console.log(this.itemText);
      this.$emit('line-item:update', {text: this.itemText, index: this.index});
      this.isEditing = false;
    }
  }
});
</script>

<style scoped>
  .item-text {
    padding-bottom: 2px;
  }
</style>
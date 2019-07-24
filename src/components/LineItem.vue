<template>
  <v-container tag="li" class="pa-0 line-item" fill-height>
    <v-layout align-center v-if="!isEditing">
      <v-flex shrink>
        <v-btn class="remove-item-button" color="error" @click="$emit('line-item:remove', index)" text icon>
          <v-icon small>fa fa-times</v-icon>
        </v-btn>
      </v-flex>
      <v-flex class="item-text">
        {{itemText}}
      </v-flex>
      <v-flex shrink>
        <v-btn class="edit-item-button" small text icon @click="isEditing = !isEditing">
          <v-icon small>fa fa-edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout align-center v-else>
      <v-flex shrink>
        <v-btn class="remove-item-button" color="error" @click="$emit('line-item:remove', index)" text icon>
          <v-icon small>fa fa-times</v-icon>
        </v-btn>
      </v-flex>
      <v-flex class="item-text">
        <v-layout align-center row>
          <v-flex>
            <v-text-field class="edit-item-input" :label="label" v-model="itemText" autofocus @keyup.enter="saveChanges"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex shrink>
        <v-btn class="edit-item-confirm" color="success" @click="saveChanges" small text icon>
          <v-icon small>fa fa-save</v-icon>
        </v-btn>
        <v-btn class="edit-item-button" small text icon @click="isEditing = !isEditing">
          <v-icon small>fa fa-edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
  methods: {
    saveChanges() {
      console.log(this.itemText);
      this.$emit('line-item:update', {text: this.itemText, index: this.index});
    }
  }
});
</script>

<style scoped>
  .item-text {
    padding-bottom: 2px;
  }
</style>
<template>
  <v-layout column>
    <v-flex class="schedule-day">
      {{day}}
    </v-flex>
    <div class="schedule-block elevation-1" v-for="slot in slots" :key="slot.id" @click="setActive(slot.id)">
      <v-container :class="slot.selected ? 'meal-slot selected' : 'meal-slot'">
        <v-layout align-center>
          <v-flex>
            <span class="no-item" v-if="slot.recipeIds.length === 0">None selected</span>
            <span class="slot-count" v-else>{{slot.recipeIds.length}} recipes</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMealSlot } from '../../state/interfaces/ScheduleState';

@Component
export default class DekstopSlot extends Vue {
  @Prop() public day!: string;
  @Prop() public slots!: IMealSlot[];
  @Prop() public setActive!: (slotId: number) => void;
}
</script>

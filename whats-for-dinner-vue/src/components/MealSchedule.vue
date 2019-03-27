<template>
    <div class="schedule card">
        <div class="schedule-header card-header">
            <h2 class="card-title float-left">Schedule</h2>
        </div>
        <div class="schedule-table card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Su</th>
                        <th scope="col">M</th>
                        <th scope="col">Tu</th>
                        <th scope="col">W</th>
                        <th scope="col">Th</th>
                        <th scope="col">F</th>
                        <th scope="col">Sa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Breakfast</th>
                        <td v-for="slot in groupedSlots['Breakfast']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Lunch</th>
                        <td v-for="slot in groupedSlots['Lunch']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Dinner</th>
                        <td v-for="slot in groupedSlots['Dinner']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="align-right">
            <router-link to="/grocerylist" class="btn btn-success">Generate Grocery List</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import toLower from 'lodash/toLower';
import { mapState } from 'vuex';
import { IMealSlot } from '@/state/interfaces/ScheduleState';
import MealSlot from './MealSlot.vue';

@Component({
    components: {
        MealSlot
    },
    computed: {
        ...mapState('schedule', ['mealSlots'])
    }
})
export default class RecipeList extends Vue {
    public activeSlot: number|null = null;
    public mealSlots!: IMealSlot[];

    public get augmentedSlots() {
        return map(this.mealSlots, (slot: IMealSlot) => {
            return {
                ...slot,
                selected: slot.id === this.activeSlot
            };
        });
    }

    public get groupedSlots() {
        return groupBy(this.augmentedSlots, 'category');
    }

    public setActive(mealId: number) {
        if (mealId === this.activeSlot) {
            this.activeSlot = null;
            this.$emit('meal-slot-click', null);
        } else {
            this.activeSlot = mealId;
            this.$emit('meal-slot-click', mealId);
        }
    }
}
</script>

<style scoped>
    .align-right {
        text-align: right;
        margin-right: 10px;
    }

    .meal-slot :hover{
        background-color: lightblue;
    }

    .selected {
        border: 2px solid green !important;
    }
</style>
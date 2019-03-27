import * as React from 'react';

export class MealSchedule extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="schedule card">
          <div className="schedule-header card-header">
              <h2 className="card-title float-left">Schedule</h2>
          </div>
          <div className="schedule-table card-body">
              <table className="table">
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
                          <td v-for="slot in groupedSlots['Breakfast']" :key="slot.id" @click="setActive(slot.id)" className="meal-slot">
                              <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Lunch</th>
                          <td v-for="slot in groupedSlots['Lunch']" :key="slot.id" @click="setActive(slot.id)" className="meal-slot">
                              <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Dinner</th>
                          <td v-for="slot in groupedSlots['Dinner']" :key="slot.id" @click="setActive(slot.id)" className="meal-slot">
                              <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div className="align-right">
              <router-link to="/grocerylist" className="btn btn-success">Generate Grocery List</router-link>
          </div>
      </div>
    );
  }
}
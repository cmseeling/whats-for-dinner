import * as React from 'react';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { IMealSlot } from '../../store/schedule/state';
import MealSlot from '../mealslot/';

import './style.css';

export interface Props {
    mealSlots: IMealSlot[];
    mealSlotOnClick: (slotId: number) => void;
}

interface State {
    activeSlot: number|null;
}

export class MealSchedule extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activeSlot: null
        };
    }

    private getGroupedSlots = (): {[index: string]: IMealSlot[]} => {
        const augmentedSlots = map(this.props.mealSlots, (slot: IMealSlot) => {
            return {
                ...slot,
                selected: slot.id === this.state.activeSlot
            };
        });
    
        return groupBy(augmentedSlots, 'category');
    }

    private setActive = (slotId: number) => {
        this.setState((state: State) => {
            return {
                ... state,
                activeSlot: slotId
            };
        });
        this.props.mealSlotOnClick(slotId);
    }

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
                                {
                                    map(this.getGroupedSlots()['Breakfast'], (slot) => {
                                        return (
                                            <td className="meal-slot" key={slot.id} onClick={() => this.setActive(slot.id)}>
                                                <MealSlot id={slot.id} recipeIds={slot.recipeIds} selected={slot.selected}/>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                            <tr>
                                <th scope="row">Lunch</th>
                                {
                                    map(this.getGroupedSlots()['Lunch'], (slot) => {
                                        return (
                                            <td className="meal-slot" key={slot.id} onClick={() => this.setActive(slot.id)}>
                                                <MealSlot id={slot.id} recipeIds={slot.recipeIds} selected={slot.selected}/>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                            <tr>
                                <th scope="row">Dinner</th>
                                {
                                    map(this.getGroupedSlots()['Dinner'], (slot) => {
                                        return (
                                            <td className="meal-slot" key={slot.id} onClick={() => this.setActive(slot.id)}>
                                                <MealSlot id={slot.id} recipeIds={slot.recipeIds} selected={slot.selected}/>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="align-right">
                    <a href="/grocerylist" className="btn btn-success">Generate Grocery List</a>
                </div>
            </div>
        );
    }
}
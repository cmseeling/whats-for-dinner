export interface IMealSlot {
    id: number;
    selected: boolean;
    category: string;
    recipeIds: number[];
}

export interface ScheduleState {
    mealSlots: IMealSlot[];
}

export const DefaultScheduleState = (): ScheduleState => {
    const mealSlots: IMealSlot[] = [];
    let i;
    for (i = 0; i < 21; i++) {
        let category = '';
        if (i < 7) {
            category = 'Breakfast';
        } else if (i < 14) {
            category = 'Lunch';
        } else {
            category = 'Dinner';
        }
        mealSlots.push({id: i, selected: false, category, recipeIds: []});
    }

    return {
        mealSlots
    };
};

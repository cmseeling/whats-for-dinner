function getMockGetters(recipeIds: number[]) {
  return {
    getAllUniqueRecipeIdsFromMealSlots: jest.fn().mockImplementation(() => () => {
      return recipeIds;
    })
  };
}

function getMockMutations() {
  return {
    addRecipeToMealSlot: jest.fn(),
    removeRecipeFromMealSlot: jest.fn()
  };
}

function getMockActions() {
  return {
  };
}

const ScheduleMocks = {
  getMockGetters,
  getMockMutations,
  getMockActions,
};
export default ScheduleMocks;

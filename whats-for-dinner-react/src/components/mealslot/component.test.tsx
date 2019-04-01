import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MealSlot, Props } from './component';
import { Recipe } from '../../models/recipe';

Enzyme.configure({ adapter: new Adapter() });

const mockRecipe: Recipe = {
  id: 1,
  ingredients: [
    'ingredient 1'
  ],
  name: 'test recipe'
}

const mockRemoveRecipeFromMealSlot = jest.fn();

let props: Props;

describe('MealSlot.tsx', () => {
  beforeEach(() => {
    props = {
      id: 1,
      recipeIds: [1],
      recipes: [mockRecipe],
      selected: false,
      removeRecipeFromMealSlot: mockRemoveRecipeFromMealSlot
    }
  });

  it('renders message if recipeId array is empty', () => {
    props = {...props, recipeIds: []};
    const wrapper = shallow(<MealSlot {...props}/>);

    expect(wrapper.find('.no-item').text()).toMatch('None selected');
  });

  it('renders a list of recipes', () => {
    const wrapper = shallow(<MealSlot {...props}/>);
    expect(wrapper.find('.meal-slot-recipe-name').text()).toMatch(mockRecipe.name);
  });

  it('removes a recipe from the list', () => {
    const wrapper = shallow(<MealSlot {...props}/>);

    wrapper.find('.close').simulate('click');

    expect(mockRemoveRecipeFromMealSlot).toBeCalledTimes(1);
  });
});

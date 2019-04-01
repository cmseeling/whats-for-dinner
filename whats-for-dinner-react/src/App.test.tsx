import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';
import { Recipe } from './models/recipe';

Enzyme.configure({ adapter: new Adapter() });

const recipe: Recipe = {
  id: 1,
  ingredients: [
    'ingredient 1'
  ],
  name: 'test recipe'
}

const mockGetRecipes = jest.fn().mockImplementation(() => {return [recipe]});

it('renders without crashing', () => {
  const props = {
    getRecipes: mockGetRecipes
  }
  const wrapper = shallow(<App {...props}/>);
});

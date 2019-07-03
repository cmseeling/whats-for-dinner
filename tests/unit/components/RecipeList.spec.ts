import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import RecipeList from '@/components/RecipeList.vue';
import RecipeItem from '@/components/RecipeItem.vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import reduce from 'lodash/reduce';
import { IRecipe } from '@/models/recipe';
import { generateRecipe } from '../../helpers/recipe';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mockRecipe1: IRecipe;
let mockRecipe2: IRecipe;
let mockStore: any;

describe('RecipeList.vue', () => {
  beforeEach(() => {
    mockRecipe1 = generateRecipe(1, 'test recipe 1', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe 2', ['ingredient 1']);

    mockStore = {
      getters: {
        'recipes/getFilteredList': jest.fn().mockImplementation((filterText: string) => {
          const recipes = [mockRecipe1, mockRecipe2];
          if (filterText === '') {
            return recipes;
          } else {
            return filter(recipes, (recipe: IRecipe) => {
              const existsInIngredients = reduce(recipe.ingredients, (prev, ingredient) => {
                return prev || includes(toLower(ingredient), toLower(filterText));
              }, false);
              return includes(toLower(recipe.name), toLower(filterText)) || existsInIngredients;
            });
          }
        })
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the list of recipes', () => {
    const wrapper = shallowMount(RecipeList, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.findAll(RecipeItem).length).toBe(2);
  });

  it('renders a filtered list of recipes', () => {
    const wrapper = mount(RecipeList, {
      mocks: { $store: mockStore },
      localVue
    });

    const input = wrapper.find('input');
    input.setValue(mockRecipe2.name);

    expect(wrapper.findAll(RecipeItem).length).toBe(1);
  });
});

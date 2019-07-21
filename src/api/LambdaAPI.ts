import axios from 'axios';
import { LambdaFetchResponse } from '@/models/LambdaFetchResponse';
import netlifyIdentity from 'netlify-identity-widget';
import { Recipe } from '@/models/Recipe';
import { MealPlan } from '@/models/MealPlan';

const getData = async (): Promise<LambdaFetchResponse> => {
  const response = await axios.get('/.netlify/functions/getUserData', await createRequestConfig());
  return response.data;
};

const saveRecipes = async (recipes: Recipe[]): Promise<void> => {
  const response = await axios.post('/.netlify/functions/saveRecipes', recipes, await createRequestConfig());
};

const saveMealPlans = async (mealPlans: MealPlan[]): Promise<void> => {
  const response = await axios.post('/.netlify/functions/saveMealPlans', mealPlans, await createRequestConfig());
};

const createRequestConfig = async () => {
  const user = netlifyIdentity.currentUser();
  return user && user.token ?
    {
      headers: { authorization: `Bearer ${user.token.access_token}` }
    }
    : {};
};

export default {
  getData,
  saveRecipes,
  saveMealPlans
};

import axios from 'axios';
import { LambdaFetchResponse } from '@/models/LambdaFetchResponse';
import { User } from 'netlify-identity-widget';
import { Recipe } from '@/models/Recipe';
import { MealPlan } from '@/models/MealPlan';

const getData = async (user: User): Promise<LambdaFetchResponse> => {
  const response = await axios.get('/.netlify/functions/getUserData', createRequestConfig(user));
  return response.data;
};

const saveRecipes = async (user: User, recipes: Recipe[]): Promise<void> => {
  const response = await axios.post('/.netlify/functions/saveRecipes', recipes, createRequestConfig(user));
};

const saveMealPlans = async (user: User, mealPlans: MealPlan[]): Promise<void> => {
  const response = await axios.post('/.netlify/functions/saveMealPlans', mealPlans, createRequestConfig(user));
};

const createRequestConfig = (user: User) => {
  return user.token ?
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

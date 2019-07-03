import { IRecipe } from '@/models/recipe';
import { API_URL } from '@/config';

const url = `${API_URL}/recipes`;

const create = async (recipe: IRecipe): Promise<IRecipe> => {
  const response = await fetch(url, {
    body: JSON.stringify(recipe),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
};

const readAll = async (): Promise<IRecipe[]> => {
  const response = await fetch(url);
  return await response.json();
};

const update = async (id: number, recipe: IRecipe): Promise<IRecipe> => {
  const response = await fetch(`${url}/${id}`, {
    body: JSON.stringify(recipe),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
};

const deleteItem = async (id: number): Promise<void> => {
  await fetch(`${url}/${id}`, {
    method: 'DELETE'
  });
};

export default {
  create,
  readAll,
  update,
  deleteItem
};

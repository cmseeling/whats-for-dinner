import { Recipe } from '@/models/recipe';
import { API_URL } from '@/config';

const url = `${API_URL}/recipes`;

const create = async (recipe: Recipe) => {
    try {
        const response = await fetch(url, {
            body: JSON.stringify(recipe),
            method: 'POST'
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const readAll = async () => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const update = async (id: number, recipe: Recipe) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            body: JSON.stringify(recipe),
            method: 'PUT'
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteItem = async (id: number) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export default {
    create,
    readAll,
    update,
    deleteItem
};

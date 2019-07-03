export interface IRecipe {
  id: number|null;
  name: string;
  ingredients: string[];
}

export const ConstructRecipe = (id = null, name = '', ingredients = []): IRecipe => {
  return {
    id,
    name,
    ingredients
  };
};

// export class Recipe {
//   public id: number|null;
//   public name: string;
//   public ingredients: string[];

//   constructor() {
//     this.id = null;
//     this.name = '';
//     this.ingredients = [];
//   }
// }

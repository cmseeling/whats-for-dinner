using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhatsForDinnerAPI.Models;

namespace WhatsForDinnerAPI.Repos
{
    public interface IRecipeRepo
    {
        Recipe AddRecipe(Recipe recipe);
        void DeleteRecipe(int recipeId);
        Recipe SaveRecipe(int recipeId, Recipe recipe);
        Recipe GetRecipe(int recipeId);
        IEnumerable<Recipe> GetRecipes();
    }

    public class RecipeRepo : IRecipeRepo
    {
        private Dictionary<int, Recipe> _recipes;

        public RecipeRepo()
        {
            _recipes = new Dictionary<int, Recipe>();

            var r1 = new Recipe
            {
                id = 1,
                Name = "Green Eggs and Ham",
                Ingredients = new List<string>()
                {
                    "Eggs",
                    "Ham",
                    "Green Dye"
                }
            };
            _recipes.Add(r1.id, r1);

            var r2 = new Recipe
            {
                id = 2,
                Name = "Peanut Butter Jelly Time",
                Ingredients = new List<string>()
                {
                    "Peanut Butter",
                    "Jelly",
                    "30 Seconds"
                }
            };
            _recipes.Add(r2.id, r2);
        }

        public Recipe AddRecipe(Recipe recipe)
        {
            _recipes.Add(recipe.id, recipe);
            return recipe;
        }

        public Recipe SaveRecipe(int recipeId, Recipe recipe)
        {
            if (_recipes.ContainsKey(recipeId))
            {
                _recipes[recipeId] = recipe;
                return recipe;
            }
            else
            {
                return null;
            }
        }

        public void DeleteRecipe(int recipeId)
        {
            if (_recipes.ContainsKey(recipeId))
            {
                _recipes.Remove(recipeId);
            }
        }

        public Recipe GetRecipe(int recipeId)
        {
            if (_recipes.ContainsKey(recipeId))
            {
                return _recipes[recipeId];
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<Recipe> GetRecipes()
        {
            return _recipes.Values;
        }
    }
}

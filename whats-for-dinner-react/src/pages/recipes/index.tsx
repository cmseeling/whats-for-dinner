import * as React from 'react';
import RecipeList from '../../components/recipelist';

export const RecipesPage: React.StatelessComponent = (props: any) => {
  const handleRecipeClicked = (recipeId: number|null) => {
    if(recipeId) {
      props.history.push(`/recipes/item/${recipeId}`);
    }
  }

    const nav = (
      <div className="recipes-management">
        <a href="/recipes/item" className="btn btn-primary">Create New</a>
        <RecipeList recipeOnClick={handleRecipeClicked} />
      </div>
    );

    return nav;
}
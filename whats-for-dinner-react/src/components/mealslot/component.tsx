import * as React from 'react';
import find from 'lodash/find';
import map from 'lodash/map';
import { Recipe } from '../../models/recipe';

export interface Props {
  recipeIds: number[];
  recipes: Recipe[];
  id: number;
  selected: boolean;
  removeRecipeFromMealSlot: (slotId: number, recipeId: number) => void;
}

export class MealSlot extends React.Component<Props, any> {
  private getRecipeName = (recipeId: number) => {
    const recipe: Recipe|undefined = find(this.props.recipes, (recipe: Recipe) => {
      return recipe.id === recipeId;
    });
    return recipe ? recipe.name : '';
  }

  public render() {
    return (
      <div className={this.props.selected ? 'selected' : ''}>
        {
          this.props.recipeIds.length === 0 ?
            <span className="no-item">None selected</span> :
            <table className="table">
            <tbody>
              {
                map(this.props.recipeIds, (id: number) => {
                  return (
                    <tr key={id}>
                      <td>
                          <button type="button" className="close" aria-label="Close" onClick={() => {this.props.removeRecipeFromMealSlot(this.props.id, id)}}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </td>
                      <td className="text-left meal-slot-recipe-name">{this.getRecipeName(id)}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        }
      </div>
    )
  }
}
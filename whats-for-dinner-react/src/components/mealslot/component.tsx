import * as React from 'react';
import find from 'lodash/find';
import map from 'lodash/map';
import { Recipe } from '../../models/recipe';

export interface Props {
  recipeIds: number[];
  recipes: Recipe[];
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
      <div>
        {
          this.props.recipeIds.length === 0 ?
            <span>None selected</span> :
            <table v-else className="table">
            <tbody>
              {
                map(this.props.recipeIds, (id: number) => {
                  <tr key={id}>
                    <td>
                        <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                    <td className="text-left">{this.getRecipeName(id)}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        }
      </div>
    )
  }
}
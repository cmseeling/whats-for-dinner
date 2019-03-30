import * as React from 'react';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { Recipe } from '../../models/recipe';

import './style.css';

export interface Props {
  recipes: Recipe[];
  recipeOnClick: (recipeId: number|null) => void;
}

interface State {
  searchText: string;
}

export class RecipeList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  private getFilteredRecipes = () => {
    const text = this.state.searchText
    if (text === '') {
      return this.props.recipes;
    } else {
      const filteredRecipes = filter(this.props.recipes, (recipe: Recipe) => {
        const existsInIngredients = reduce(recipe.ingredients, (prev, ingredient) => {
          return prev || includes(toLower(ingredient), toLower(text));
        }, false);
        return includes(toLower(recipe.name), toLower(text)) || existsInIngredients;
      });

      return filteredRecipes;
    }
  }

  private handleSearchTextChanged = (event: any) => {
    this.setState({
      searchText: event.currentTarget.value
    });
  }

  public render() {
    return(
      <div className="recipes card">
        <div className="recipes-header card-header">
            <h2 className="card-title float-left">Recipes</h2>
            <div className="float-right">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="recipeSearchLabel">Search:</span>
                    </div>
                    <input id="recipeSearch" aria-describedby="recipeSearchLabel" value={this.state.searchText} onChange={this.handleSearchTextChanged} className="form-control"/>
                </div>
            </div>
        </div>
        <div className="recipes-list card-body">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Ingredients</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    map(this.getFilteredRecipes(), (recipe, index) => {
                      return (
                        <tr key={recipe.id || index}>
                          <td>
                              <a href="#" onClick={(event) => {event.preventDefault(); this.props.recipeOnClick(recipe.id)}}>{recipe.name}</a>
                          </td>
                          <td colSpan={2}>
                              <div className="ingredients-list">
                                  <a className="btn btn-primary font-weight-bold" href={`#ingredientsList-${recipe.id}`}
                                        data-toggle="collapse" role="button" aria-expanded="false" aria-controls={`ingredientsList-${recipe.id}`}>
                                      View Ingredients
                                  </a>
                                  <div className="collapse" id={`ingredientsList-${recipe.id}`}>
                                      <ul>
                                        {
                                          map(recipe.ingredients, (ingredient, index) => {
                                            return (
                                              <li key={index}>
                                                {ingredient}
                                              </li>
                                            );
                                          })
                                        }
                                      </ul>
                                  </div>
                              </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}
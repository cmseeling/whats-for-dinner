import * as React from 'react';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { Recipe } from '../../models/recipe';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  recipeId: string;
}

export interface Props extends RouteComponentProps<MatchParams> {
  recipes: Recipe[];
  initialized: boolean|undefined;
  saveRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: number) => void;
}

interface State {
  recipe: Recipe;
  isAddingIngredient: boolean;
  newIngredient: string;
  isNewRecipe: boolean;
}

export class RecipePage extends React.Component<Props, State> {
  private newIngredientRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      recipe: new Recipe(),
      isAddingIngredient: false,
      newIngredient: '',
      isNewRecipe: true
    }

    this.newIngredientRef = React.createRef();
  }

  componentDidMount() {
    //need to add reselect package for memoization
    const { recipeId } = this.props.match.params;
    if(recipeId) {
      const id = Number(recipeId);

      if(!this.props.initialized) {
        const interval = setInterval(() => {
          if(this.props.initialized) {
            this.setRecipe(id);
            clearInterval(interval);
          }
        }, 100);
      }
      else {
        this.setRecipe(id);
      }
      
      this.setState({isNewRecipe: false});
    }
  }

  componentDidUpdate() {
    if(this.newIngredientRef.current) {
      this.newIngredientRef.current.focus();
    }
  }

  private setRecipe = (recipeId: number) => {
    const recipe = find(this.props.recipes, (r: Recipe) => {
      return r.id === recipeId;
    });
    if(recipe) {
      this.setState({recipe});
    }
  }

  // getting these event handlers to work takes more than expected
  private handleRecipeNameChanged = (event: any) => {
    const recipe = {
      ...this.state.recipe,
      name: event.currentTarget.value
    };

    this.setState({recipe});
  }

  private handleNewIngredientChanged = (event: any) => {
    this.setState({newIngredient: event.currentTarget.value});
  }

  private clearNewIngredient = () => {
    this.setState({newIngredient: ''});
  }

  private handleAddIngredientClicked = (event: any) => {
    event.preventDefault();
    this.setState({isAddingIngredient: true});
  }

  private handleCancelAddIngredient = (event: any) => {
    event.preventDefault();
    this.clearNewIngredient();
    this.setState({isAddingIngredient: false});
  }

  private addIngredient = (event: any) => {
    event.preventDefault();

    const recipe = {
      ...this.state.recipe,
      ingredients: [...this.state.recipe.ingredients, this.state.newIngredient]
    }

    this.setState({recipe});
    this.clearNewIngredient();
  }

  private removeIngredient = (index: number) => {
    const ingredients = [...this.state.recipe.ingredients];
    ingredients.splice(index, 1);
    const recipe = {
      ...this.state.recipe,
      ingredients
    }

    this.setState({recipe});
  }

  private saveRecipeForm = (event: any) => {
    event.preventDefault();
    this.props.saveRecipe(this.state.recipe);
    this.props.history.push('/recipes');
  }

  private removeRecipe = (event: any) => {
    event.preventDefault();
    if (this.state.recipe.id) {
        this.props.deleteRecipe(this.state.recipe.id);
    }
    this.props.history.push('/recipes');
  }

  public render() {
    return (
      <div className="recipe-edit">
        <div className="recipe-form card">
          <div className="recipe-form-header card-header">
              <h2 className="card-title float-left">Recipe</h2>
          </div>
          <div className="recipe-form-list card-body text-left">
              <form>
                  <div className="form-group">
                      <label htmlFor="recipeName" className="font-weight-bold">Name</label>
                      <input type="text" id="recipeName" value={this.state.recipe.name} onChange={this.handleRecipeNameChanged} className="form-control"/>
                  </div>
                  <div className="form-group">
                      <label className="font-weight-bold">Ingredients</label>
                      <table className="ml-5 mb-1">
                          <tbody>
                              {
                                map(this.state.recipe.ingredients, (ingredient: string, index: number) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                          <button type="button" className="close" aria-label="Close" onClick={(event) => {event.preventDefault(); this.removeIngredient(index)}}>
                                              <span aria-hidden="true">&times;</span>
                                          </button>
                                      </td>
                                      <td>
                                          {ingredient}
                                      </td>
                                  </tr>
                                  )
                                })
                              }
                              {
                                this.state.isAddingIngredient ?
                                <tr>
                                  <td></td>
                                  <td>
                                      <div className="input-group">
                                          <input ref={this.newIngredientRef} id="addItemInput" value={this.state.newIngredient} onChange={this.handleNewIngredientChanged} className="form-control"/>
                                          <div className="input-group-append">
                                              <button className="btn btn-success" onClick={this.addIngredient}>Add</button>
                                              <button className="btn btn-danger" onClick={this.handleCancelAddIngredient}>Cancel</button>
                                          </div>
                                      </div>
                                  </td>
                                </tr>
                                :
                                <tr></tr>
                              }
                          </tbody>
                      </table>
                      <button className="btn btn-primary" onClick={this.handleAddIngredientClicked}>Add Ingredient</button>
                  </div>
                  <hr/>
                  <div className="container-fluid">
                      <div className="row">
                          <button type="submit" className="btn btn-primary col-md-1" onClick={this.saveRecipeForm}>Save</button>
                      </div>
                      <div className="row">
                          <div className="col-md-1">&nbsp;</div>
                      </div>
                      {
                        this.state.isNewRecipe ?
                        <div className="row">
                          <button className="btn btn-danger col-md-1" onClick={() => {this.props.history.push('/recipes')}}>Cancel</button>
                        </div>
                        :
                        <div className="row">
                          <button className="btn btn-danger col-md-1" onClick={this.removeRecipe}>Delete</button>
                        </div>
                      }
                  </div>
              </form>
          </div>
        </div>
      </div>
    );
  }
}
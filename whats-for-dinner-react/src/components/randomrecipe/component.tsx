import * as React from 'react';
import map from 'lodash/map';
import { Recipe } from '../../models/recipe';

import './style.css';

export interface Props {
  recipes: Recipe[];
  initialized: boolean|undefined;
  recipeOnClick: (recipeId: number|null) => void;
}

interface State {
  recipe: Recipe|null;
}

export class RandomRecipe extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      recipe: null
    }
  }

  componentDidMount() {
    if(!this.props.initialized) {
      const interval = setInterval(() => {
        if(this.props.initialized) {
          this.nextRecipe();
          clearInterval(interval);
        }
      }, 100);
    }
    else {
      this.nextRecipe();
    }
  }

  private handleNextRecipe = (event: any) => {
    event.preventDefault();
    this.nextRecipe();
  }

  private nextRecipe = () => {
    const nextIndex = Math.floor(Math.random() * this.props.recipes.length);
    this.setState({
      recipe: this.props.recipes[nextIndex]
    })
  }

  private handleAddRecipe = (event: any) => {
    event.preventDefault();
    if(this.state.recipe) {
      this.props.recipeOnClick(this.state.recipe.id)
    }
  }

  public render() {
    return(
      <div className="random-recipe card">
        <div className="random-recipe-header card-header">
            <h2 className="card-title float-left">Random Recipe</h2>
        </div>
        <div className="random-recipe-list card-body">
            <div className="container">
                <div className="row" v-if="recipe">
                    <div className="col-sm text-right">
                        <h4 className="card-title float-left font-weight-bold">{this.state.recipe ? this.state.recipe.name : ''}</h4>
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                </div>
                <div className="row" v-if="recipe">
                    <div className="col-sm text-right font-weight-bold">Ingredients:</div>
                    <div className="col-sm">
                        <ul className="text-left">
                          {
                            this.state.recipe ?
                            map(this.state.recipe.ingredients, (item, index) => {
                              return (
                                <li key={index}>
                                  {item}
                                </li>
                              )
                            })
                            : ''
                          }
                        </ul>
                    </div>
                    <div className="col-sm"></div>
                </div>
                <div className="row">
                    <div className="col-sm text-right">
                        <button className="btn btn-primary" onClick={this.handleAddRecipe}>Add</button>
                    </div>
                    <div className="col-sm text-left">
                        <button className="btn btn-warning" onClick={this.handleNextRecipe}>See next</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
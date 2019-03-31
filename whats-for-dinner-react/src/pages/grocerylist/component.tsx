import * as React from 'react';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { Recipe } from '../../models/recipe';
import { IMealSlot } from '../../store/schedule/state';

export interface Props {
  recipes: Recipe[];
  mealSlots: IMealSlot[];
}

interface State {
  ingredientsList: string[];
  isAddingItem: boolean;
  newItem: string;
}

export class GroceryListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ingredientsList: [],
      isAddingItem: false,
      newItem: ''
    }
  }

  private handleRemoveIngredientClicked = (event: any, index: number) => {
    event.preventDefault();
    const ingredientsList = [...this.state.ingredientsList];
    ingredientsList.splice(index, 1);
    this.setState({ingredientsList});
  }

  private toggleAddItem = (event: any) => {
    event.preventDefault();
    this.setState({
      isAddingItem: !this.state.isAddingItem
    })
  }

  private handleNewItemChanged = (event: any) => {
    this.setState({
      newItem: event.currentTarget.value
    });
  }

  private handleAddIngredient = (event: any) => {
    this.setState({
      ingredientsList: [...this.state.ingredientsList, this.state.newItem]
    });
    this.setState({
      newItem: '',
      isAddingItem: false
    });
  }

  public render() {
    return(
      <div className="grocery-list">
        <div className="grocery-list card">
            <div className="grocery-list-header card-header">
              <h2 className="card-title float-left">Grocery List</h2>
          </div>
          <div className="grocery-list-table card-body">
              <table className="table">
                  <tbody>
                    {
                      map(this.state.ingredientsList, (ingredient, index) => {
                        return (
                          <tr v-for="(ingredient, index) in ingredientsList" key="index">
                            <td>
                              <button type="button" className="close" aria-label="Close" onClick={(event) => {this.handleRemoveIngredientClicked(event, index)}}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </td>
                            <td colSpan={4} className="text-left">
                              {ingredient}
                            </td>
                          </tr>
                        )
                      })
                    }
                    {
                      this.state.isAddingItem ?
                      <tr v-if="isAddingItem">
                        <td className="text-right">
                          <button type="button" className="btn btn-danger" onClick={this.toggleAddItem}>Cancel</button>
                        </td>
                        <td>
                          <div className="input-group">
                            <input id="addItemInput" value={this.state.newItem} onChange={this.handleNewItemChanged} className="form-control"/>
                            <div className="input-group-append">
                              <button className="btn btn-primary" onClick="addIngredient">Add</button>
                            </div>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      :
                      <tr v-else>
                        {/* can't just do colspan="5" */}
                        <td colSpan={5}>
                          <button type="button" className="btn btn-primary" onClick={this.toggleAddItem}>Add Item</button>
                        </td>
                      </tr>
                    }
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    )
  }
}
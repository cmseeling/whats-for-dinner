import * as React from 'react';
import MealSchedule from '../../components/mealschedule';
import RecipeList from '../../components/recipelist';
import RandomRecipe from '../../components/randomrecipe';

export interface Props {
    addRecipeToMealSlot: (slotId: number, recipeId: number) => void;
}

interface State {
    selectedMealSlot: number|null;
}

export class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedMealSlot: null
        }
    }

    private handleMealSlotClicked = (slotId: number) => {
        this.setState({selectedMealSlot: slotId});
    }

    private handleRecipeClicked = (recipeId: number|null) => {
        if (this.state.selectedMealSlot && recipeId) {
            this.props.addRecipeToMealSlot(this.state.selectedMealSlot, recipeId);
        }
    }

    public render() {
        return (
            <div className="home">
                <MealSchedule mealSlotOnClick={this.handleMealSlotClicked}/>
                <div className="card">
                <div className="card-body">
                    <ul className="nav nav-tabs" id="recipeTabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="recipeList-tab" data-toggle="tab" href="#recipeList" role="tab" aria-controls="recipeList" aria-selected="true">Recipe List</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="randomRecipe-tab" data-toggle="tab" href="#randomRecipe" role="tab" aria-controls="randomRecipe" aria-selected="false">Random Recipe</a>
                    </li>
                    </ul>
                    <div className="tab-content" id="recipeTabsContent">
                    <div className="tab-pane fade show active" id="recipeList" role="tabpanel" aria-labelledby="recipeList-tab">
                        <RecipeList recipeOnClick={this.handleRecipeClicked} />
                    </div>
                    <div className="tab-pane fade" id="randomRecipe" role="tabpanel" aria-labelledby="randomRecipe-tab">
                        <RandomRecipe recipeOnClick={this.handleRecipeClicked} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
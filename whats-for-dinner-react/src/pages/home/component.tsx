import * as React from 'react';
import MealSchedule from '../../components/mealschedule';

export class HomePage extends React.Component {
    public render() {
        return (
            <div className="home">
                <MealSchedule/>
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
                        <div>Recipe List placeholder</div>
                    </div>
                    <div className="tab-pane fade" id="randomRecipe" role="tabpanel" aria-labelledby="randomRecipe-tab">
                        <div>Recipe Randomizer placeholder</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
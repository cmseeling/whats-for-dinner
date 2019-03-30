import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppNav } from './components/appnav';
import { Switch, Route } from 'react-router';
// don't use import { HomePage } from './pages/home/component' - this won't connect the state
import HomePage from './pages/home';
import { RecipesPage } from './pages/recipes';
import RecipePage from './pages/recipe';
import { connect } from 'react-redux';
import { AppState } from './store/state';
import recipeThunks from './store/recipes/thunks';
import { ThunkDispatch } from 'redux-thunk';

export interface Props {
  getRecipes: () => void;
}

class App extends React.Component<Props, any> {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    return (
      <div className="App container-fluid">
        <AppNav/>
        <Switch>
          <Route key="homepage" exact={true} path="/" component={HomePage} />
          <Route key="recipes" exact={true} path="/recipes" component={RecipesPage} />
          <Route key="recipeform" exact={true} path="/recipes/item" component={RecipePage} />
          <Route key="recipeform" path="/recipes/item/:recipeId" component={RecipePage} />
        </Switch>
      </div>
    );
  }
}

// export default App;

const mapStateToProps = (state: AppState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getRecipes: async () => await dispatch(recipeThunks.GetRecipes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
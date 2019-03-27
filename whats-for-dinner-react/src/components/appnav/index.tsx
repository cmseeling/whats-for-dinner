import * as React from 'react';

export const AppNav: React.StatelessComponent = () => {
    const nav = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">What's For Dinner?</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/recipes" className="nav-link">Recipes</a>
                    <a href="/grocerylist" className="nav-link">Grocery List</a>
                </div>
            </div>
        </nav>
    );

    return nav;
}
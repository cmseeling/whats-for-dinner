export class Recipe {
    public id: number|null;
    public name: string;
    public ingredients: string[];

    constructor() {
        this.id = null;
        this.name = '';
        this.ingredients = [];
    }
}

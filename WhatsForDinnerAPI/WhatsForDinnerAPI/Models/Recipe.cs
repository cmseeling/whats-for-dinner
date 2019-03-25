using System.Collections.Generic;

namespace WhatsForDinnerAPI.Models
{
    public class Recipe
    {
        public int id { get; set; }
        public string Name { get; set; }
        public List<string> Ingredients { get; set; }

        public Recipe()
        {
            Ingredients = new List<string>();
        }
    }
}

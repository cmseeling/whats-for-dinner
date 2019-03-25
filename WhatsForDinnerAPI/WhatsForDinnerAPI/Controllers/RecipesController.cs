using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhatsForDinnerAPI.Models;
using WhatsForDinnerAPI.Repos;

namespace WhatsForDinnerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private IRecipeRepo _recipeRepo;

        public RecipesController(IRecipeRepo recipeRepo)
        {
            _recipeRepo = recipeRepo;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Recipe>> Get()
        {
            return new JsonResult(_recipeRepo.GetRecipes());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Recipe> Get(int id)
        {
            return new JsonResult(_recipeRepo.GetRecipe(id));
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Recipe> Post([FromBody] Recipe recipe)
        {
            return new JsonResult(_recipeRepo.AddRecipe(recipe));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult<Recipe> Put(int id, [FromBody] Recipe recipe)
        {
            return new JsonResult(_recipeRepo.SaveRecipe(id, recipe));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _recipeRepo.DeleteRecipe(id);
        }
    }
}

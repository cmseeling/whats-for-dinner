import { DbConstants } from './dynamodb/DbConstants';
import { createSaveFunctionHandler } from './helpers/saveTopLevelAttribute';

const handler = createSaveFunctionHandler(DbConstants.MealPlans);
export { handler };

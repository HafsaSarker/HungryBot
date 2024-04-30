import axios from "axios";
import { Meal } from "../types/meal";

export async function fetchRecipes(mealName: string): Promise<Meal[] | null> {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    const { meals } = response.data;

    if (!meals.length) {
      return null;
    }

    return meals;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fetchRecipes } from "../utils/fetchRecipes";
import { Meal } from "../types/meal";

export const data = new SlashCommandBuilder()
  .setName("recipes")
  .setDescription("Search for recipes by meal name.")
  .addStringOption((option) =>
    option
      .setName("meal_name")
      .setDescription("Name of the meal to search for.")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const mealName = interaction.options.get("meal_name");

  const value = mealName?.value as string;

  if (mealName && value) {
    try {
      await interaction.reply("Fetching recipes:magic_wand:...");

      const recipes = await fetchRecipes(value);

      if (!recipes || !recipes.length) {
        return interaction.followUp("Oops, no recipes found :chicken:");
      }

      if (recipes.length > 10) {
        return interaction.followUp("Woah, try to be more specific:hamburger:");
      }

      for (const recipe of recipes) {
        await interaction.followUp({
          embeds: [
            {
              title: recipe.strMeal,
              description: `Category: ${recipe.strCategory}`,
              image: { url: recipe.strMealThumb },
              url: `https://www.themealdb.com/meal/${
                recipe.idMeal
              }-${encodeURIComponent(recipe.strMeal.split(" ").join("-"))}`,
            },
          ],
        });
      }

      return;
    } catch (error) {
      console.error("Error fetching data:", error);
      return interaction.followUp({
        content: "Error fetching recipes. Please try again later.",
      });
    }
  }

  return interaction.reply("Please provide a meal name to search for.");
}

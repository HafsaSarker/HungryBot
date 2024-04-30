import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("greetings")
  .setDescription("Replies with a greeting!");

export async function execute(interaction: CommandInteraction) {
  const replies = [
    "Hey there!",
    "Hi!",
    "Hello!",
    "Greetings!",
    "Good day!",
    "Nice to meet you!",
    "Howdy!",
    "Salutations!",
    "Hey!",
    "Yo!",
  ];

  const randomIndx = Math.floor(Math.random() * replies.length);
  return interaction.reply(replies[randomIndx]);
}

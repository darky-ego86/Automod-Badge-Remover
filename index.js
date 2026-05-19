// index.js
// Credits: Darky
const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    EmbedBuilder, 
    PermissionFlagsBits 
} = require("discord.js");

// ================== CONFIG ==================
const TOKEN = "YOUR_BOT_TOKEN"; // <-- Put your bot token here
const PREFIX = "$";             // <-- Set your prefix
const ALLOWED_USERS = ["1474888169219690496"]; // <-- Replace with your Discord ID
// ============================================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`✅ Developed by Darky.ego`);
});

// Listen for commands
client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (["badgeremove", "remove", "clearrules"].includes(command)) {
        await handleBadgeRemove(client, message);
    }
});

// ================== COMMAND LOGIC ==================
async function handleBadgeRemove(client, message) {
    // Only allow bot owner/specific users
    if (!ALLOWED_USERS.includes(message.author.id)) {
        return message.reply("❌ This command is restricted to bot owners only!");
    }

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return message.reply("❌ You need Administrator permission!");
    }

    if (!message.guild.features.includes("COMMUNITY")) {
        return message.reply("❌ Server must be Community-enabled for AutoMod!");
    }

    const botPerms = message.guild.members.me.permissions;
    if (!botPerms.has([PermissionFlagsBits.ManageGuild, PermissionFlagsBits.ModerateMembers])) {
        return message.reply("❌ Bot needs Manage Server and Moderate Members permissions!");
    }

    try {
        await message.reply("🗑️ Starting badge removal... Deleting all AutoMod rules!");

        const { deleted, failed, ruleNames } = await deleteAllRules(message.guild);

        const embed = new EmbedBuilder()
            .setTitle("🗑️ Badge Removal Complete!")
            .setDescription(`Deleted **${deleted}** AutoMod rule(s) from this server.`)
            .addFields(
                {
                    name: "Rules Deleted",
                    value: ruleNames.length > 0 ? ruleNames.join("\n") : "None found"
                },
                {
                    name: "Failed",
                    value: `${failed} rule(s) could not be deleted`
                },
                {
                    name: "Status",
                    value: `AutoMod badge rules have been cleared ✅`
                }
            )
            .setColor(0xff0000)
            .setFooter({ text: `Developed by Darky.ego`, iconURL: message.guild.iconURL() });

        await message.channel.send({ embeds: [embed] });

    } catch (error) {
        console.error("Badge removal error:", error);
        await message.channel.send(`❌ Badge removal failed: ${error.message}`);
    }
}

// ================== HELPERS ==================
async function deleteAllRules(guild) {
    const rules = await guild.autoModerationRules.fetch();
    let deleted = 0;
    let failed = 0;
    const ruleNames = [];

    for (const rule of rules.values()) {
        try {
            await rule.delete();
            ruleNames.push(`🗑️ Deleted: ${rule.name}`);
            deleted++;
            await wait(700); // rate limit safety
        } catch (error) {
            console.error(`Failed to delete rule "${rule.name}":`, error.message);
            ruleNames.push(`❌ Failed: ${rule.name}`);
            failed++;
            await wait(500);
        }
    }

    return { deleted, failed, ruleNames };
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ================== START BOT ==================
client.login(TOKEN);

# 🗑️ Automod Badge Remover

> Developed by **Darky.ego**

A simple one-file Discord bot that removes **all AutoMod rules** from your server instantly.

---

## ⚙️ Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Configure `index.js`**
   - Replace `YOUR_BOT_TOKEN` with your bot token
   - Replace the ID in `ALLOWED_USERS` with your Discord user ID

3. **Start the bot**
   ```
   npm start
   ```

---

## 🤖 Bot Permissions Required

Make sure your bot has the following permissions in the server:

- `Manage Server`
- `Moderate Members`
- `Administrator` (for the user running the command)

> ⚠️ Server must have **Community** enabled for AutoMod to work.

---

## 📋 Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `!badgeremove` | `!remove`, `!clearrules` | Deletes **all** AutoMod rules from the server |

---

## 📦 Dependencies

- [discord.js](https://discord.js.org/) `^14.15.3`
- Node.js `v16.9.0` or higher

---

## 📝 Credits

- **Developer:** Darky.ego

---

## ⚠️ Disclaimer

Use this tool responsibly and only on servers you own or have full permission to manage.

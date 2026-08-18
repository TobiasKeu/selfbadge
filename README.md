# SelfBadges

Updated on 16.08.2026

A [Vencord](https://github.com/Vendicated/Vencord) userplugin that lets you display Custom and/or Official Badges on your own Discord profile — **visible only in your own client.** Everything is [...]

## Features

- **Full badge catalog** — every badge from [PandaDevOfficial/badges-discord](https://github.com/PandaDevOfficial/badges-discord), each as its own toggle: Staff, Partner, all 3 HypeSquad houses, [...]
- **Custom ordering** — control the order badges are displayed in
- **Custom badges** — add any badge you want via a simple JSON list (your own image URL + description).
- **Hide real badges** — selectively hide badges you actually have from your own view.

## Installation

This plugin cannot be added through the normal Vencord installer. It needs to be built from source as a "userplugin."

1. **Install requirements**: [Node.js](https://nodejs.org) (LTS) and `pnpm`:
   ```bash
   npm install -g pnpm
   ```

2. **Clone Vencord's source**:
   ```bash
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```

3. **Add this plugin**: place this repo's `selfBadges` folder inside:
   ```
   Vencord/src/userplugins/selfBadges/
   ```
   (so the final path is `Vencord/src/userplugins/selfBadges/index.tsx`)

      ![File Location of index.tsx](./File-Location)

4. **Build and inject**:
   ```bash
   pnpm build
   pnpm inject
   ```
   Fully quit Discord (use the task manager or Relaunch Discord using Vencord's built-in feature) and reopen it.

5. **Enable it**: Discord Settings → Vencord → Plugins → toggle **SelfBadges** on.

## Usage

Open the plugin's settings (gear icon next to SelfBadges in the Plugins list):

- **Checkboxes** — toggle any catalog badge on/off.
- **Badge Order** — comma-separated list of badge IDs controlling display order, e.g.:
  ```
  nitro_ruby,boost_lvl9,partner_owner,bug_hunter_2,early_supporter
  ```
  Only badges that are both checked *and* listed here will show. Leave as default to show checked badges in catalog order.
- **Custom Badges Raw** — JSON array for arbitrary badges not in the catalog:
  ```json
  [{"id":"my-badge","iconSrc":"https://example.com/badge.png","description":"My Badge"}]
  ```
- **Hidden Badge IDs** — comma-separated list of your *real* badge IDs to hide from your own view, e.g.:
  ```
  guild_booster_lvl8,legacy_username
  ```
  To find your real badge IDs, open your own profile popout and check the console for badge data, or inspect via `UserProfileStore`.

## Important notes

- This is **purely cosmetic and client-side**. It does not modify your actual Discord account, and nobody viewing your profile from their own client (even with Vencord) will see any of this.
- Client modifications like Vencord are not officially supported by Discord and technically fall outside their Terms of Service, though enforcement has historically been lax. Use at your own discr[...]
- Because this patches Discord's minified client code, **Discord updates may occasionally break the patch** (variable names inside the bundle can shift between builds). If badges stop appearing af[...]

  ![Badge Preview](./Badge-Preview)

## Credits

- Badge images from [PandaDevOfficial/badges-discord](https://github.com/PandaDevOfficial/badges-discord)
- Built on [Vencord](https://github.com/Vendicated/Vencord)
- Build by TobiasKeu
- Official Discord Server: [.gg/KhM9Svk5Tx](https://discord.gg/KhM9Svk5Tx)

- ## If there are any issues regarding this userplugin please join [.gg/KhM9Svk5Tx](https://discord.gg/KhM9Svk5Tx)

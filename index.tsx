import definePlugin from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { UserStore } from "@webpack/common";

interface FakeBadge {
    id: string;
    description: string;
    iconSrc: string;
}

const RAW = "https://github.com/PandaDevOfficial/badges-discord/raw/main/assets";

// Full catalog from https://github.com/PandaDevOfficial/badges-discord
const BADGE_CATALOG: { id: string; name: string; iconSrc: string }[] = [
    // General
    { id: "staff", name: "Discord Staff", iconSrc: `${RAW}/discordstaff.svg` },
    { id: "partner_owner", name: "Partnered Server Owner", iconSrc: `${RAW}/discordpartner.svg` },
    { id: "hypesquad_events", name: "HypeSquad Events", iconSrc: `${RAW}/hypesquadevents.svg` },
    { id: "hypesquad_bravery", name: "HypeSquad Bravery", iconSrc: `${RAW}/hypesquadbravery.svg` },
    { id: "hypesquad_brilliance", name: "HypeSquad Brilliance", iconSrc: `${RAW}/hypesquadbrilliance.svg` },
    { id: "hypesquad_balance", name: "HypeSquad Balance", iconSrc: `${RAW}/hypesquadbalance.svg` },
    { id: "early_supporter", name: "Early Supporter", iconSrc: `${RAW}/discordearlysupporter.svg` },
    { id: "nitro_active", name: "Discord Nitro", iconSrc: `${RAW}/discordnitro.svg` },
    { id: "orb_apprentice", name: "Orbs Apprentice", iconSrc: `${RAW}/orb.svg` },
    { id: "quest_completed", name: "Completed a Quest", iconSrc: `${RAW}/quest.png` },
    { id: "april_fools_clown", name: "A Clown, for a Limited Time", iconSrc: `${RAW}/special/discordlootbox.svg` },
    { id: "originally_known_as", name: "Originally Known As", iconSrc: `${RAW}/username.png` },

    // Developer
    { id: "active_developer", name: "Active Developer", iconSrc: `${RAW}/activedeveloper.svg` },
    { id: "early_verified_bot_dev", name: "Early Verified Bot Developer", iconSrc: `${RAW}/discordbotdev.svg` },
    { id: "mod_alumni", name: "Moderator Programs Alumni", iconSrc: `${RAW}/discordmod.svg` },
    { id: "bug_hunter_1", name: "Bug Hunter (Tier 1)", iconSrc: `${RAW}/discordbughunter1.svg` },
    { id: "bug_hunter_2", name: "Bug Hunter (Tier 2)", iconSrc: `${RAW}/discordbughunter2.svg` },

    // Bot
    { id: "bot_supports_commands", name: "Supports Commands", iconSrc: `${RAW}/supportscommands.svg` },
    { id: "bot_automod", name: "Uses AutoMod", iconSrc: `${RAW}/automod.svg` },
    { id: "bot_premium", name: "Premium Bot", iconSrc: `${RAW}/premiumbot.png` },

    // Nitro Subscription tenure
    { id: "nitro_bronze", name: "Nitro Bronze (1mo)", iconSrc: `${RAW}/subscriptions/badges/bronze.png` },
    { id: "nitro_silver", name: "Nitro Silver (3mo)", iconSrc: `${RAW}/subscriptions/badges/silver.png` },
    { id: "nitro_gold", name: "Nitro Gold (6mo)", iconSrc: `${RAW}/subscriptions/badges/gold.png` },
    { id: "nitro_platinum", name: "Nitro Platinum (1yr)", iconSrc: `${RAW}/subscriptions/badges/platinum.png` },
    { id: "nitro_diamond", name: "Nitro Diamond (2yr)", iconSrc: `${RAW}/subscriptions/badges/diamond.png` },
    { id: "nitro_emerald", name: "Nitro Emerald (3yr)", iconSrc: `${RAW}/subscriptions/badges/emerald.png` },
    { id: "nitro_ruby", name: "Nitro Ruby (5yr)", iconSrc: `${RAW}/subscriptions/badges/ruby.png` },
    { id: "nitro_opal", name: "Nitro Opal (6yr+)", iconSrc: `${RAW}/subscriptions/badges/opal.png` },

    // Nitro Boost levels
    { id: "boost_lvl1", name: "Boost Level 1", iconSrc: `${RAW}/boosts/discordboost1.svg` },
    { id: "boost_lvl2", name: "Boost Level 2", iconSrc: `${RAW}/boosts/discordboost2.svg` },
    { id: "boost_lvl3", name: "Boost Level 3", iconSrc: `${RAW}/boosts/discordboost3.svg` },
    { id: "boost_lvl4", name: "Boost Level 4", iconSrc: `${RAW}/boosts/discordboost4.svg` },
    { id: "boost_lvl5", name: "Boost Level 5", iconSrc: `${RAW}/boosts/discordboost5.svg` },
    { id: "boost_lvl6", name: "Boost Level 6", iconSrc: `${RAW}/boosts/discordboost6.svg` },
    { id: "boost_lvl7", name: "Boost Level 7", iconSrc: `${RAW}/boosts/discordboost7.svg` },
    { id: "boost_lvl8", name: "Boost Level 8", iconSrc: `${RAW}/boosts/discordboost8.svg` },
    { id: "boost_lvl9", name: "Boost Level 9", iconSrc: `${RAW}/boosts/discordboost9.svg` },

    // Server badges
    { id: "server_partnered", name: "Partnered Server", iconSrc: `${RAW}/server/Partnered.svg` },
    { id: "server_verified", name: "Verified Server", iconSrc: `${RAW}/server/Verified.svg` },
    { id: "server_community", name: "Community Server", iconSrc: `${RAW}/server/CommunityDark.svg` },
    { id: "server_boost3", name: "Server Boost Level 3", iconSrc: `${RAW}/server/Boost3Dark.svg` },
    { id: "server_owner", name: "Server Owner", iconSrc: `${RAW}/server/Crown.svg` },
    { id: "server_new_here", name: "I'm New Here!", iconSrc: `${RAW}/server/NewHere.svg` },

    // Special
    { id: "special_official", name: "Official", iconSrc: `${RAW}/special/Official.svg` },
    { id: "special_system", name: "System", iconSrc: `${RAW}/special/System.svg` },
    { id: "special_server_follow", name: "Server Follow", iconSrc: `${RAW}/special/Server.svg` },
    { id: "special_verified_app", name: "Verified App", iconSrc: `${RAW}/special/VerifiedApp.svg` },
    { id: "special_unverified_app", name: "Unverified App", iconSrc: `${RAW}/special/App.svg` },
    { id: "special_beta", name: "Beta", iconSrc: `${RAW}/special/Beta.svg` },
    { id: "special_ai_clyde", name: "AI (Clyde)", iconSrc: `${RAW}/special/LightAi.svg` },
    { id: "special_op", name: "Original Poster (OP)", iconSrc: `${RAW}/special/OriginalPoster.svg` },
];

const BADGE_CATALOG_BY_ID = new Map(BADGE_CATALOG.map(b => [b.id, b]));

// checkbox setting (key: show_<id>)
const catalogToggleSettings = Object.fromEntries(
    BADGE_CATALOG.map(b => [
        `show_${b.id}`,
        {
            type: OptionType.BOOLEAN,
            description: b.name,
            default: false,
        },
    ])
);

const settings = definePluginSettings({
    ...catalogToggleSettings,

    badgeOrder: {
        type: OptionType.STRING,
        description: "Comma-separated badge IDs controlling display order (only checked badges above actually show). Default order shown below.",
        default: BADGE_CATALOG.map(b => b.id).join(","),
    },
    customBadgesRaw: {
        type: OptionType.STRING,
        description: 'Custom badges as JSON array: [{"id":"unique-id","iconSrc":"url","description":"text"}, ...]',
        default: "[]",
    },
    hiddenBadgeIds: {
        type: OptionType.STRING,
        description: 'Comma-separated badge IDs to hide from your own profile (e.g. "hypesquad_bravery,active_developer")',
        default: "premium_tenure_12_month_v2,hypesquad_house_1,guild_booster_lvl8,legacy_username,quest_completed,orb_profile_badge",
    },
});

function getCustomBadges(): FakeBadge[] {
    try {
        const parsed = JSON.parse(settings.store.customBadgesRaw || "[]");
        if (Array.isArray(parsed)) return parsed;
    } catch {
        
    }
    return [];
}

function getCatalogBadges(): FakeBadge[] {
    const raw = settings.store.badgeOrder;
    const order = (raw && raw.trim().length > 0
        ? raw.split(",").map(id => id.trim()).filter(Boolean)
        : BADGE_CATALOG.map(b => b.id) 
    );

    const result: FakeBadge[] = [];
    for (const id of order) {
        const entry = BADGE_CATALOG_BY_ID.get(id);
        if (!entry) continue;
        const enabled = (settings.store as any)[`show_${id}`];
        if (!enabled) continue;
        result.push({ id: `catalog-${entry.id}`, description: entry.name, iconSrc: entry.iconSrc });
    }
    return result;
}

function getAllFakeBadges(): FakeBadge[] {
    return [...getCatalogBadges(), ...getCustomBadges()];
}

export default definePlugin({
    name: "SelfBadges",
    description: "Shows custom badges (from a full catalog, custom JSON entries, or both) and hides real ones on your own profile. Visible only in your own client.",
    authors: [{ name: "you", id: 0n }],
    settings,

    addSelfBadges(viewedUserId: string | undefined, existingBadges: any[]) {
        const me = UserStore.getCurrentUser();
        if (!me || !viewedUserId || viewedUserId !== me.id) {
            return existingBadges;
        }

        const hiddenIds = new Set(
            (settings.store.hiddenBadgeIds || "")
                .split(",")
                .map(id => id.trim())
                .filter(Boolean)
        );
        const filtered = existingBadges.filter(b => !hiddenIds.has(b.id));

        const existingIds = new Set(filtered.map(b => b.id));
        const fake = getAllFakeBadges().filter(b => !existingIds.has(b.id));
        return [...filtered, ...fake];
    },

    patches: [
        {
            find: "?.getBadges()??[]",
            replacement: {
                match: /(let (\i)=e\?\.getBadges\(\)\?\?\[\];)/,
                replace: "$1$2=$self.addSelfBadges(e?.userId,$2);",
            },
        },
    ],
});

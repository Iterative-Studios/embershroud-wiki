# Embershroud Wiki

The official **Embershroud** reference wiki - a static site (Astro Starlight) whose reference pages
(Skills, Items, Monsters, Zones, NPCs) are **auto-generated from the game's data**, with hand-written
guides and systems pages on top. Live at [wiki.embershroud.com](https://wiki.embershroud.com).

## Local development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build
```

## How content works

- **Reference pages** live under `src/content/docs/<category>/` inside `AUTO-GENERATED` markers.
  These are generated from the game's data and overwritten on each update - don't hand-edit those
  blocks. If a stat is wrong, report it on Discord so it's fixed at the source.
- **Guides & systems pages**, and the `## Notes` section of any page, are hand-written and preserved
  across regeneration. That's where strategy, theorycraft, and explanations go.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), or hop into the
[Embershroud Discord](https://discord.gg/8ExSn2CDB2).


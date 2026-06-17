---
title: Contribute to the Wiki
description: How to suggest fixes, add guides, and help build the Embershroud wiki.
---

The Embershroud wiki is community-friendly and we'd love your help. There are two ways in,
depending on how technical you want to get.

## 1. Suggest it on Discord (easiest)

The simplest way to help: post in the **wiki / guides channels** of the
[Embershroud Discord](https://discord.gg/8ExSn2CDB2). Spotted a wrong stat, a confusing page, or
want to share a build/strategy guide? Drop it there and a maintainer will curate it into the wiki.

This is the main path right now and needs no tools or accounts beyond Discord.

## 2. Open a pull request (for the technical)

The wiki is an open-source static site (Astro Starlight). The easiest route: scroll to the bottom of
any page and click **"Edit page"** - it opens that file in GitHub's web editor (with a Preview tab),
and saving forks the repo and opens a **pull request** for you. No local setup, just a free GitHub
account. You can also fork manually if you prefer:

**[github.com/Iterative-Studios/embershroud-wiki](https://github.com/Iterative-Studios/embershroud-wiki)**

Edit the hand-written guides or a page's `## Notes` section - not the `AUTO-GENERATED` blocks (those
come from the game data, see below). A maintainer reviews and merges.

## What you can and can't edit

The wiki has two layers:

- **Reference pages** (Skills, Items, Monsters, Zones, NPCs) are **auto-generated from the game's
  data.** The stat blocks are fenced like this and are overwritten on every build:

  ```
  <!-- AUTO-GENERATED: DO NOT EDIT below this line ... -->
  ...stats...
  <!-- /AUTO-GENERATED -->
  ```

  Don't edit inside that block - it won't stick. If a stat is wrong, it's a **game-data** issue:
  report it on Discord so it's fixed at the source.

- **The `## Notes` section** of any page, and the **Systems & guides** pages, are yours to write -
  strategy, theorycraft, tips, and explanations.

## A few rules

- Use the in-game terminology you see in the wiki; don't rename established terms.
- No datamined or unreleased content - only what's already public in the game.
- Tag build guides with the patch they're for (e.g. "Current for build 0.1.x").
- Be excellent to each other.

## Privacy

This wiki uses **Cloudflare Web Analytics** for aggregate visit counts only - it is cookieless and
privacy-first, with no personal tracking, fingerprinting, or ads, and no other analytics.

> Contributions may be edited or removed by maintainers. Human-written guides are published under
> **CC BY-SA 4.0**; Embershroud game data and assets remain © Iterative Studios. By contributing you
> grant Iterative Studios a license to publish, edit, and migrate your contribution.

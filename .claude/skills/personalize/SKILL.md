---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the campaign folder

- If no campaign folder was given above, don't write anything. Use Glob on `campaigns/*/emails/*.md` to find the campaign folders that exist, list them, and stop. Tell the user to run `/personalize <campaign folder>`.
- If the folder has no `emails/` folder, or it has no `.md` files, say so, list the campaign folders that do exist, and stop.

## 2. Find the lead groups

- Read `leads/leads.csv` and collect the distinct values in the `group` column. Expect `tea-curious`, `gift-buyers` and `daily-drinkers`.
- Use only the group names. Never copy names, email addresses or other details from the leads file into an email.

## 3. Read the rules

Before writing, read:

- `brand/voice.md`, the brand voice: words we use, words we avoid, claims we never make, and the sign-off.
- `.claude/rules/emails.md`, the rules every email file must follow.

## 4. Write one version of each email per group

For each email in `<campaign folder>/emails/` and each group, write a copy to:

`<campaign folder>/groups/<group>/emails/<same file name>`

Each version changes only two things:

1. **The opening line**, the first sentence after the greeting, so it speaks to that group.
2. **One example**, a single sentence elsewhere in the body, so it fits that group.

Keep everything else exactly as it is in the original, word for word:

- the `Subject:` and `Preview:` lines
- the `Hi {{first_name}},` greeting
- the structure and every other paragraph
- the one link, with its button text and address
- the sign-off and the plain-text footer

How each group reads:

- **tea-curious:** new to loose-leaf tea and keen to explore. Speak to discovery and trying something new.
- **gift-buyers:** thinking of someone else. Speak to giving, sharing and the person who'll open the box.
- **daily-drinkers:** already have a tea habit. Speak to the everyday cup and the ritual of the kettle.

Every version must still follow `brand/voice.md`: warm, curious and unhurried. No words from the avoid list or close variations, and no health, medical or "best" claims.

## 5. Reply with a short summary only

Don't paste the emails back. Reply with:

- how many files you wrote
- one example opening line per group

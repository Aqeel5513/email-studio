# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## The studio

This studio plans and writes email campaigns for a small business. The sample business is Kettlebird Tea, a made-up tea shop launching a monthly tea box called The Steep Club.

### Folders

- `brand/` holds how the brand looks and sounds, such as the brand voice guide.
- `leads/` holds the practice customer list that the emails go to.
- `campaigns/` holds one folder per campaign, with its plan and emails.
- `notes/` holds working notes and decisions, such as which skills to trust.

### Rules

- Write in plain English.
- Never send email to real people.
- Ask me before deleting anything.

### Brand voice

@brand/voice.md

## What this is

An email marketing studio built by following the Email Studio Lab course (FDE-102). `ASSIGNMENT.md` is the source of truth: 15 steps with exact build and check prompts. Read the current step there before starting it, and use its prompts as written.

This is mostly a content repo. There is no build, lint or test setup. A step's check prompt is its test.

## How steps run

Each step goes: build prompt, new session (`/exit`, then `claude`), check prompt, then the user answers the checker's questions. Don't check a step in the session that built it. Check prompts say not to change files, so report problems instead of fixing them.

## Local differences from the assignment

- The studio is this folder (`E:\Email Studio`), not `my-email-studio`. Sibling paths from step 14, such as `../studio-kit` and `../client-two`, resolve to `E:\studio-kit` and `E:\client-two`.
- This path contains a space, so always quote it in commands and hook definitions.
- This machine runs Windows. The assignment's commands assume Git Bash or give both forms.
- Step 2 adds the studio's own description, folder list and rules to this file. Merge them in; don't overwrite what's here.

## Commands

Practice email server, needed for steps 9-11 and 14. Run it in a second terminal and leave it open:

```
npx emulate@0.12.3 start --service resend
```

It serves `http://localhost:4000`. A "connection refused" error from Resend means it isn't running.

## Sending email

No real email is sent in this course. Leads use `@example.com` addresses, and sends go only to the practice server unless the user opts in to the optional real send in step 11.

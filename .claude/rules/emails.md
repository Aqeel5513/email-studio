---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for email files

These rules apply to every email file in any campaign's `emails/` folder. Follow them every time you write or edit an email.

## Start with a subject and a preview

- The first line is `Subject: ...`. Keep the subject to 50 characters or fewer.
- The second line is `Preview: ...`. Keep the preview to 90 characters or fewer.
- Write one subject and one preview only. Don't add options to choose from.

## Greet the reader by name

- Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},".

## Use exactly one main link

- Each email has exactly one main link, written like this:
  `[Button text](https://kettlebird.example/steep-club)`
- Change the button text to fit the email, but keep the address the same.
- Don't add any other links.

## End with the sign-off and the footer

- End the email with our sign-off from `brand/voice.md`:

  Until the next cup,
  The Kettlebird team

- After the sign-off, add this two-line footer as plain text, not inside a code block:

  You're getting this because you joined the Kettlebird Tea waitlist.
  Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

- Nothing comes after the footer. Don't add notes, tips or extra sections to the file.

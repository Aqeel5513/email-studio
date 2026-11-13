// PreToolUse guard for the resend MCP server.
// Blocks (exit 2) any send that could reach someone other than a
// Resend test address (@resend.dev) or my own address (MY_EMAIL).

const LIST_TOOLS = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const SEND_TOOLS = new Set(["send-email", "send-batch-emails"]);
const RECIPIENT_KEYS = new Set(["to", "cc", "bcc"]);

function block(reason) {
  process.stderr.write(`Send guard: ${reason}\n`);
  process.exit(2);
}

// Collect every address under a to, cc or bcc key, at any depth,
// so batch sends (a list of emails) are checked too.
function collectAddresses(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectAddresses(item, found);
  } else if (value && typeof value === "object") {
    for (const [key, inner] of Object.entries(value)) {
      if (RECIPIENT_KEYS.has(key.toLowerCase())) addRecipients(inner, found);
      else collectAddresses(inner, found);
    }
  }
  return found;
}

function addRecipients(value, found) {
  if (Array.isArray(value)) {
    for (const item of value) addRecipients(item, found);
  } else if (typeof value === "string") {
    for (const part of value.split(/[,;]/)) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      // Handle "Name <address@example.com>".
      const angled = trimmed.match(/<([^>]+)>/);
      found.push((angled ? angled[1] : trimmed).trim());
    }
  } else if (value && typeof value === "object") {
    if (typeof value.email === "string") found.push(value.email.trim());
    else collectAddresses(value, found);
  }
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it was blocked to be safe.");
  }

  const toolName = String(call.tool_name || "");
  const action = toolName.replace(/^mcp__resend__/, "");
  const input = call.tool_input || {};

  if (LIST_TOOLS.has(action)) {
    block(`${action} is always blocked because it can reach whole lists of people.`);
  }

  if (!SEND_TOOLS.has(action)) process.exit(0);

  const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();
  const addresses = collectAddresses(input);

  if (addresses.length === 0) {
    block(`${action} has no to, cc or bcc addresses I can check, so it was blocked.`);
  }

  for (const address of addresses) {
    const lower = address.toLowerCase();
    const allowed = lower.endsWith("@resend.dev") || (myEmail && lower === myEmail);
    if (!allowed) {
      block(
        `${address} is not allowed. Sends may only go to @resend.dev test addresses or to MY_EMAIL.`
      );
    }
  }

  process.exit(0);
});

// Smoke test against a running app: `npm run smoke` (BASE_URL defaults to http://localhost:3000).
// Checks the public pages, health, real sign-ups over HTTP, the signed-in redirect, the API's auth and that
// the admin page is hidden from everyone but platform admins.
const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (err) {
    failed++;
    console.log(`FAIL ${name}: ${err.message}`);
  }
}

function expectStatus(res, status) {
  if (res.status !== status) throw new Error(`expected ${status}, got ${res.status}`);
}

for (const path of ["/", "/pricing", "/terms", "/privacy", "/sign-in", "/sign-up"]) {
  await check(`GET ${path}`, async () => expectStatus(await fetch(base + path), 200));
}
await check("GET /api/health", async () => expectStatus(await fetch(`${base}/api/health`), 200));

async function signUp(email) {
  const res = await fetch(`${base}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: base },
    body: JSON.stringify({ name: "Smoke Test", email, password: "smoke-test-password" }),
  });
  expectStatus(res, 200);
  const cookie = res.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
  if (!cookie) throw new Error("no session cookie (is email verification on? then sign-up waits for the email)");
  return cookie;
}

const firstEmail = `smoke-${Date.now()}@example.com`;
let cookie = "";
await check("sign up over HTTP", async () => {
  cookie = await signUp(firstEmail);
});
await check("new user is sent to onboarding", async () => {
  const res = await fetch(`${base}/dashboard`, { headers: { cookie }, redirect: "manual" });
  if (!res.headers.get("location")?.endsWith("/onboarding")) throw new Error(`redirected to ${res.headers.get("location")}`);
});
await check("API rejects a missing key", async () => expectStatus(await fetch(`${base}/api/v1/projects`), 401));

// Next.js renders a layout and its page in parallel, so a 404 status alone proves nothing: check that no
// admin data is in the body, both the HTML and the RSC payload a client-side navigation fetches.
await check("admin page is hidden from a non-admin and a visitor", async () => {
  const other = await signUp(`smoke-${Date.now()}-2@example.com`); // the first account on a new install is the admin; this one is not
  for (const path of ["/admin", "/admin?tab=workspaces"]) {
    for (const who of [other, ""]) {
      for (const rsc of [false, true]) {
        const res = await fetch(base + path, { headers: { ...(who && { cookie: who }), ...(rsc && { RSC: "1" }) }, redirect: rsc ? "follow" : "manual" });
        const body = await res.text();
        const label = `${path} (${who ? "non-admin" : "visitor"}${rsc ? ", RSC" : ""})`;
        if (body.includes("Every user and workspace") || body.includes(firstEmail)) throw new Error(`${label} shows admin data`);
        if (!rsc && !(who ? res.status === 404 : res.headers.get("location")?.includes("/sign-in"))) throw new Error(`${label}: got ${res.status}`);
      }
    }
  }
});

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);

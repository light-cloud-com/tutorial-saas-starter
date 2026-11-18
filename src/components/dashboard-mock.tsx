import { Check, FolderKanban, LayoutDashboard, Settings } from "lucide-react";

// A static picture of the real dashboard for the landing page, drawn with the same tokens so it
// follows the theme. Swap it for a screenshot of your product when you have one.
const stats = [
  { label: "Projects", value: "2", bar: 66 },
  { label: "Members", value: "4", bar: 40 },
  { label: "API keys", value: "1" },
  { label: "Plan", value: "Pro" },
];
const checklist = [
  { label: "Create your workspace", done: true },
  { label: "Invite a teammate", done: true },
  { label: "Create your first project", done: true },
  { label: "Create an API key", done: false },
];
const projects = [
  { name: "Website relaunch", text: "Marketing site and blog", when: "2 hours ago" },
  { name: "Mobile app", text: "iOS and Android beta", when: "yesterday" },
  { name: "Billing migration", text: "Move invoices to Stripe", when: "3 days ago" },
];

export function DashboardMock({ appName }: { appName: string }) {
  return (
    <div role="img" aria-label={`The ${appName} dashboard: usage, a getting-started checklist and recent projects`} className="overflow-hidden rounded-xl border bg-background text-left">
      <div aria-hidden className="flex text-[11px] sm:text-xs">
        <div className="hidden w-44 shrink-0 flex-col gap-3 border-r bg-surface p-3 md:flex">
          <div className="flex items-center gap-2 font-semibold">
            <span className="size-5 rounded-md bg-primary" /> {appName}
          </div>
          <div className="rounded-md border bg-background p-2">
            <p className="font-medium">Leeds Design Studio</p>
            <p className="text-[10px] text-muted-foreground">Pro plan</p>
          </div>
          <div className="space-y-0.5">
            <p className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 font-medium text-link"><LayoutDashboard className="size-3.5" /> Dashboard</p>
            <p className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground"><FolderKanban className="size-3.5" /> Projects</p>
            <p className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground"><Settings className="size-3.5" /> Settings</p>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t pt-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-link">SJ</span>
            <span className="min-w-0">
              <span className="block truncate font-medium">Sarah Jones</span>
              <span className="block truncate text-[10px] text-muted-foreground">sarah@leedsdesignstudio.example</span>
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-3 p-3 sm:space-y-4 sm:p-5">
          <div>
            <p className="text-sm font-semibold sm:text-base">Dashboard</p>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {stats.map(({ label, value, bar }) => (
              <div key={label} className="rounded-md border p-2.5">
                <p className="text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold sm:text-base">{value}</p>
                <div className="mt-2 h-1 rounded-full bg-muted">{bar && <div className="h-full rounded-full bg-primary" style={{ width: `${bar}%` }} />}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-md border">
              <div className="space-y-1.5 border-b p-2.5">
                <p className="font-semibold">Get started</p>
                <div className="h-1 rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
              </div>
              {checklist.map((c) => (
                <p key={c.label} className="flex items-center gap-2 border-b px-2.5 py-1.5 last:border-b-0">
                  <span className={c.done ? "flex size-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground" : "size-3.5 rounded-full border"}>
                    {c.done && <Check className="size-2.5" />}
                  </span>
                  <span className={c.done ? "text-muted-foreground line-through" : "font-medium"}>{c.label}</span>
                </p>
              ))}
            </div>
            <div className="hidden rounded-md border sm:block">
              <p className="border-b p-2.5 font-semibold">Recent projects</p>
              {projects.map((p) => (
                <div key={p.name} className="flex items-center gap-2 border-b px-2.5 py-1.5 last:border-b-0">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{p.name}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{p.text}</span>
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{p.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  ArrowRight,
  BadgeCheck,
  Check,
  Download,
  ExternalLink,
  MousePointerClick,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import companionHome from "../assets/screenshots/companion-home-preview.png";
import companionMappings from "../assets/screenshots/companion-mappings-preview.png";
import companionSettings from "../assets/screenshots/companion-settings-preview.png";
import arcIcon from "../assets/browser-icons/arc.png";
import chromeIcon from "../assets/browser-icons/chrome.png";
import edgeIcon from "../assets/browser-icons/edge.png";
import firefoxIcon from "../assets/browser-icons/firefox.png";
import operaIcon from "../assets/browser-icons/opera.png";
import zenIcon from "../assets/browser-icons/zen.png";

const CHECKOUT_URL =
  "https://checkout.dodopayments.com/buy/pdt_0NdkXEuVzR4beTnQw1Wvp?quantity=1";
const RELEASES_URL =
  "https://github.com/matheus-apolonio/tabflow-resources/releases";

const browsers = [
  { name: "Chrome", icon: chromeIcon },
  { name: "Firefox", icon: firefoxIcon },
  { name: "Edge", icon: edgeIcon },
  { name: "Opera", icon: operaIcon },
  { name: "Zen", icon: zenIcon },
  { name: "Arc", icon: arcIcon },
];

const shots = [
  {
    label: "Home",
    title: "Status at a glance",
    src: companionHome,
  },
  {
    label: "Mappings",
    title: "URL rules in one place",
    src: companionMappings,
  },
  {
    label: "License",
    title: "Local-first licensing",
    src: companionSettings,
  },
];

const features = [
  {
    icon: Route,
    title: "Route links automatically",
    description:
      "Map a domain or pattern once. TabFlow sends the next click to the browser profile that should own it.",
  },
  {
    icon: MousePointerClick,
    title: "Keep manual control",
    description:
      "Use Open in... for one-off moves, override a redirect, or pause routing when you need a quiet session.",
  },
  {
    icon: ShieldCheck,
    title: "Local-first by design",
    description:
      "Rules live on your device. Optional sync is separate and uses providers you connect yourself.",
  },
];

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a className="flex items-center gap-2.5 font-semibold" href="#top">
            <span className="grid size-8 place-items-center rounded-md bg-foreground text-xs font-bold text-background">
              TF
            </span>
            <span>TabFlow</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a
              className="transition-colors hover:text-foreground"
              href="#screens"
            >
              Screens
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#browsers"
            >
              Browsers
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#pricing"
            >
              Pricing
            </a>
          </nav>
          <Button asChild size="sm">
            <a href={CHECKOUT_URL} rel="noopener noreferrer">
              Buy lifetime
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl content-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-6 w-fit gap-1.5">
              <Sparkles className="size-3.5" />
              Browser routing for split contexts
            </Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              TabFlow routes every link to the right browser.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              A desktop companion app and browser extension that keep work,
              personal, client, and focus profiles from stepping on each other.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={CHECKOUT_URL} rel="noopener noreferrer">
                  Buy lifetime license
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={RELEASES_URL} rel="noopener noreferrer">
                  Download app
                  <Download className="size-4" />
                </a>
              </Button>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-muted-foreground">
              {["Local-first", "No account", "Cross-browser"].map((item) => (
                <span className="flex items-center gap-2" key={item}>
                  <Check className="size-4 text-foreground" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center lg:justify-end">
            <ProductPreview />
          </div>
        </section>

        <Separator />

        <section
          id="screens"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
        >
          <SectionHeader
            eyebrow="Companion App"
            title="Real screens, quiet interface."
            description="These are preview captures from the current app. They are intentionally temporary so you can replace them with polished product shots later."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {shots.map((shot) => (
              <Card key={shot.label} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <Badge variant="outline" className="w-fit">
                    {shot.label}
                  </Badge>
                  <CardTitle className="text-base">{shot.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt={`${shot.label} preview from TabFlow Companion App`}
                    className="aspect-[16/4] w-full rounded-sm object-cover object-left-top shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                    src={shot.src}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="browsers"
          className="border-y border-border/70 bg-muted/35"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Compatible browsers
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for browser setups that are already complicated.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {browsers.map((browser) => (
                <div
                  className="flex min-h-16 items-center gap-3 rounded-md bg-background px-4 shadow-sm shadow-black/5"
                  key={browser.name}
                >
                  <img
                    alt=""
                    className="size-8 shrink-0 rounded-sm object-contain"
                    src={browser.icon}
                  />
                  <span className="text-sm font-medium">{browser.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeader
            eyebrow="Workflow"
            title="The extension watches. The app decides."
            description="TabFlow keeps the routing rules in the Companion App and lets the browser extension handle the moment a click should move."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <span className="mb-3 grid size-10 place-items-center rounded-md bg-muted">
                    <feature.icon className="size-5" />
                  </span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-pretty leading-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6"
        >
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pricing
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start local. Upgrade when it becomes daily infrastructure.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Free local</CardTitle>
                  <CardDescription>Try routing on one machine.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-3xl font-semibold tabular-nums">$0</p>
                  <FeatureList
                    items={[
                      "Up to 3 mappings",
                      "One browser family",
                      "Local settings",
                    ]}
                  />
                </CardContent>
              </Card>
              <Card className="bg-foreground text-background">
                <CardHeader>
                  <Badge className="w-fit bg-background text-foreground">
                    Best fit
                  </Badge>
                  <CardTitle className="text-xl">Lifetime</CardTitle>
                  <CardDescription className="text-background/70">
                    One purchase for serious multi-profile workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-3xl font-semibold">One-time purchase</p>
                  <FeatureList
                    muted
                    items={[
                      "Unlimited mappings",
                      "Unlimited browser families",
                      "One active device license",
                      "Optional extra seats",
                    ]}
                  />
                  <Button asChild variant="secondary" className="w-full">
                    <a href={CHECKOUT_URL} rel="noopener noreferrer">
                      Buy lifetime
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid gap-8 rounded-md bg-muted/45 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4 gap-1.5">
                <BadgeCheck className="size-3.5" />
                Ready for the next click
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Stop dragging links between browsers.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
                Build the routing map once. Keep each context in its own
                profile. Let TabFlow handle the handoff.
              </p>
            </div>
            <Button asChild size="lg">
              <a href={CHECKOUT_URL} rel="noopener noreferrer">
                Buy lifetime license
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="font-medium text-foreground">TabFlow</span>
          <div className="flex gap-5">
            <a className="hover:text-foreground" href={RELEASES_URL}>
              Downloads
            </a>
            <a
              className="hover:text-foreground"
              href="https://github.com/matheus-apolonio/tabflow-resources/issues"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-muted-foreground">{description}</p>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="w-full max-w-2xl rounded-md bg-muted/35 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.10)] ring-1 ring-black/10">
      <div className="space-y-3">
        {shots.map((shot) => (
          <div
            className="overflow-hidden rounded-sm bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
            key={shot.label}
          >
            <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/45 px-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                {shot.title}
              </span>
            </div>
            <img
              alt={`${shot.label} preview from TabFlow Companion App`}
              className="h-24 w-full object-cover object-left-top sm:h-28"
              src={shot.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureList({
  items,
  muted = false,
}: {
  items: string[];
  muted?: boolean;
}) {
  return (
    <ul className="space-y-3 text-sm">
      {items.map((item) => (
        <li
          className={
            muted
              ? "flex gap-2 text-background/75"
              : "flex gap-2 text-muted-foreground"
          }
          key={item}
        >
          <Check
            className={
              muted
                ? "mt-0.5 size-4 text-background"
                : "mt-0.5 size-4 text-foreground"
            }
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

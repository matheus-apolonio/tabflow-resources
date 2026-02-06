# TabFlow

**Stop switching browsers manually.** TabFlow automatically opens URLs in the right browser profile based on rules you set.

Assign URL patterns like `github.com` to your Work profile and `youtube.com` to your Personal profile. When you click a link, TabFlow handles the rest.

## Download

### Desktop App (required)

Download the latest version from the [Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases).

| Platform | File |
| --- | --- |
| macOS (Apple Silicon) | `TabFlow App-x.x.x-arm64.dmg` |
| macOS (Intel) | `TabFlow App-x.x.x.dmg` |
| Windows | Coming soon |

### Browser Extension

The browser extension works alongside the desktop app to intercept and redirect tabs.

| Browser | Download |
| --- | --- |
| Chrome / Edge / Brave / Arc / Opera | Download from the [Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases) — look for `tabflow-chromium-x.x.x.zip` |
| Firefox | Download from the [Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases) — look for `tabflow-firefox-x.x.x.zip` |

## Installation

### 1. Install the Desktop App

1. Download the installer for your platform from the link above
2. Open the downloaded file and follow the installation prompts
3. Launch TabFlow — it will appear in your system tray / menu bar
4. Create an account or sign in

### 2. Install the Browser Extension

**Chrome / Chromium browsers:**

1. Download the Chromium zip from the Releases page and unzip it
2. Open `chrome://extensions` in your browser
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the unzipped folder
5. Repeat for each browser profile you want TabFlow to manage

**Firefox:**

1. Download the Firefox zip from the Releases page
2. Open `about:addons` in Firefox
3. Click the gear icon and select **Install Add-on From File**
4. Select the downloaded zip file

### 3. Link Your Profiles

1. Open the TabFlow desktop app
2. Go to the **Home** page — your detected browsers and profiles will appear
3. Click **Sync** next to each browser profile to link it with TabFlow
4. The extension popup will confirm the connection

## How to Use

### Add URL Mappings

1. Open the TabFlow app and go to the **Mappings** page
2. Click **Add Mapping**
3. Enter a URL pattern (e.g., `github.com`) and select the target browser profile
4. That's it — any URL matching the pattern will now open in the selected profile

### URL Pattern Examples

| Pattern | What it matches |
| --- | --- |
| `github.com` | Any GitHub page |
| `youtube.com` | Any YouTube page |
| `docs.google.com` | Google Docs specifically |
| `slack.com` | Slack workspace |

Patterns are flexible — they match regardless of `https://`, `www.`, or trailing slashes.

### Pause / Resume

Need to temporarily disable redirection?

- Click the **TabFlow icon** in your system tray / menu bar
- Choose a pause duration: 5, 15, 30, or 60 minutes — or pause indefinitely
- Click again to resume

You can also pause/resume from the browser extension popup.

## Features

- **Automatic URL routing** — URLs open in the right browser profile without manual switching
- **Multi-browser support** — Chrome, Firefox, Edge, Opera, Brave, Arc, Zen, Comet, Dia, and more
- **Flexible patterns** — Simple domain-based rules that just work
- **System tray integration** — Quick access to pause, resume, and status
- **Cross-device sync** — Your mappings and preferences sync across all your devices
- **Device management** — See and manage all your registered devices
- **Import / Export** — Back up your mappings or transfer them between machines
- **Multi-language** — Available in English, Spanish, French, and Portuguese
- **Auto-updates** — Get notified when a new version is available
- **30-day free trial** — Full access to all features, no credit card required

## Plans

| | Free | Trial (30 days) | Pro |
| --- | --- | --- | --- |
| URL mappings | Up to 10 | Unlimited | Unlimited |
| Browser profiles | Up to 2 | Unlimited | Unlimited |
| Cross-device sync | — | Included | Included |
| Import mappings | — | Included | Included |
| Export mappings | Included | Included | Included |
| Devices | 1 | 2 | Based on plan |

## Configuration

### Settings

Open the TabFlow app and go to **Settings** to configure:

- **Theme** — Light or dark mode (follows system by default)
- **Language** — English, Spanish, French, or Portuguese
- **Update behavior** — Automatic, notify only, or manual
- **Sync** — Toggle mapping and preference sync on/off
- **Devices** — View and manage registered devices
- **Account** — Manage your account, view license info, or delete your account

### Sync

When sync is enabled, your URL mappings and app preferences are automatically kept in sync across all your devices. Changes made on one device appear on the others within seconds.

To enable sync:

1. Go to **Settings** > **Sync**
2. Toggle on **Sync mappings** and/or **Sync preferences**

Sync requires an active trial or Pro license.

## Troubleshooting

**The extension isn't redirecting URLs:**

- Make sure the TabFlow desktop app is running
- Check that the browser profile is linked (Home page → Sync button)
- Verify your mapping patterns on the Mappings page

**"Device limit reached" message:**

- You've registered the maximum number of devices for your plan
- Go to **Settings** > **Devices** to deactivate a device you no longer use

**Mappings aren't syncing:**

- Check that sync is enabled in **Settings** > **Sync**
- Ensure you have an active trial or Pro license
- Check your internet connection

## Support

If you run into any issues, please [open an issue](https://github.com/matheus-apolonio/tabflow-resources/issues) on this repository.

## Latest Releases

<!-- TABFLOW_RELEASES_START -->
*No releases published yet. Release notes will appear here automatically after each publish.*
<!-- TABFLOW_RELEASES_END -->

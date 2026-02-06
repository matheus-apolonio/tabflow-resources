# 🔀 TabFlow

**The smart tab router for multi-browser setups.**

TabFlow automatically opens URLs in the right browser profile — so you never have to manually copy-paste links between Chrome, Firefox, or any other browser again.

> Map `github.com` → Work profile, `youtube.com` → Personal profile.
> Click a link anywhere. TabFlow handles the rest.

---

## ✨ Features & Plans

|  | 🆓 Free | 🕐 Trial (30 days) | ⭐ Pro |
| --- | :---: | :---: | :---: |
| **Automatic URL routing** | ✅ | ✅ | ✅ |
| **Pause / resume** from tray or extension | ✅ | ✅ | ✅ |
| **System tray** with live status | ✅ | ✅ | ✅ |
| **Auto-updates** | ✅ | ✅ | ✅ |
| **Multi-language** (EN, ES, FR, PT-BR) | ✅ | ✅ | ✅ |
| **Export** mappings | ✅ | ✅ | ✅ |
| URL mappings | Up to 10 | Unlimited | Unlimited |
| Browser profiles | Up to 2 | Unlimited | Unlimited |
| **Import** mappings | — | ✅ | ✅ |
| **Cross-device sync** | — | ✅ | ✅ |
| **Device management** | 1 device | 2 devices | Based on plan |

> 🎁 Every new account gets a **30-day free trial** with full access — no credit card required.

---

## 🧩 How Pattern Matching Works

You create simple rules that map URL patterns to browser profiles. TabFlow matches flexibly:

| You type | ✅ It matches all of these |
| --- | --- |
| `youtube.com` | `https://www.youtube.com`, `https://youtube.com/watch?v=...`, `youtube.com` |
| `notion.so` | `https://www.notion.so`, `https://notion.so/page`, `notion.so` |
| `docs.google.com` | `https://docs.google.com/document/d/...` |
| `slack` | `https://app.slack.com`, `https://slack.com`, `slack.com/workspace` |

> 💡 Matching is **case-insensitive**, **protocol-agnostic** (`http://` or `https://`), **www-agnostic**, and **trailing-slash-agnostic**.

---

## 📥 Download & Install

### 1. Desktop App (required)

Download the latest version from the [📦 Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases).

| Platform | File |
| --- | --- |
| 🍎 macOS (Apple Silicon) | `TabFlow App-x.x.x-arm64.dmg` |
| 🍎 macOS (Intel) | `TabFlow App-x.x.x.dmg` |
| 🪟 Windows | Coming soon |

**Steps:**

1. Download the `.dmg` for your platform
2. Open it and drag TabFlow to Applications
3. Launch TabFlow — it will appear in your menu bar
4. Create an account or sign in

### 2. Browser Extension

The extension works alongside the desktop app to intercept and redirect tabs.

| Browser | Install from |
| --- | --- |
| 🟡 Chrome | [Chrome Web Store](https://chromewebstore.google.com) |
| 🟠 Firefox | [Firefox Add-ons](https://addons.mozilla.org) |

> ⚠️ Currently tested on **Chrome** and **Firefox**. Other Chromium-based browsers (Edge, Brave, Arc, Opera) may work but are not officially tested yet.

**Steps:**

1. Install the extension from your browser's store (links above)
2. The extension icon will appear in your toolbar
3. Repeat for each browser profile you want TabFlow to manage

### 3. Link Your Browser Profiles

1. Open the TabFlow desktop app
2. Go to the **Home** page — your detected browsers and profiles will appear
3. Click **Sync** next to each browser profile to link it with TabFlow
4. The extension popup will confirm the connection

---

## 🚀 Getting Started

### Add Your First Mapping

1. Open TabFlow and go to the **Mappings** page
2. Click **Add Mapping**
3. Type a URL pattern (e.g., `github.com`)
4. Select the target browser profile
5. Done — that URL will now always open in the right place

### Pause / Resume

Need to temporarily stop redirecting?

- Click the **TabFlow icon** in your menu bar / system tray
- Pick a duration: 5, 15, 30, or 60 minutes — or pause indefinitely
- Click again to resume

You can also pause/resume from the browser extension popup.

---

## ⚙️ Configuration

Open TabFlow and go to **Settings**:

| Setting | Options |
| --- | --- |
| 🎨 **Theme** | Light, Dark, or System |
| 🌐 **Language** | English, Spanish, French, Portuguese |
| 🔄 **Updates** | Automatic, Notify only, or Manual |
| ☁️ **Sync** | Toggle mapping and preference sync |
| 💻 **Devices** | View and manage registered devices |
| 👤 **Account** | License info, delete account |

### Cross-Device Sync

When enabled, your URL mappings and preferences sync across all your devices automatically. Changes on one device appear on others within seconds.

1. Go to **Settings** → **Sync**
2. Toggle on **Sync mappings** and/or **Sync preferences**

> Sync requires an active trial or Pro license.

---

## ❓ Troubleshooting

**The extension isn't redirecting URLs:**

- Make sure the TabFlow desktop app is running
- Check that the browser profile is linked (Home → Sync button)
- Verify your mapping patterns on the Mappings page

**"Device limit reached" message:**

- You've registered the maximum number of devices for your plan
- Go to **Settings** → **Devices** to deactivate a device you no longer use

**Mappings aren't syncing:**

- Check that sync is enabled in **Settings** → **Sync**
- Ensure you have an active trial or Pro license
- Check your internet connection

---

## 💬 Support

Run into an issue? [Open an issue](https://github.com/matheus-apolonio/tabflow-resources/issues) on this repository.

---

## 📋 Latest Releases

<!-- TABFLOW_RELEASES_START -->
*No releases published yet. Release notes will appear here automatically after each publish.*
<!-- TABFLOW_RELEASES_END -->

# 🔀 TabFlow

**The smart tab router for multi-browser setups.**

TabFlow automatically opens URLs in the right browser profile — no more copy-pasting links between browsers.

> `github.com` → Work profile · `youtube.com` → Personal profile
> Click a link anywhere. TabFlow handles the rest.

---

## 🔄 How It Works

TabFlow has two parts: a **desktop app** and a **browser extension**.

You set up URL-to-profile rules in the desktop app. The browser extension picks up navigation in real time — if a URL belongs to a different profile, the tab is automatically redirected. You can always override a redirect with **"Open here instead"**.

Right-click any link to manually **"Open in..."** another profile, no mapping needed.

Need a break? **Pause redirection** for 5, 15, 30, or 60 minutes — or indefinitely — from the system tray or extension popup.

---

## 🧩 Flexible Pattern Matching

| You type | Matches |
| --- | --- |
| `youtube.com` | `https://www.youtube.com`, `https://youtube.com/watch?v=...` |
| `docs.google.com` | `https://docs.google.com/document/d/...` |
| `slack` | `https://app.slack.com`, `https://slack.com/workspace` |

Case-insensitive · protocol-agnostic · www-agnostic · trailing-slash-agnostic.

---

## ✨ Plans

|  | 🆓 Free | 🕐 Trial (30 days) | ⭐ Pro |
| --- | :---: | :---: | :---: |
| Automatic URL routing | ✅ | ✅ | ✅ |
| Right-click "Open in..." | ✅ | ✅ | ✅ |
| Pause / resume | ✅ | ✅ | ✅ |
| System tray with live status | ✅ | ✅ | ✅ |
| Auto-updates | ✅ | ✅ | ✅ |
| Multi-language (EN · ES · FR · PT-BR) | ✅ | ✅ | ✅ |
| Export mappings | ✅ | ✅ | ✅ |
| URL mappings | Up to 10 | Up to 100 | Unlimited |
| Browser profiles | Up to 2 | Up to 5 | Unlimited |
| Import mappings | — | ✅ | ✅ |
| Cross-device sync | — | ✅ | ✅ |

All plans are limited to **1 device**. You can switch devices anytime by deactivating the old one in Settings.

> 🎁 Every new account starts with a **30-day free trial** — full access, no credit card required.

---

## 📥 Download

### Desktop App

Download from the [Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases).

| Platform | File |
| --- | --- |
| 🍎 macOS (Apple Silicon) | `TabFlow-App-x.x.x-arm64.dmg` |
| 🪟 Windows | `TabFlow-App-x.x.x-Setup.exe` |
| 🐧 Linux | `.deb` (Debian/Ubuntu) · `.rpm` (Fedora/RHEL) |

### Browser Extension

Install in **every browser profile** you want TabFlow to manage.

| Browser | Install from |
| --- | --- |
| Chrome, Edge, Opera, and Chromium-based | [Chrome Web Store](https://chromewebstore.google.com) |
| Firefox, Zen, and Firefox-based | [Firefox Add-ons](https://addons.mozilla.org) |

---

## ⚙️ Settings

| Setting | Options |
| --- | --- |
| 🎨 Theme | Light · Dark · System |
| 🌐 Language | English · Spanish · French · Portuguese |
| 🔄 Updates | Automatic · Notify only · Manual |
| ☁️ Sync | Toggle mapping and preference sync (Trial / Pro) |
| 💻 Devices | View and manage registered devices |
| 👤 Account | License info and plan management |

---

## ❓ FAQ

**Do both parts need to be installed?**
Yes — the desktop app manages your mappings and the extension handles redirection. Both are required.

**What happens if the desktop app isn't running?**
Nothing — the extension stays idle and your browsing works normally.

**How do I link Firefox profiles?**
Firefox uses a 6-character sync code. Click Sync in the desktop app, then enter the code in the Firefox extension popup.

**Can I override a redirect?**
Yes — click **"Open here instead"** on the redirect page. That tab will stay in the current profile.

**I hit the device limit. What do I do?**
Go to **Settings → Devices** and deactivate a device you no longer use.

---

## 💬 Support

Run into an issue? [Open an issue](https://github.com/matheus-apolonio/tabflow-resources/issues) on this repository.

---

## 📋 Latest Releases

<!-- TABFLOW_RELEASES_START -->
### Desktop App — v2026.315.0
*Released March 15, 2026*

[Download](https://github.com/matheus-apolonio/tabflow-resources/releases/tag/tabflow-companion-app-v2026.315.0)

### Browser Extension — v2026.312.0
*Released March 12, 2026*

[Download](https://github.com/matheus-apolonio/tabflow-resources/releases/tag/tabflow-browser-extension-v2026.312.0)
<!-- TABFLOW_RELEASES_END -->

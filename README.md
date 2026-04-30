# TabFlow

**The smart tab router for multi-browser setups.**

TabFlow automatically opens URLs in the right browser profile, so you do not have to copy and paste links between browsers.

> `github.com` -> Work profile  
> `youtube.com` -> Personal profile  
> Click a link anywhere. TabFlow handles the rest.

---

## How It Works

TabFlow has two parts: a **desktop app** and a **browser extension**.

You set up URL-to-profile rules in the desktop app. The browser extension watches navigation in real time. If a URL belongs in a different browser profile, TabFlow redirects it automatically.

You can always override a redirect with **Open here instead**.

Right-click any link to manually **Open in...** another profile, no mapping needed.

Need a break? Pause redirection for 5, 15, 30, or 60 minutes, or indefinitely, from the system tray or extension popup.

---

## Flexible Pattern Matching

| You type | Matches |
| --- | --- |
| `youtube.com` | `https://www.youtube.com`, `https://youtube.com/watch?v=...` |
| `docs.google.com` | `https://docs.google.com/document/d/...` |
| `slack` | `https://app.slack.com`, `https://slack.com/workspace` |

Matching is case-insensitive, protocol-agnostic, www-agnostic, and trailing-slash-agnostic.

---

## Features

- Automatic URL routing between browser profiles
- Right-click **Open in...** for one-off routing
- Redirect override with **Open here instead**
- Pause and resume controls
- System tray with live status
- Local-first mappings and settings
- Optional sync with your own cloud provider
- Import and export for mappings
- Device management for licensed installs
- Auto-updates
- Light, dark, and system themes
- English, Spanish, French, and Portuguese

---

## Plans

TabFlow is local-first. You can use the free mode without creating an account.

|  | Free local | Lifetime license | Extra seats |
| --- | :---: | :---: | :---: |
| Automatic URL routing | Yes | Yes | Yes |
| Right-click **Open in...** | Yes | Yes | Yes |
| Pause / resume | Yes | Yes | Yes |
| System tray with live status | Yes | Yes | Yes |
| Auto-updates | Yes | Yes | Yes |
| Multi-language UI | Yes | Yes | Yes |
| Import / export mappings | Yes | Yes | Yes |
| Active URL mappings | Up to 3 | Unlimited | Unlimited |
| Browser families | 1 | Unlimited | Unlimited |
| Devices | 1 | 1 | Base device plus purchased seats |

The lifetime license is a one-time purchase. Extra seats are optional and add more devices to an existing lifetime license.

Licensing is separate from sync. Sync is optional and uses providers you connect, such as Google Drive or OneDrive.

---

## Download

### Desktop App

Download the desktop app from the [Releases page](https://github.com/matheus-apolonio/tabflow-resources/releases).

| Platform | File |
| --- | --- |
| macOS | `.dmg` or `.zip` |
| Windows | `.exe` installer |
| Linux | `.deb` or `.rpm` |

### Browser Extension

Install the extension in every browser profile you want TabFlow to manage.

| Browser | Install from |
| --- | --- |
| Chrome, Edge, Opera, and Chromium-based browsers | Chrome Web Store |
| Firefox, Zen, and Firefox-based browsers | Firefox Add-ons |

---

## Settings

| Setting | What it controls |
| --- | --- |
| Theme | Light, dark, or system |
| Language | English, Spanish, French, or Portuguese |
| Updates | Automatic, download first, or manual |
| Sync | Optional mapping sync through your own provider |
| Devices | Devices linked to your license |
| License | Free mode, license activation, and extra seats |

---

## FAQ

**Do both parts need to be installed?**  
Yes. The desktop app manages your mappings and the extension handles redirection. Both are required.

**What happens if the desktop app is not running?**  
Nothing breaks. The extension stays idle and your browsing works normally.

**How do I link Firefox profiles?**  
Firefox uses a 6-character sync code. Click Sync in the desktop app, then enter the code in the Firefox extension popup.

**Can I override a redirect?**  
Yes. Click **Open here instead** on the redirect page. That tab will stay in the current profile.

**I hit the device limit. What do I do?**  
Go to **Settings -> Devices** and deactivate a device you no longer use, or buy an extra device seat if you want to keep both devices active.

**Do I need an account?**  
No traditional TabFlow account is required. A lifetime license is activated with the purchase email and license key from your receipt.

---

## Support

Run into an issue? [Open an issue](https://github.com/matheus-apolonio/tabflow-resources/issues) on this repository.

---

## Latest Releases

<!-- TABFLOW_RELEASES_START -->
### Desktop App — v2026.430.0
*Released April 30, 2026*

[Download](https://github.com/matheus-apolonio/tabflow-resources/releases/tag/tabflow-companion-app-v2026.430.0)

### Browser Extension — v2026.429.0
*Released April 29, 2026*

[Download](https://github.com/matheus-apolonio/tabflow-resources/releases/tag/tabflow-browser-extension-v2026.429.0)
<!-- TABFLOW_RELEASES_END -->

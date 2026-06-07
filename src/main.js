import "./styles.css";

const RELEASES_API = "https://api.github.com/repos/matheus-apolonio/tabflow-resources/releases?per_page=100";
const RELEASES_URL = "https://github.com/matheus-apolonio/tabflow-resources/releases";

const platformAssets = {
  macos: {
    label: "macOS",
    glyph: "",
    pattern: /^TabFlow-App-.+\.dmg$/i,
  },
  windows: {
    label: "Windows",
    glyph: "⊞",
    pattern: /^TabFlow-App-.+(Setup\.exe|\.msi)$/i,
  },
  linux: {
    label: "Linux",
    glyph: "◆",
    pattern: /^(tabflow-app_.+_amd64\.deb|TabFlow-App-.+\.AppImage)$/i,
  },
};

const THEME_STORAGE_KEY = "tabflow-site-theme";
const systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function storedTheme() {
  const theme = localStorage.getItem(THEME_STORAGE_KEY);
  return theme === "dark" || theme === "light" ? theme : null;
}

function effectiveTheme() {
  return storedTheme() ?? (systemDarkQuery.matches ? "dark" : "light");
}

function updateThemeImages(theme) {
  document.querySelectorAll("[data-theme-image]").forEach((image) => {
    const source = image.dataset[theme === "dark" ? "darkSrc" : "lightSrc"];
    if (source && image.getAttribute("src") !== source) {
      image.setAttribute("src", source);
    }
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#09090b" : "#ffffff",
  );
  updateThemeImages(theme);
}

function setupTheme() {
  applyTheme(effectiveTheme());
  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const nextTheme = effectiveTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
  systemDarkQuery.addEventListener("change", () => {
    if (!storedTheme()) applyTheme(effectiveTheme());
  });
}

function detectPlatform() {
  const platform = `${navigator.userAgentData?.platform ?? navigator.platform ?? ""} ${navigator.userAgent ?? ""}`.toLowerCase();
  if (platform.includes("mac")) return "macos";
  if (platform.includes("win")) return "windows";
  if (platform.includes("linux")) return "linux";
  return "unknown";
}

function semverParts(tagName) {
  const match = tagName.match(/^app-(\d+)\.(\d+)\.(\d+)$/);
  return match ? match.slice(1).map(Number) : [0, 0, 0];
}

function compareAppRelease(left, right) {
  const leftParts = semverParts(left.tag_name);
  const rightParts = semverParts(right.tag_name);
  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return rightParts[index] - leftParts[index];
    }
  }
  return new Date(right.published_at ?? right.created_at ?? 0) - new Date(left.published_at ?? left.created_at ?? 0);
}

function setDownloadState({ href, platformLabel, release, directAsset }) {
  const links = document.querySelectorAll("[data-download-link]");
  const labels = document.querySelectorAll("[data-download-label]");
  const glyphs = document.querySelectorAll("[data-platform-glyph]");
  const status = document.querySelector("[data-download-status]");
  const releaseTitle = document.querySelector("[data-release-title]");
  const releaseMeta = document.querySelector("[data-release-meta]");
  const platform = Object.values(platformAssets).find((candidate) => candidate.label === platformLabel);

  links.forEach((link) => {
    link.href = href;
    link.rel = "noopener noreferrer";
  });

  const labelText = platform ? "Download for" : "Download";
  labels.forEach((label) => {
    label.textContent = labelText;
  });
  glyphs.forEach((glyph) => {
    glyph.textContent = platform?.glyph ?? "";
    glyph.hidden = !platform;
  });

  if (status) {
    status.textContent = directAsset
      ? `Latest ${platformLabel} installer: ${directAsset.name}`
      : `No direct ${platformLabel} installer is attached yet. Opening the latest app release.`;
  }

  if (releaseTitle) {
    releaseTitle.textContent = release?.name ?? "Latest TabFlow App release";
  }

  if (releaseMeta && release) {
    const published = release.published_at ? new Date(release.published_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) : "recently";
    const appReleaseName = release.tag_name.replace(/^app-/, "tabflow-companion-app-");
    releaseMeta.textContent = `${appReleaseName} published ${published}. The download is selected automatically for ${platformLabel}.`;
  }
}

function setFallbackState(platformKey = detectPlatform()) {
  const platformLabel = platformAssets[platformKey]?.label ?? "your platform";
  setDownloadState({
    href: RELEASES_URL,
    platformLabel,
    release: null,
    directAsset: null,
  });
}

async function hydrateDownloads() {
  const platformKey = detectPlatform();
  const platform = platformAssets[platformKey];
  if (!platform) {
    setFallbackState(platformKey);
    return;
  }

  try {
    const response = await fetch(RELEASES_API, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const releases = await response.json();
    const appRelease = releases
      .filter((release) => !release.draft && release.tag_name?.startsWith("app-"))
      .sort(compareAppRelease)[0];

    if (!appRelease) {
      setFallbackState(platformKey);
      return;
    }

    const asset = appRelease.assets?.find((candidate) => platform.pattern.test(candidate.name));
    setDownloadState({
      href: asset?.browser_download_url ?? appRelease.html_url ?? RELEASES_URL,
      platformLabel: platform.label,
      release: appRelease,
      directAsset: asset,
    });
  } catch (error) {
    console.warn("Could not resolve latest TabFlow download", error);
    setFallbackState(platformKey);
  }
}

setupTheme();
void hydrateDownloads();

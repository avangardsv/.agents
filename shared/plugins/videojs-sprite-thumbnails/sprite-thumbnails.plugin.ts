// shared/plugins/videojs-sprite-thumbnails/sprite-thumbnails.plugin.ts
// In-house implementation compatible with the public API used in the app.

import videojs, { VideoJsPlayer } from "video.js";
import type { SpriteThumbnailsOptions } from "./types";

type MouseLikeEvent = MouseEvent | TouchEvent;

const PLUGIN_NAME = "spriteThumbnails";

function getClientX(evt: MouseLikeEvent): number {
  if ((evt as TouchEvent).touches && (evt as TouchEvent).touches.length > 0) {
    return (evt as TouchEvent).touches[0].clientX;
  }
  if ((evt as TouchEvent).changedTouches && (evt as TouchEvent).changedTouches.length > 0) {
    return (evt as TouchEvent).changedTouches[0].clientX;
  }
  return (evt as MouseEvent).clientX;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatUrlForSheet(urlTemplate: string, sheetIndex: number) {
  // Replace `{index}` token with sheet index
  return urlTemplate.replace("{index}", String(sheetIndex));
}

function plugin(this: VideoJsPlayer, options?: SpriteThumbnailsOptions) {
  const player = this;

  if (!options) return;
  const { url, width, height, columns, rows, interval } = options;

  const framesPerSheet = columns * rows;

  let container: HTMLDivElement | null = null;
  let progressEl: HTMLElement | null = null;
  let seekBarEl: HTMLElement | null = null;

  function ensureElements() {
    // Create container once and attach to progress control.
    if (!player.controlBar || !player.controlBar.progressControl) return false;
    const progressControl = player.controlBar.progressControl;
    progressEl = progressControl.el();

    // video.js: seekBar is child for progress
    const seekBar = (progressControl as any).seekBar;
    if (!seekBar) return false;
    seekBarEl = seekBar.el();

    if (!container) {
      container = document.createElement("div");
      container.className = "vjs-sprite-thumbnails";
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
      progressEl.appendChild(container);
    }
    return true;
  }

  function hide() {
    if (container) container.classList.remove("vjs-sprite-thumbnails--visible");
  }

  function onMove(evt: MouseLikeEvent) {
    if (!ensureElements() || !container || !seekBarEl) return;

    const rect = seekBarEl.getBoundingClientRect();
    const clientX = getClientX(evt);
    const x = clamp(clientX - rect.left, 0, rect.width);
    const ratio = rect.width > 0 ? x / rect.width : 0;

    const duration = player.duration() || 0;
    const time = ratio * duration;

    // Determine which frame indexes to show
    const frameIndex = Math.max(0, Math.floor(time / interval));
    const sheetIndex = Math.floor(frameIndex / framesPerSheet) + 1; // assume sheets start at 1
    const frameInSheet = frameIndex % framesPerSheet;

    const col = frameInSheet % columns;
    const row = Math.floor(frameInSheet / columns);

    // Position and background
    const bgUrl = formatUrlForSheet(url, sheetIndex);
    container.style.backgroundImage = `url('${bgUrl}')`;

    const bgW = columns * width;
    const bgH = rows * height;
    container.style.backgroundSize = `${bgW}px ${bgH}px`;

    const bgX = -(col * width);
    const bgY = -(row * height);
    container.style.backgroundPosition = `${bgX}px ${bgY}px`;

    const left = clamp(x - width / 2, 0, rect.width - width);
    container.style.left = `${left}px`;

    container.classList.add("vjs-sprite-thumbnails--visible");
  }

  function onLeave() {
    hide();
  }

  function bind() {
    if (!ensureElements() || !progressEl) return;

    progressEl.addEventListener("mousemove", onMove as any);
    progressEl.addEventListener("mouseleave", onLeave);
    progressEl.addEventListener("touchstart", onMove as any, { passive: true });
    progressEl.addEventListener("touchmove", onMove as any, { passive: true });
    progressEl.addEventListener("touchend", onLeave);
    progressEl.addEventListener("touchcancel", onLeave);

    player.on("seeked", hide);
    player.on("userinactive", hide);
    player.on("pause", hide);
    player.on("dispose", dispose);
  }

  function dispose() {
    if (progressEl) {
      progressEl.removeEventListener("mousemove", onMove as any);
      progressEl.removeEventListener("mouseleave", onLeave);
      progressEl.removeEventListener("touchstart", onMove as any);
      progressEl.removeEventListener("touchmove", onMove as any);
      progressEl.removeEventListener("touchend", onLeave);
      progressEl.removeEventListener("touchcancel", onLeave);
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
    progressEl = null;
    seekBarEl = null;

    player.off("seeked", hide);
    player.off("userinactive", hide);
    player.off("pause", hide);
    player.off("dispose", dispose);
  }

  if (player.readyState() >= 1) {
    bind();
  } else {
    player.one("ready", bind);
  }
}

// Register as a video.js plugin, supporting both APIs
const register = (vjs: typeof videojs) => {
  if (typeof (vjs as any).registerPlugin === "function") {
    (vjs as any).registerPlugin(PLUGIN_NAME, plugin);
  } else if (typeof (vjs as any).plugin === "function") {
    (vjs as any).plugin(PLUGIN_NAME, plugin);
  }
};

register(videojs);

export default plugin;

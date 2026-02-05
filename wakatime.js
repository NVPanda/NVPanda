import { renderWakatimeCard } from "../src/cards/wakatime-card.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchWakatimeStats } from "../src/fetchers/wakatime-fetcher.js";
import { isLocaleAvailable } from "../src/translations.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const title_color = searchParams.get("title_color");
  const icon_color = searchParams.get("icon_color");
  const hide_border = searchParams.get("hide_border");
  const line_height = searchParams.get("line_height");
  const text_color = searchParams.get("text_color");
  const bg_color = searchParams.get("bg_color");
  const theme = searchParams.get("theme");
  const cache_seconds = searchParams.get("cache_seconds");
  const hide_title = searchParams.get("hide_title");
  const hide_progress = searchParams.get("hide_progress");
  const custom_title = searchParams.get("custom_title");
  const locale = searchParams.get("locale");
  const layout = searchParams.get("layout");
  const langs_count = searchParams.get("langs_count");
  const hide = searchParams.get("hide");
  const api_domain = searchParams.get("api_domain");
  const border_radius = searchParams.get("border_radius");
  const border_color = searchParams.get("border_color");
  const display_format = searchParams.get("display_format");
  const disable_animations = searchParams.get("disable_animations");

  if (locale && !isLocaleAvailable(locale)) {
    return new Response(
      renderError("Something went wrong", "Language not found", {
        title_color,
        text_color,
        bg_color,
        border_color,
        theme,
      }),
      {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
  }

  try {
    const stats = await fetchWakatimeStats({ username, api_domain });

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.CARD_CACHE_SECONDS, 10),
      CONSTANTS.SIX_HOURS,
      CONSTANTS.ONE_DAY,
    );

    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    return new Response(
      renderWakatimeCard(stats, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        hide: parseArray(hide),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        hide_progress,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
        layout,
        langs_count,
        display_format,
        disable_animations: parseBoolean(disable_animations),
      }),
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": `max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
        },
      }
    );
  } catch (err) {
    return new Response(
      renderError(err.message, err.secondaryMessage, {
        title_color,
        text_color,
        bg_color,
        border_color,
        theme,
      }),
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": `max-age=${CONSTANTS.ERROR_CACHE_SECONDS / 2}, s-maxage=${CONSTANTS.ERROR_CACHE_SECONDS}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
        },
      }
    );
  }
}

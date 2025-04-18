export function sendAnalyticsEvent(payload: {
  event: string;
  properties?: Record<string, string | number>;
}) {
  return;
  fetch("https://us.i.posthog.com/capture/", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      distinct_id: "goodread_bots_reloaded",
      ...payload,
    }),
  });
}

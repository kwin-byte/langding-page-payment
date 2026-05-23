export const SESSION_COOKIE = "lp_session";

export function getSessionValue(): string {
  return process.env.SESSION_TOKEN || "lp-dev-session-change-me";
}

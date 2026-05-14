/** Premium.Chat profile / booking entry (opens in new tab from CTAs). */
export function getPremiumChatProfileUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PREMIUM_CHAT_PROFILE_URL?.trim();
  return raw && raw.length > 0 ? raw : "https://premium.chat/majicjackson";
}

/** Premium.Chat sign-up (top-right on the reference card). */
export function getPremiumChatSignupUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PREMIUM_CHAT_SIGNUP_URL?.trim();
  return raw && raw.length > 0 ? raw : "https://premium.chat/user/signup";
}

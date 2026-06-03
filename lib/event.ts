// Shared event facts — used across hero, final CTA, sticky bar & modal
// so social proof, scarcity and pricing stay consistent everywhere.

export const PRICE_PER_SEAT = 35; // SGD commitment fee / guest
export const STORE_CREDIT = 20; // SGD returned as store credit / guest
export const NET_PRICE = PRICE_PER_SEAT - STORE_CREDIT; // ~$15 net

/** Live scarcity for the soonest session (kept in sync with the booking modal). */
export const SEATS_LEFT_NEXT = 6;
export const NEXT_SESSION_LABEL = "this Friday, 2:00 PM";

/** Social proof. */
export const RATING = "4.9";
export const REVIEW_COUNT = 380;
export const GUESTS_HOSTED = "5,200+";

export const RISK_REVERSAL =
  `Fully refundable · $${STORE_CREDIT} back as store credit · ~$${NET_PRICE} net`;

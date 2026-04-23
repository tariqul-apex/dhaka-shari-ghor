export const CURRENCY_SYMBOL = "৳";
export const FREE_SHIPPING_THRESHOLD = 8000;
export const SHIPPING_STANDARD = 800;
export const SHIPPING_EXPRESS = 1800;

export const fmt = (amount: number): string =>
  `${CURRENCY_SYMBOL}${amount.toLocaleString("en-BD")}`;

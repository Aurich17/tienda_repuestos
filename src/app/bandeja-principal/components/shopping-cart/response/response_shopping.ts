export interface PayPalResponse {
  id: string;
  intent: string;
  payer: {
    payment_method: string;
  };
  transactions: {
    amount: {
      total: string;
      currency: string;
    };
    description: string;
  }[];
  links: {
    rel: string;
    href: string;
    method: string;
  }[];
}

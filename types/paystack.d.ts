// types/paystack.d.ts
interface Window {
  PaystackPop: {
    setup: (options: {
      key: string;
      email: string;
      amount: number;
      currency?: string;
      ref?: string;
      onClose?: () => void;
      callback: (response: { reference: string }) => void;
    }) => {
      openIframe: () => void;
    };
  };
}
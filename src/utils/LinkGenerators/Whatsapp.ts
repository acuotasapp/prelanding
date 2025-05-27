import { ILinkGenerator } from "@/utils/LinkGenerator";

export class WhatsappLinkGenerator implements ILinkGenerator {
  BASE_URL: string = 'https://wa.me/+50768800173?text=';

  constructor(private message: string) {
    this.message = encodeURIComponent(message);
  }

  createPaymentLink(): Promise<string> {
    return new Promise((resolve) => {
      const link = `${this.BASE_URL}${this.message}`;
      resolve(link);
    });
  }
}
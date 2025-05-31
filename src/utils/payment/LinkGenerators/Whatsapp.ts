export class WhatsappLinkGenerator {
  BASE_URL: string = 'https://wa.me/+50768800173?text=';

  constructor(private message: string) {
    this.message = encodeURIComponent(message);
  }

  public getIsFallback(): boolean { return true; };

  public createPaymentLink(): Promise<string> {
    return new Promise((resolve) => {
      const link = `${this.BASE_URL}${this.message}`;
      resolve(link);
    });
  }
}
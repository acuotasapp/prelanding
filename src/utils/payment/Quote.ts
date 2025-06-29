import Event from "@/models/Event";
import { WhatsappLinkGenerator } from "./LinkGenerators/Whatsapp";
import { BtnDecorator } from "./BtnDecorator";
import { Buttoneable } from "@/env";

export class Quote implements Buttoneable {
  private url: string;
  private isCreated: boolean;
  private button?: BtnDecorator;

  constructor(
    private whatsapp: WhatsappLinkGenerator,
    private event: Event
  ) {
    this.url = '';
    this.isCreated = false
  }

  public async call(): Promise<void> {
    this.url = await this.whatsapp.createPaymentLink();
    this.isCreated = true
  }

  public async createButton(): Promise<void> {
    if (!this.isCreated) { await this.call(); }

    this.button = new BtnDecorator(
      this.url,
      this.event.getInstallmentAmount(),
      undefined,
      false,
      'quote',
      'quote'
    );
    this.button.call();
  }

  public getButton(): BtnDecorator {
    return this.button as BtnDecorator;
  }
}
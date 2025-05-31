import Event from "@/models/Event";
import Reseller from "@/models/Reseller";

import { BtnDecorator } from "@/utils/payment/BtnDecorator";
import { LinkGenerator } from "@/utils/payment/LinkGenerator";

export class Payment {
  private button?: BtnDecorator;
  private isCreated: boolean = false;
  private url: string = '';
  private isFallback: boolean = false;

  constructor(
    private event: Event,
    private linkGenerator: LinkGenerator,
    private type: string = 'installment',
    private style: string = 'primary',
    private reseller?: Reseller,
  ) { }

  public async call(): Promise<void> {
    if (this.isCreated) return;
    this.url = await this.linkGenerator.createPaymentLink(this.price(), this.buildDescription());
    this.isFallback = this.linkGenerator.getIsFallback();
    this.isCreated = true;
  }

  public async createButton(): Promise<void> {
    if (!this.isCreated) { await this.call(); }

    this.button = new BtnDecorator(
      this.url,
      this.getButtonColor(),
      this.isFallback,
      this.type,
      this.style
    );
    this.button.call();
  }

  public getButton(): BtnDecorator {
    return this.button as BtnDecorator;
  }

  private getButtonColor(): string {
    if (this.reseller) {
      if (this.style === 'primary') {
        return `payment-btn bg-gradient-to-r from-primary-600 to-${this.reseller.getId()}`
      } else {
        return `payment-link text-${this.reseller.getId()}`
      }
    } else {
      if (this.style === 'primary') {
        return 'payment-btn'
      } else {
        return 'payment-link'
      }
    }
  }

  private price(): number {
    if (this.type === 'installment') return this.event.getInstallmentAmount() || 0;

    return this.event.getTotalPrice() || 0;
  }

  private buildDescription(): string {
    if (this.type === 'installment') return `Cuota inicial de la entrada para ${this.event.getTitle()}. #PagaloACuotas`;

    return `Entrada completa para ${this.event.getTitle()}. AcuotasApp`;
  }
}
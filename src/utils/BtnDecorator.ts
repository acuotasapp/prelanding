import { Event } from "@/models/Event";

export class BtnDecorator {
  private buttonText?: string;
  private titleText?: string;


  constructor(private url: string, private isFallback: boolean, private event: Event) {
    this.url = url;
    this.isFallback = isFallback;
    this.event = event;
  }

  public call(): void {
    const callToAction = this.isFallback ? 'Completar por WhatsApp' : 'Resérvalo Acuotas';
    const tooltip = this.isFallback
      ? 'Completa el proceso por WhatsApp'
      : 'Haz clic para continuar tu proceso de pago con Paguelo Facil';
    this.renderBtn(callToAction, tooltip)
  }

  public getUrl(): string {
    return this.url;
  }

  public getButtonText(): string {
    if (!this.buttonText) { this.call(); }

    return this.buttonText as string;
  }

  public getTitleText(): string {
    if (!this.titleText) { this.call(); }

    return this.titleText as string;
  }

  private renderBtn(callToAction: string, tooltip: string) {
    this.buttonText = callToAction
    this.titleText = tooltip
  }
}

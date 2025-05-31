export class BtnDecorator {
  private buttonText?: string;
  private titleText?: string;
  private icon?: string;


  constructor(
    private url: string,
    private btnStyle: string,
    private isFallback: boolean = false,
    private type: string = 'installment',
    private style: string = 'primary'
  ) { }

  public call(): void {
    this.buttonText = this.buildTextButton();
    this.titleText = this.buildTooltip();
    this.icon = this.buildIcon()
  }

  public getUrl(): string {
    return this.url as string;
  }

  public getButtonText(): string {
    if (!this.buttonText) { this.call(); }

    return this.buttonText as string;
  }

  public getTitleText(): string {
    if (!this.titleText) { this.call(); }

    return this.titleText as string;
  }

  public getIcon(): string {
    if (!this.icon) { this.call(); }

    return this.icon as string;
  }

  public getBtnStyle(): string {
    return this.btnStyle;
  }

  private buildTextButton(): string {
    if (this.isFallback) return 'Completar por WhatsApp';
    if (this.style === 'primary' && this.type === 'installment') return 'Resérvalo Acuotas'
    if (this.style === 'primary' && this.type === 'total') return 'Cómpralo completo'
    if (this.style === 'secondary' && this.type === 'installment') return 'o resérvalo Acuotas'
    return 'o cómpralo completo'
  }

  private buildTooltip(): string {
    if (this.isFallback) {
      if (this.type === 'installment') return 'Completa el proceso por WhatsApp';

      return 'Realiza la compra por Whatsapp';
    }
    if (this.type === 'installment') return 'Haz clic para reservarlo con Acuotas';
    return 'Haz clic para comprarlo completo';
  }

  private buildIcon(): string {
    if (this.isFallback) return 'whatsapp';
    if (this.type === 'installment') return 'iso-blanco';
    return 'cart';
  }
} 

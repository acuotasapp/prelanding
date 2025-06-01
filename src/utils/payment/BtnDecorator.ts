export class BtnDecorator {
  private buttonText?: string;
  private titleText?: string;
  private icon?: string;
  private buttonStyle?: string;

  constructor(
    private url: string,
    private price: number,
    private resellerName?: string,
    private isFallback: boolean = false,
    private type: string = 'installment',
    private style: string = 'primary',
  ) { }

  public call(): void {
    this.titleText = this.buildTooltip();
    this.icon = this.buildIcon()
  }

  public getUrl(): string {
    return this.url as string;
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
    if (this.buttonStyle) return this.buttonStyle;

    if (this.resellerName) {
      if (this.style === 'primary') {
        this.buttonStyle = `payment-btn bg-${this.resellerName} text-${this.resellerName}-neutral hover:bg-primary-700 hover:text-white`;
      } else {
        this.buttonStyle = `payment-link text-${this.resellerName}-secondary hover:text-primary-700`;
      }
    } else {
      if (this.style === 'primary') {
        this.buttonStyle = `payment-btn bg-primary-600 text-white hover:bg-primary-700 hover:text-white`;
      } else {
        this.buttonStyle = `payment-link text-primary-600 hover:text-primary-700`;
      }
    }
    return this.buttonStyle;
  }

  public getButtonText(type?: 'installment' | 'total'): string {
    if (this.buttonText) { return this.buttonText; }
    if (type) { this.type = type; }
    this.call();
    if (this.isFallback) return 'Completar por WhatsApp';
    if (this.style === 'primary' && this.type === 'installment') return `Resérvalo por $${this.price.toFixed(2)}`
    if (this.style === 'primary' && this.type === 'total') return 'Cómpralo completo'
    if (this.style === 'secondary' && this.type === 'installment') return `o resérvalo por $${this.price.toFixed(2)}`
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

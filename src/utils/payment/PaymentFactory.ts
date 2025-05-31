import Event from "@/models/Event";
import Reseller from "@/models/Reseller";

import HexEncoder from "@/utils/HexEncoder";
import UnicodeNormalizer from "@/utils/UnicodeNormalizer";
import { LinkGenerator } from "@/utils/payment/LinkGenerator";
import { IPagueloFacilOptions, PagueloFacilLinkGenerator } from "@/utils/payment/LinkGenerators/PagueloFacil";
import { WhatsappLinkGenerator } from "@/utils/payment/LinkGenerators/Whatsapp";
import { Payment } from "@/utils/payment/Payment";

export class PaymentFactory {
  constructor(
    private event: Event,
    private style: string,
    private reseller?: Reseller,
  ) { }

  public createPayment(): Payment {
    const pagueloFacilOptions: IPagueloFacilOptions = this.buildPagueloFacilOptions();
    const pagueloFacil: PagueloFacilLinkGenerator = this.buildPagueloFacilLinkGenerator(pagueloFacilOptions);
    const whatsapp: WhatsappLinkGenerator = this.buildWhatsappLinkGenerator();
    const paymentLinkGenerator: LinkGenerator = this.buildPaymentLinkGenerator(pagueloFacil, whatsapp);
    return new Payment(this.event, paymentLinkGenerator, this.buildType(), this.style, this.reseller)
  }

  private buildPagueloFacilOptions(): IPagueloFacilOptions {
    return {
      cclw: 'E7D8F1DF90910945B0AEA09FE6FD80E906939C2C3A5427DE6D7ACADD01D8444786F354BA8AE94672DA0D4918526D3014AC561044B9116784BE2235B092451F8A',
      eventId: this.event.getId() as string,
      resellerId: this.reseller?.getId() as string,
      returnUrl: 'https://acuotas.app/thanks'
    };
  }

  private buildPagueloFacilLinkGenerator(options: IPagueloFacilOptions): PagueloFacilLinkGenerator {

    return new PagueloFacilLinkGenerator(options, new HexEncoder());
  }

  private buildWhatsappLinkGenerator(): WhatsappLinkGenerator {
    return new WhatsappLinkGenerator(`Hola, quiero completar el proceso de pago del evento ${this.event.getTitle()}.`);
  }

  private buildPaymentLinkGenerator(pagueloFacil: PagueloFacilLinkGenerator, whatsapp: WhatsappLinkGenerator): LinkGenerator {
    return new LinkGenerator(pagueloFacil, whatsapp, new UnicodeNormalizer());
  }

  private buildType(): string {
    if (this.reseller) {
      return this.style === 'primary' ? this.reseller.getPrimaryAction() : this.reseller.getSecondaryAction();
    } else {
      return this.style === 'primary' ? 'installment' : 'total';
    }
  }
}
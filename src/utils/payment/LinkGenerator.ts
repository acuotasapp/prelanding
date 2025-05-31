import { PagueloFacilError, PagueloFacilLinkGenerator } from "@/utils/payment/LinkGenerators/PagueloFacil";
import UnicodeNormalizer from "../UnicodeNormalizer";
import { WhatsappLinkGenerator } from "./LinkGenerators/Whatsapp";

export class LinkGenerator {
  private isFallback: boolean = false;

  constructor(
    private pagueloFacil: PagueloFacilLinkGenerator,
    private whatsapp: WhatsappLinkGenerator,
    private normalizer: UnicodeNormalizer
  ) { }

  public async createPaymentLink(amount: number, description: string, tax: number = 0): Promise<string> {
    let url: string;
    try {
      this.pagueloFacil.setAmount(amount);
      this.pagueloFacil.setTax(tax);
      this.pagueloFacil.setDescription(this.normalizer.normalize(description));
      url = await this.pagueloFacil.createPaymentLink();
    } catch (error) {
      if (error instanceof PagueloFacilError) {
        this.isFallback = true;
        url = await this.whatsapp.createPaymentLink();
      } else {
        throw error;
      }
    }
    return url;
  }

  public getIsFallback(): boolean {
    return this.isFallback;
  }
}
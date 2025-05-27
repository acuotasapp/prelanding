import { Event } from "@/models/Event";
import { IPagueloFacilLinkGenerator, PagueloFacilError } from "./LinkGenerators/PagueloFacil";
import UnicodeNormalizer from "./UnicodeNormalizer";

export interface ILinkGenerator {
  createPaymentLink: () => Promise<string>;
}

export class LinkGenerator implements ILinkGenerator {
  private isFallback: boolean = false;

  constructor(
    private pagueloFacil: IPagueloFacilLinkGenerator,
    private whatsapp: ILinkGenerator,
    private event: Event,
    private normalizer: UnicodeNormalizer
  ) { }

  public async createPaymentLink(): Promise<string> {
    let url: string;
    try {
      this.pagueloFacil.setAmount(this.event.getInstallmentAmount());
      this.pagueloFacil.setTax(this.event.installmentTax());
      this.pagueloFacil.setDescription(this.normalizer.normalize(`Primera cuota de la entrada para ${this.event.getTitle()}. #PagaloACuotas`));
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
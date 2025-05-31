import HexEncoder from "@/utils/HexEncoder";

export class PagueloFacilError extends Error { };

export type IPagueloFacilOptions = {
  cclw: string;
  eventId: string;
  returnUrl: string;
  resellerId?: string;
}

type PagueloFacilCustomField = {
  id: string, nameOrLabel: string, type: string, value: string
}

type PagueloFacilParams = Record<string, string>;

export class PagueloFacilLinkGenerator {
  private URL: string = 'https://secure.paguelofacil.com/LinkDeamon.cfm';
  private RETRY_DELAY_MS: number = 1000; // 1 second
  private RETRY_COUNT: number = 3
  private cclw: string;
  private eventId: string;
  private resellerId: string;
  private returnUrl: string;
  private amount?: number;
  private tax?: number;
  private description?: string;
  private params: PagueloFacilParams;

  constructor({ cclw, eventId, returnUrl, resellerId = 'internal' }: IPagueloFacilOptions, private hexEncoder: HexEncoder) {
    this.cclw = cclw;
    this.eventId = eventId;
    this.returnUrl = returnUrl;
    this.resellerId = resellerId;
    this.params = { eventId, resellerId };
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public addParam(key: string, value: string): void {
    this.params[key] = value;
  }

  public async createPaymentLink() {
    for (let i = 0; i < this.RETRY_COUNT; i++) {
      try {
        const paymentLink = await this.fetchPaymentLink();
        if (paymentLink) return paymentLink;
      } catch { }
      await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY_MS));
    }
    throw new PagueloFacilError(`Failed to fetch payment link from Paguelo Facil.`);
  }

  public getIsFallback(): boolean {
    return false; // PagueloFacil is not a fallback
  }

  private async fetchPaymentLink(): Promise<string> {
    const response = await fetch(this.URL, {
      method: 'POST',
      headers: this.requestHeader(),
      body: new URLSearchParams(this.requestBody() as any).toString(),
    });

    const { data } = await response.json();

    return data?.url;
  }

  private requestBody(): Record<string, string | number | undefined> {
    return {
      CCLW: this.cclw,
      CMTN: this.amount,
      CTAX: this.tax,
      CDSC: this.description,
      PF_CF: this.customFields(),
      RETURN_URL: this.convertToHex(this.returnUrl),
      ...this.params,
    };
  }

  private customFields(): string {
    const customFields: PagueloFacilCustomField[] = [
      { id: 'CF-01', nameOrLabel: 'EventID', type: 'hidden', value: this.eventId },
      { id: 'CF-02', nameOrLabel: 'VendorID', type: 'hidden', value: this.resellerId }
    ];
    const customFieldsString = JSON.stringify(customFields);

    return this.convertToHex(customFieldsString)
  }

  private requestHeader(): Record<string, string> {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
  }

  private convertToHex(input: string): string {
    return this.hexEncoder.encode(input);
  }
}


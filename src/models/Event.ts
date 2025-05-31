export default class Event {
  id: string;
  image: {
    blob: string;
    alt: string
  };
  title: string;
  description: string;
  producer: string;
  dates: string;
  price: number;
  commission: number;
  installments: number;
  installmentAmount: number;
  available: boolean;
  termsAndConditions: string;

  constructor(
    id: string,
    image: {
      blob: string;
      alt: string
    },
    title: string,
    description: string,
    producer: string,
    dates: string,
    price: number,
    commission: number,
    installments: number,
    installmentAmount: number,
    available: boolean,
    termsAndConditions: string
  ) {
    this.id = id
    this.image = image
    this.title = title
    this.description = description
    this.producer = producer
    this.dates = dates
    this.price = price
    this.commission = commission
    this.installments = installments
    this.installmentAmount = installmentAmount
    this.available = available
    this.termsAndConditions = termsAndConditions
  }

  static fromCollectionEntry(record: {
    id: string;
    image: {
      blob: string;
      alt: string
    };
    title: string;
    description: string;
    producer: string;
    dates: string;
    price: number;
    commission: number;
    installments: number;
    installmentAmount: number;
    available: boolean;
    termsAndConditions: string;
  }): Event {

    return new Event(
      record.id,
      {
        blob: record.image.blob,
        alt: record.image.alt
      },
      record.title,
      record.description,
      record.producer,
      record.dates,
      record.price,
      record.commission,
      record.installments,
      record.installmentAmount,
      record.available,
      record.termsAndConditions
    )
  }

  public getId(): string {
    return this.id;
  }

  public getImage(): { blob: string; alt: string } {
    return this.image;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getProducer(): string {
    return this.producer;
  }
  public getDates(): string {
    return this.dates;
  }
  public getPrice(): number {
    return this.price;
  }
  public getCommission(): number {
    return this.commission;
  }
  public getInstallments(): number {
    return this.installments;
  }
  public getInstallmentAmount(): number {
    return this.installmentAmount;
  }
  public isAvailable(): boolean {
    return this.available;
  }
  public getTermsAndConditions(): string {
    return this.termsAndConditions;
  }

  public installmentTax(): number {
    const tax = this.installmentAmount / 1.07 - this.installmentAmount;

    return Math.ceil(tax * 100) / 100;
  }

  public getTotalPrice(): number {
    return this.price + this.commission;
  }

  public totalTax(): number {
    const total = this.price + this.commission
    const tax = total / 1.07;
    return Math.ceil(tax * 100) / 100;

  }
}
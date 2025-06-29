type EventImage = {
  blob: any;
  alt: string
}

export default class Event {
  constructor(
    private id: string,
    private image: EventImage,
    private title: string,
    private description: string,
    private producer: string,
    private dates: string,
    private location: string,
    private price: number,
    private commission: number,
    private installments: number,
    private installmentAmount: number,
    private available: boolean,
    private termsAndConditions: string,
    private order: number
  ) { }

  static fromPrimitive(primitive: {
    id: string;
    image: {
      blob: string;
      alt: string
    };
    title: string;
    description: string;
    producer: string;
    dates: string;
    location: string;
    price: number;
    commission: number;
    installments: number;
    installmentAmount: number;
    available: boolean;
    termsAndConditions: string;
    order: number;
  }) {
    return new Event(
      primitive.id,
      {
        blob: primitive.image.blob,
        alt: primitive.image.alt
      },
      primitive.title,
      primitive.description,
      primitive.producer,
      primitive.dates,
      primitive.location,
      primitive.price,
      primitive.commission,
      primitive.installments,
      primitive.installmentAmount,
      primitive.available,
      primitive.termsAndConditions,
      primitive.order
    )
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
    location: string;
    price: number;
    commission: number;
    installments: number;
    installmentAmount: number;
    available: boolean;
    termsAndConditions: string;
    order: number;
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
      record.location,
      record.price,
      record.commission,
      record.installments,
      record.installmentAmount,
      record.available,
      record.termsAndConditions,
      record.order
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
  public getLocation(): string {
    return this.location
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

  public getOrder(): number {
    return this.order
  }
}
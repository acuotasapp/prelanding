import type { AstroReference, HeadInfo, ImageType } from '@/env.d.ts'

export default class Reseller {
  constructor(
    private id: string,
    private image: ImageType,
    private name: string,
    private color: string,
    private available: boolean,
    private events: AstroReference[],
    private primaryAction: string,
    private openGraphImage: ImageType,
  ) { }

  static fromPrimitive(primitive: {
    id: string;
    image: ImageType;
    name: string;
    color: string;
    available: boolean;
    events: AstroReference[];
    primaryAction: string;
    openGraphImage: ImageType;
  }): Reseller {
    return new Reseller(
      primitive.id,
      primitive.image,
      primitive.name,
      primitive.color,
      primitive.available,
      primitive.events,
      primitive.primaryAction,
      primitive.openGraphImage
    )
  }

  static fromCollectionEntry(record: {
    id: string;
    image: ImageType;
    name: string;
    color: string;
    available: boolean;
    events: AstroReference[];
    primaryAction: string;
    openGraphImage: ImageType;
  }): Reseller {
    return new Reseller(
      record.id,
      record.image,
      record.name,
      record.color,
      record.available,
      record.events,
      record.primaryAction,
      record.openGraphImage
    )
  }

  public getId(): string {
    return this.id;
  }
  public getImage(): ImageType {
    return this.image;
  }
  public getName(): string {
    return this.name;
  }
  public getColor(): string {
    return this.color;
  }
  public getEvents(): AstroReference[] {
    return this.events;
  }
  public isAvailable(): boolean {
    return this.available;
  }
  public getPrimaryAction(): string {
    return this.primaryAction;
  }
  public getSecondaryAction(): string {
    return this.primaryAction === 'installment' ? 'full' : 'installment';
  }

  public getOpenGraphImage(): ImageType {
    return this.openGraphImage;
  }

  public getHeadInfo(): HeadInfo {
    return {
      url: `https://acuotas.app/${this.getId()}`,
      title: `${this.getName()} x Acuotas`,
      description: `Con ${this.getName()} en alianza con Acuotas reserva lo que se te dé la gana y #PágaloACuotas, sin líos ni estrés.`,
      imageUrl: `https://acuotas.app${this.getOpenGraphImage().blob.src}`
    }

  }
}

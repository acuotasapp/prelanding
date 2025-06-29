import type { AstroReference } from '@/env.d.ts'

export default class Reseller {
  constructor(
    private id: string,
    private image: {
      blob: string;
      alt: string
    },
    private name: string,
    private color: string,
    private available: boolean,
    private events: AstroReference[],
    private primaryAction: string
  ) { }

  static fromPrimitive(primitive: {
    id: string;
    image: {
      blob: string;
      alt: string
    };
    name: string;
    color: string;
    available: boolean;
    events: AstroReference[];
    primaryAction: string;
  }): Reseller {
    return new Reseller(
      primitive.id,
      primitive.image,
      primitive.name,
      primitive.color,
      primitive.available,
      primitive.events,
      primitive.primaryAction
    )
  }

  static fromCollectionEntry(record: {
    id: string;
    image: {
      blob: string;
      alt: string
    };
    name: string;
    color: string;
    available: boolean;
    events: AstroReference[];
    primaryAction: string;
  }): Reseller {
    return new Reseller(
      record.id,
      record.image,
      record.name,
      record.color,
      record.available,
      record.events,
      record.primaryAction
    )
  }

  public getId(): string {
    return this.id;
  }
  public getImage(): { blob: string; alt: string } {
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
}
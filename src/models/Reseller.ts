import Event from "@/models/Event";

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
    private events: Event[],
    private primaryAction: string
  ) { }

  static fromCollectionEntry(record: {
    id: string;
    image: {
      blob: string;
      alt: string
    };
    name: string;
    color: string;
    available: boolean;
    events: Event[];
    primaryAction: string;
  }): Reseller {

    return new Reseller(
      record.id,
      {
        blob: record.image.blob,
        alt: record.image.alt
      },
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
  public getEvents(): Event[] {
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
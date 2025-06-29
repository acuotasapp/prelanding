import Event from '@/models/Event';
import type { CollectionEntry } from 'astro:content';
import { getCollection, getEntry, getEntries } from 'astro:content';
import type { AstroReference } from '@/env';

export class EventRepository {
  async getCollection(filterFn?: (event: any) => any, sortFn?: (a: any, b: any) => any): Promise<Event[]> {
    const events: Event[] = [];
    let collection: CollectionEntry<'event'> = [];
    if (filterFn !== undefined) {
      collection = await getCollection('event', filterFn)
    } else {
      collection = await getCollection('event')
    };

    if (sortFn !== undefined) { collection = collection.sort(sortFn) }

    collection.forEach(({ data }: CollectionEntry<'event'>): void => {
      events.push(Event.fromCollectionEntry(data))
    });
    return events
  }

  async getEntry(id: string): Promise<Event> {
    return Event.fromCollectionEntry(await getEntry('event', id))
  }

  async getEntries(references: AstroReference[]): Promise<Event[]> {
    const events: Event[] = [];

    const entries: CollectionEntry<'event'>[] = await getEntries(references);

    entries.forEach(({ data }: CollectionEntry<'event'>): void => {
      events.push(Event.fromCollectionEntry(data))
    });
    return events;
  }
}
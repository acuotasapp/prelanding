import Reseller from '@/models/Reseller';
import type { CollectionEntry } from 'astro:content';
import { getCollection, getEntry, getEntries } from 'astro:content';
import type { AstroReference, StaticPath } from '@/env'

export class ResellerRepository {
  static async getStaticPaths(): Promise<StaticPath[]> {
    const repository = new ResellerRepository()
    const filterAvaliableVendors = (reseller: CollectionEntry<'reseller'>) => {
      return reseller.data.available;
    };

    const collection: Reseller[] = await repository.getCollection(filterAvaliableVendors)
    const ids: string[] = collection.map((reseller: Reseller): string => reseller.getId())
    return ids.map((id: string): StaticPath => ({ params: { slug: id } }));
  }

  async getCollection(filterFn?: (reseller: any) => any, sortFn?: (a: any, b: any) => any): Promise<Reseller[]> {
    const events: Reseller[] = [];
    let collection: CollectionEntry<'reseller'> = [];
    if (filterFn !== undefined) {
      collection = await getCollection('reseller', filterFn)
    } else {
      collection = await getCollection('reseller')
    };

    if (sortFn !== undefined) { collection = collection.sort(sortFn) }

    collection.forEach(({ data }: CollectionEntry<'reseller'>): void => {
      events.push(Reseller.fromCollectionEntry(data))
    });
    return events
  }

  async getEntry(id: string): Promise<Reseller> {
    const { data } = await getEntry('reseller', id);
    return Reseller.fromCollectionEntry(data)
  }

  async getEntries(references: AstroReference[]): Promise<Reseller[]> {
    const events: Reseller[] = [];
    const entries: CollectionEntry<'reseller'>[] = await getEntries(references);

    entries.forEach(({ data }: CollectionEntry<'reseller'>): void => {
      events.push(Reseller.fromCollectionEntry(data))
    });
    return events;
  }
}

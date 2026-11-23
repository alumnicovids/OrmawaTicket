import { EventRepository } from '../../domain/repositories/EventRepository';
import { eventData } from '../sources/events';
import { eventCategoryData } from '../sources/eventCategories';

export class EventRepositoryImpl extends EventRepository {
  // Salinan dalam memori supaya stok bisa berkurang tanpa mengubah data seed.
  constructor(seed = eventData) {
    super();
    this.events = structuredClone(seed);
  }

  async getAll() { return this.events; }

  async getCategories() { return eventCategoryData; }

  async getById(id) { return this.events.find((e) => e.id === id) ?? null; }

  async reduceStock(eventId, categoryId, quantity) {
    const category = (await this.getById(eventId))?.categories.find((c) => c.id === categoryId);
    if (!category || category.stock < quantity) throw new Error('Stok tiket tidak cukup');
    category.stock -= quantity;
  }
}

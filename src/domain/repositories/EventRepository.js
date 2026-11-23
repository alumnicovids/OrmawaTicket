// Kontrak: implementasi ada di data/repositories.
export class EventRepository {
  async getAll() { throw new Error('not implemented'); }
  async getById(id) { throw new Error('not implemented'); }
  // Kurangi stok kategori; lempar error jika tidak cukup.
  async reduceStock(eventId, categoryId, quantity) { throw new Error('not implemented'); }
}

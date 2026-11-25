export class PurchaseTicket {
  constructor(eventRepository, ticketRepository) {
    this.eventRepository = eventRepository;
    this.ticketRepository = ticketRepository;
  }

  async execute({ eventId, categoryId, quantity }) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Jumlah tiket harus bilangan bulat lebih dari 0');
    }
    const event = await this.eventRepository.getById(eventId);
    if (!event) throw new Error('Event tidak ditemukan');
    const category = event.categories.find((c) => c.id === categoryId);
    if (!category) throw new Error('Kategori tiket tidak ditemukan');
    if (category.stock < quantity) throw new Error('Stok tiket tidak cukup');

    await this.eventRepository.reduceStock(eventId, categoryId, quantity);
    return this.ticketRepository.add({
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      eventId,
      categoryId,
      categoryName: category.name,
      quantity,
      totalPrice: category.price * quantity,
      purchasedAt: new Date().toISOString(),
    });
  }
}

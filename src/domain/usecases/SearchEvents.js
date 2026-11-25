// Tanpa filter, mengembalikan semua event; yang paling dekat tanggalnya di depan.
export class SearchEvents {
  constructor(eventRepository) { this.eventRepository = eventRepository; }

  async execute({ query = '', ormawaId = null, category = null } = {}) {
    const q = query.trim().toLowerCase();
    const events = await this.eventRepository.getAll();
    return [...events]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .filter(
        (e) => (!ormawaId || e.ormawaId === ormawaId) && (!category || e.category === category) && (!q || e.title.toLowerCase().includes(q)),
      );
  }
}

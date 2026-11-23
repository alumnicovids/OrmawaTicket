// Tanpa filter, mengembalikan semua event.
export class SearchEvents {
  constructor(eventRepository) { this.eventRepository = eventRepository; }

  async execute({ query = '', ormawaId = null, category = null } = {}) {
    const q = query.trim().toLowerCase();
    const events = await this.eventRepository.getAll();
    return events.filter(
      (e) => (!ormawaId || e.ormawaId === ormawaId) && (!category || e.category === category) && (!q || e.title.toLowerCase().includes(q)),
    );
  }
}

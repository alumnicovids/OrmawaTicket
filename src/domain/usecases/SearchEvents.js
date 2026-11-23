// Tanpa filter, mengembalikan semua event.
export class SearchEvents {
  constructor(eventRepository) { this.eventRepository = eventRepository; }

  async execute({ query = '', ormawaId = null } = {}) {
    const q = query.trim().toLowerCase();
    const events = await this.eventRepository.getAll();
    return events.filter(
      (e) => (!ormawaId || e.ormawaId === ormawaId) && (!q || e.title.toLowerCase().includes(q)),
    );
  }
}

import { TicketRepository } from '../../domain/repositories/TicketRepository';

// shortcut: tiket hilang saat app restart, ganti ke AsyncStorage/API saat butuh persistensi.
export class TicketRepositoryImpl extends TicketRepository {
  constructor() {
    super();
    this.tickets = [];
  }

  async add(ticket) {
    const saved = { ...ticket, id: `TKT-${String(this.tickets.length + 1).padStart(4, '0')}` };
    this.tickets.push(saved);
    return saved;
  }

  async getAll() { return [...this.tickets].reverse(); }

  async getById(id) { return this.tickets.find((t) => t.id === id) ?? null; }
}

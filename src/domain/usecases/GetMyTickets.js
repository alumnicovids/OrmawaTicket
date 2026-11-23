export class GetMyTickets {
  constructor(ticketRepository) { this.ticketRepository = ticketRepository; }
  execute() { return this.ticketRepository.getAll(); }
}

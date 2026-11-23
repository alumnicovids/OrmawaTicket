export class GetTicketById {
  constructor(ticketRepository) { this.ticketRepository = ticketRepository; }
  execute(id) { return this.ticketRepository.getById(id); }
}

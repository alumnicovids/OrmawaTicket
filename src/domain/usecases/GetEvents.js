export class GetEvents {
  constructor(eventRepository) { this.eventRepository = eventRepository; }
  execute() { return this.eventRepository.getAll(); }
}

export class GetEventById {
  constructor(eventRepository) { this.eventRepository = eventRepository; }
  execute(id) { return this.eventRepository.getById(id); }
}

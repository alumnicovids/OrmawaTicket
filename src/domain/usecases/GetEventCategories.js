export class GetEventCategories {
  constructor(eventRepository) { this.eventRepository = eventRepository; }
  execute() { return this.eventRepository.getCategories(); }
}

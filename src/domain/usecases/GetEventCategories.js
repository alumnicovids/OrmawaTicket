// Urut abjad A-Z menurut nama.
export class GetEventCategories {
  constructor(eventRepository) { this.eventRepository = eventRepository; }

  async execute() {
    const categories = await this.eventRepository.getCategories();
    return [...categories].sort((a, b) => a.name.localeCompare(b.name, 'id'));
  }
}

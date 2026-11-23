export class GetOrmawaList {
  constructor(ormawaRepository) { this.ormawaRepository = ormawaRepository; }
  execute() { return this.ormawaRepository.getAll(); }
}

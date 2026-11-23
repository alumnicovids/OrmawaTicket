import { OrmawaRepository } from '../../domain/repositories/OrmawaRepository';
import { ormawaData } from '../sources/ormawa';

export class OrmawaRepositoryImpl extends OrmawaRepository {
  async getAll() { return ormawaData; }
}

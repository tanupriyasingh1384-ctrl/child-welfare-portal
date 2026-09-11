import { Child } from '@prisma/client';
import { IChildRepository, CreateChildDTO, ChildFilterDTO } from '../repositories/IChildRepository';
import { AppError } from '../middleware/errorHandler';

export class ChildService {
  constructor(private childRepo: IChildRepository) {}

  async registerChild(data: CreateChildDTO): Promise<Child> {
    if (!data.fullName || !data.villageOrCity || !data.district || !data.state) {
      throw new AppError('fullName, villageOrCity, district, and state are required.', 400);
    }

    return this.childRepo.create(data);
  }

  async getChildren(filter?: ChildFilterDTO): Promise<Child[]> {
    return this.childRepo.findAll(filter);
  }

  async getChildById(id: string): Promise<Child> {
    const child = await this.childRepo.findById(id);
    if (!child) {
      throw new AppError(`Child profile with ID '${id}' not found.`, 404);
    }
    return child;
  }
}

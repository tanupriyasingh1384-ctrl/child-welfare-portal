import { Child } from '@prisma/client';

export interface CreateChildDTO {
  fullName: string;
  ageYears?: number;
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  villageOrCity: string;
  district: string;
  state: string;
  schoolOrCenterId?: string;
}

export interface ChildFilterDTO {
  district?: string;
  villageOrCity?: string;
  schoolOrCenterId?: string;
}

export interface IChildRepository {
  create(data: CreateChildDTO): Promise<Child>;
  findAll(filter?: ChildFilterDTO): Promise<Child[]>;
  findById(id: string): Promise<Child | null>;
}

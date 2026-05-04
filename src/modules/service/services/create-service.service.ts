import { type Service } from "../../../prisma/client";
import { ServiceRepository } from "../repositories/ServiceRepository";

interface CreateServiceRequest {
  value: number;
  description: string;
  date?: string;
  createdById: string;
}

export class CreateServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(data: CreateServiceRequest): Promise<Service> {
    return this.serviceRepository.create({
      value: data.value,
      description: data.description,
      date: data.date,
      createdById: data.createdById,
    });
  }
}

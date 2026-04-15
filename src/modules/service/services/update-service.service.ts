import { type Service } from "../../../prisma/client";
import { ServiceRepository } from "../repositories/ServiceRepository";

interface UpdateServiceRequest {
  id: string;
  value?: number;
  description?: string;
  updatedById?: string;
}

export class UpdateServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(data: UpdateServiceRequest): Promise<Service> {
    return this.serviceRepository.update(data.id, {
      value: data.value,
      description: data.description,
      updatedById: data.updatedById,
    });
  }
}

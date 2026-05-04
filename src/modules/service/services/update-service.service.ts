import { type Service } from "../../../prisma/client";
import { ServiceRepository } from "../repositories/ServiceRepository";

interface UpdateServiceRequest {
  id: string;
  value?: number;
  description?: string;
  date?: string;
  updatedById: string;
}

export class UpdateServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(data: UpdateServiceRequest): Promise<Service> {
    const service = await this.serviceRepository.findById(data.id);

    if (!service) {
      throw new Error("Service not found");
    }

    return this.serviceRepository.update(data.id, {
      value: data.value,
      description: data.description,
      date: data.date,
      updatedById: data.updatedById,
    });
  }
}

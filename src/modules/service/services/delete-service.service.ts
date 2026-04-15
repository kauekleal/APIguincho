import { ServiceRepository } from "../repositories/ServiceRepository";

export class DeleteServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}

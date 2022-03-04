import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {

  constructor(private db: PrismaService) { }

  async create(data: CreateAddressDto) {

    data.person_id = Number(data.person_id);

    return this.db.address.create({
      data,
    });
  }


}

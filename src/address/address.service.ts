import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {

  constructor(private db: PrismaService, private login: LoginService) { }

  async findAll() {

    return this.db.address.findMany();
  }

  async findOne(id: number) {

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException("ID is invalid.");
    }

    return this.db.address.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user_id: number, data: CreateAddressDto) {

    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("User not found.");
    }

    console.log(person_id)

    return this.db.address.create({
      data: {
        person_id,
        ...data,
      },
    });
  }


}

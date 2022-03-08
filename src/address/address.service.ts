import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidId } from 'utils/checkId';
import { checkNumber } from 'utils/checkNumber';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

  constructor(private db: PrismaService, private login: LoginService) { }

  async isValidPerson(id: number, person_id: number) {

    person_id = checkNumber(person_id);

    const address = await this.findOne(checkNumber(id));

    if (address.person_id !== person_id) {

      throw new BadRequestException("Operação inválida.");

    }

    return true;
  }

  async findAll() {

    return this.db.address.findMany();
  }

  async findOne(id: number) {

    return this.db.address.findUnique({
      where: {
        id: isValidId(id),
      },
    });
  }

  async create(user_id: number, data: CreateAddressDto) {

    const person_id = await this.login.getPersonId(user_id);

    if (isNaN(person_id)) {
      throw new NotFoundException("User not found.");
    }

    return this.db.address.create({
      data: {
        person_id,
        ...data,
      },
    });
  }

  async update(id: number, user_id: number, dataUpdate: UpdateAddressDto) {

    const person_id = await this.login.getPersonId(user_id);

    await this.isValidPerson(id, person_id);

    return this.db.address.update({
      where: {
        id,
      },
      data: dataUpdate,
    });
  }

  async delete(id: number, user_id: number) {

    const person_id = await this.login.getPersonId(user_id);

    await this.isValidPerson(id, person_id);

    return this.db.address.delete({
      where: {
        id,
      },
    });
  }
}

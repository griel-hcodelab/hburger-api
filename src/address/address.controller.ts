import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Login } from 'src/login/login.decorator';
import { LoginGuard } from 'src/login/login.guard';
import { checkNumber } from 'utils/checkNumber';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(LoginGuard)
  @Get()
  async listAll() {
    return this.addressService.findAll();
  }

  @UseGuards(LoginGuard)
  @Get('my-addresses')
  async listByPerson(@Login('id') user_id) {
    return this.addressService.findByPerson(user_id);
  }

  @UseGuards(LoginGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Login('id', ParseIntPipe) user_id: number,
  ) {
    return this.addressService.findMyAddress(id, user_id);
  }

  @UseGuards(LoginGuard)
  @Post()
  async createAddress(
    @Body() data: CreateAddressDto,
    @Login('id', ParseIntPipe) user_id: number,
  ) {
    return this.addressService.create(user_id, data);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  async updateAdress(
    @Body() data: UpdateAddressDto,
    @Param('id', ParseIntPipe) id: number,
    @Login('id', ParseIntPipe) user_id: number,
  ) {
    return this.addressService.update(id, user_id, data);
  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  async deleteAddress(
    @Param('id', ParseIntPipe) id: number,
    @Login('id', ParseIntPipe) user_id: number,
  ) {
    return this.addressService.delete(id, user_id);
  }

  @Get('cep/:cep')
  async getZipcode(@Param('cep') cep: string) {
    checkNumber(cep);
    return this.addressService.getZipcode(cep);
  }
}

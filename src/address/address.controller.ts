import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { Login } from 'src/login/login.decorator';
import { LoginGuard } from 'src/login/login.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller("addresses")
export class AddressController {

  constructor(private addressService: AddressService) { }

  @UseGuards(LoginGuard)
  @Get()
  async listAll() {
    return this.addressService.findAll()
  }

  @UseGuards(LoginGuard)
  @Get('my-addresses')
  async listByPerson(
    @Login('id') login,
  ) {

    return this.addressService.findByPerson(login);

  }

  @UseGuards(LoginGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {

    return this.addressService.findOne(id);

  }

  @UseGuards(LoginGuard)
  @Post()
  async createAddress(
    @Body() data: CreateAddressDto,
    @Login('id') login,
  ) {

    return this.addressService.create(login, data);

  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  async updateAdress(
    @Body() data: UpdateAddressDto,
    @Param('id', ParseIntPipe) id: number,
    @Login('id') login,
  ) {

    return this.addressService.update(id, login, data);

  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  async deleteAddress(
    @Param('id', ParseIntPipe) id: number,
    @Login('id') login,
  ) {

    return this.addressService.delete(id, login);
  }
}

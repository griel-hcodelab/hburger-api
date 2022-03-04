import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Login } from 'src/login/login.decorator';
import { LoginGuard } from 'src/login/login.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller("addresses")
export class AddressController {

  constructor(private addressService: AddressService) { }

  @UseGuards(LoginGuard)
  @Post()
  async createAddress(
    @Body() data: CreateAddressDto,
    @Login() login,
  ) {

    return this.addressService.create(data);

  }


}

import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller("addresses")
export class AddressController {

  constructor(private addressService: AddressService) { }

  @Post()
  async createAddress(
    @Body() data: CreateAddressDto,
  ) {

    return this.addressService.create(data);

  }


}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkNumber } from 'utils/checkNumber';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto) {

    return  this.prisma.product.create({data});
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: checkNumber(id),
      }
    });
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      data,
      where: {
        id: checkNumber(id),
      }
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id: checkNumber(id),
      }
    });
  }
}

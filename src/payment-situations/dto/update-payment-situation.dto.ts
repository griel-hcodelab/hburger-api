import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentSituationDto } from './create-payment-situation.dto';

export class UpdatePaymentSituationDto extends PartialType(
  CreatePaymentSituationDto,
) {}

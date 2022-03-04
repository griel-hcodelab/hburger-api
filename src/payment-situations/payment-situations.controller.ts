import { Controller, Get } from '@nestjs/common';
import { PaymentSituationsService } from './payment-situations.service';

@Controller('payment-situations')
export class PaymentSituationsController {
    constructor (private paymentSituationsService: PaymentSituationsService) {}
}

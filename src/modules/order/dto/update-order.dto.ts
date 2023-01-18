import { PartialType } from '@nestjs/swagger';
import { orderStatus, paymentStatus } from '../constants';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum } from 'class-validator';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
    
    @IsEnum(orderStatus)
    orderStatus: orderStatus;
}

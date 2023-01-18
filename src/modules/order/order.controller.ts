import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto) : Promise<Order>{
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  

  @Get('/:orderId')
  async findUserById(@Param('orderId') orderId: number) : Promise<Order> { 
      const myOrder = await this.orderService.findOne(orderId);
      if(!myOrder)
      {
          throw new NotFoundException('order does not exist');
      }
      return myOrder;
  }


  @Patch('orderStatus/:orderId')
  update(@Param('orderId') orderId: number, @Body() body: UpdateOrderDto) : Promise<UpdateOrderDto> {
    return this.orderService.update(orderId, body);
  }

  @Patch('paymentStatus/:orderId')
  updatePayment(@Param('orderId') orderId: number, @Body() body: UpdatePaymentDto) : Promise<UpdatePaymentDto> {
    return this.orderService.updatePayment(orderId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

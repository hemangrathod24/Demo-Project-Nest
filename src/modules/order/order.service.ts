import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

   create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.repo.create(createOrderDto);
    return this.repo.save(newOrder);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(orderId: number) : Promise<Order>{
    if(!orderId)
    { 
        return null;
    }
    return this.repo.findOne({ orderId });
  }


  async update(orderId: number, updateOrderDto: UpdateOrderDto) : Promise<UpdateOrderDto>{
    const order = await this.findOne(orderId);
    if(!order)
            {
                throw new NotFoundException;
            }
            Object.assign(order,updateOrderDto);
            return this.repo.save(order);
  }

  // async updatePaymentStatus(orderId: number, updateOrderDto: UpdatePaymentDto) {
  //   const order = await this.findOne(orderId);
  //   if(!order)
  //           {
  //               throw new NotFoundException;
  //           }
  //           //Object.assign(order,updateOrderDto);
  //           return this.repo.update(orderId,order);
  // }

  async updatePayment(orderId: number, UpdatePaymentDto: UpdatePaymentDto) : Promise<UpdatePaymentDto> {
    const order = await this.findOne(orderId);
    if(!order)
            {
                throw new NotFoundException;
            }
            Object.assign(order,UpdatePaymentDto);
            return this.repo.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

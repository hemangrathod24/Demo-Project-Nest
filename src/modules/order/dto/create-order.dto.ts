import { IsEnum, IsNumber, IsString } from "class-validator";
import { paymentType } from "../constants";
import { paymentStatus } from "../constants";
import { orderStatus } from "../constants";

export class CreateOrderDto {

    @IsNumber()
    productId: number;
   
    @IsNumber()
    userId: number;
    
    @IsEnum(
        paymentType
    )
    paymentType: paymentType;
    
    @IsNumber()
    amount: number;
    
    @IsNumber()
    deliveryCharge: number;
    
    @IsNumber()
    totalAmount: number;
 
    @IsEnum(paymentStatus)
    paymentStatus: paymentStatus;
    
    @IsEnum(orderStatus)
    orderStatus: orderStatus;
}

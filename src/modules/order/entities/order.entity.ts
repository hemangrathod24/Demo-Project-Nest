import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { paymentType, paymentStatus, orderStatus } from "../constants";

@Entity()
export class Order {
    
    @PrimaryGeneratedColumn({
        name: 'order_id'
    })
    orderId: number;

    
    @Column({
        name: 'product_id'
    })
    productId: number;
   
    @Column({
        name: 'user_id'
    })
    userId: number;
    
    @Column(
        { 
            name: 'payment_type',
            type: "enum",
            enum: paymentType,
        }
    )
    paymentType: paymentType;
    
    @Column({
        name: 'amount'
    }
    )
    amount: number;
    
    @Column({
            name: 'delivery_charge'
        })
    deliveryCharge: number;
    
    @Column({
        name: 'total_amount'
    })
    totalAmount: number;
 
    @Column(
        { 
            name: 'payment_status',
            type: "enum",
            enum: paymentStatus,
        })
    paymentStatus: paymentStatus;
    
    @Column(
        { 
            name: 'order_status',
            type: "enum",
            enum: orderStatus,
        }
    )
    orderStatus: orderStatus;

}

import { paymentStatus } from "../constants";
import { IsEnum } from "class-validator";

export class UpdatePaymentDto{

    @IsEnum(paymentStatus)
    paymentStatus: paymentStatus;
}
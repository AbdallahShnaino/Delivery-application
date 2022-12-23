import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGard } from 'src/guards/auth.guard';
import { ClientGard } from 'src/guards/client.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(AuthGard)
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('/')
  @UseGuards(ClientGard)
  async createOrder(
    @Body()
    {
      name,
      description,
      dropoffLocLatitude,
      dropoffLocLongitude,
      pickupLocLatitude,
      pickupLocLongitude,
      quantity,
    }: CreateOrderDto,
    @Session() session: Record<string, any>,
  ) {
    const clientId = session.userId;
    return await this.orderService.createOrder(
      clientId,
      name,
      description,
      dropoffLocLatitude,
      dropoffLocLongitude,
      pickupLocLatitude,
      pickupLocLongitude,
      quantity,
    );
  }

  @Get('/')
  async getClientOrders(@Session() session: Record<string, any>) {
    return await this.orderService.getAllOrders(session.userId);
  }

  /* 
    
      @Column({ type: DataType.INTEGER })
  clientId: number;

  @Column({ type: DataType.INTEGER })
  delivererId: number;

  @Column({ type: DataType.STRING(50) })
  name: string;

  @Column({ type: DataType.STRING(50) })
  description: string;

  @Column({ type: DataType.DECIMAL })
  locLongitude: number;

  @Column({ type: DataType.DECIMAL })
  locLatitude: number;

  @Column({ type: DataType.STRING })
  @IsEnum(['wait for deliverer', 'on the way', 'submitted'])
  state: string;

  @Column({ type: DataType.DATE })
  submittedAt: Date;
  
    
    */
}

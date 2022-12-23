import { IsEnum } from 'class-validator';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'Orders' })
export class Order extends Model {
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
}

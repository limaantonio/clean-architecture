import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  @Column
  declare price: number;
}

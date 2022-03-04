import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class OrderItems1646357723347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                columnId,
                {
                    name: 'order_id',
                    type: 'int',
                },
                {
                    name: 'product_id',
                    type: 'int',
                },
                varchar('product_name'),
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    unsigned: true,
                },
                {
                    name: 'quantity',
                    type: 'tinyint',
                    default: 1,
                },
                createdAt,
                updatedAt
            ]
        }));

        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
            name: 'FK_order_items_orders',
        }));

        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
            name: 'FK_order_items_products',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_items', 'FK_order_items_products');
        await queryRunner.dropForeignKey('order_items', 'FK_order_items_orders');
        await queryRunner.dropTable('order_items');
    }

}

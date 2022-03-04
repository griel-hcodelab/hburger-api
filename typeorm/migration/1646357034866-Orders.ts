import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt } from "../columns";

export class Orders1646357034866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                columnId,
                {
                    name: 'person_id',
                    type: 'int',
                },
                {
                    name: 'address_id',
                    type: 'int',
                },
                {
                    name: 'payment_situation_id',
                    type: 'int',
                },
                {
                    name: 'total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    unsigned: true,
                },
                {
                    name: 'observations',
                    type: 'text',
                },
                createdAt,
                updatedAt,
            ],
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['person_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'persons',
            onDelete: 'CASCADE',
            name: 'FK_orders_persons',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'addresses',
            onDelete: 'CASCADE',
            name: 'FK_orders_addresses',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['payment_situation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'payment_situations',
            onDelete: 'CASCADE',
            name: 'FK_orders_payment_situations',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'FK_orders_payment_situations');
        await queryRunner.dropForeignKey('orders', 'FK_orders_addresses');
        await queryRunner.dropForeignKey('orders', 'FK_orders_persons');
        await queryRunner.dropTable('orders');
    }

}

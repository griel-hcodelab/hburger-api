import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class Products1646354577536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                columnId,
                varchar('name'),
                varchar('description'),
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    unsigned: true,
                },
                createdAt,
                updatedAt,
            ]
        }));

        await queryRunner.createIndex('products', new TableIndex({
            name: 'name_UNIQUE',
            columnNames: ['name'],
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}

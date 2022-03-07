import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class Ingredients1646355686931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ingredients',
            columns: [
                columnId,
                varchar('name'),
                varchar('description', '255', true),
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    unsigned: true,
                },
                {
                    name: 'ingredient_type_id',
                    type: 'int',
                },
                createdAt,
                updatedAt,
            ],
        }));

        await queryRunner.createForeignKey('ingredients', new TableForeignKey({
            columnNames: ['ingredient_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredient_types',
            onDelete: 'CASCADE',
            name: 'FK_ingredients_ingredient_types',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('ingredients', 'FK_ingredients_ingredient_types');
        await queryRunner.dropTable('ingredients');
    }

}

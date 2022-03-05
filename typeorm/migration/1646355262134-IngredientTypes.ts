import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class IngredientTypes1646355262134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ingredient_types',
            columns: [
                columnId,
                varchar('name'),
                varchar('description', '255', true),
                {
                    name: 'repeatable',
                    type: 'tinyint',
                    default: 1,
                },
                createdAt,
                updatedAt,
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ingredient_types');
    }

}

import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ProductIngredient1646356567696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_ingredient',
            columns: [
                {
                    name: 'product_id',
                    type: 'int',
                    isPrimary: true,
                }, 
                {
                    name: 'ingredient_id',
                    type: 'int',
                    isPrimary: true,
                },
            ],
        }));

        await queryRunner.createForeignKey('product_ingredient', new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
            name: 'FK_products_product_ingredient',
        }));

        await queryRunner.createForeignKey('product_ingredient', new TableForeignKey({
            columnNames: ['ingredient_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredients',
            onDelete: 'CASCADE',
            name: 'FK_ingredients_product_ingredient',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('product_ingredient', 'FK_ingredients_product_ingredient');
        await queryRunner.dropForeignKey('product_ingredient', 'FK_products_product_ingredient');
        await queryRunner.dropTable('product_ingredient');
    }

}

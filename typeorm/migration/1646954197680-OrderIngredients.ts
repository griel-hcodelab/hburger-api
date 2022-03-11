import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";


export class OrderIngredients1646954197680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table(
            {
                name: "order_ingredients",
                columns: [
                    {
                        name: "order_items_id",
                        type: "INT",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "ingredients_id",
                        type: "INT",
                        isPrimary: true,
                        isNullable: false
                    },
                ]

            }
        ));

        await queryRunner.createForeignKey('order_ingredients', new TableForeignKey({
            columnNames: ['order_items_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order_items',
            onDelete: 'CASCADE',
            name: 'FK_order_ingredients_order_items',
        }));

        await queryRunner.createForeignKey('order_ingredients', new TableForeignKey({
            columnNames: ['ingredients_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredients',
            onDelete: 'CASCADE',
            name: 'FK_order_ingredients_order_ingredients',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropForeignKey("order_ingredients","FK_order_ingredients_order_ingredients");
        await queryRunner.dropForeignKey("order_ingredients","FK_order_ingredients_order_items");
        await queryRunner.dropTable("order_ingredients");
    }

}

import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class Addresses1646351726453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "addresses",
            columns: [
                columnId,
                varchar("street"),
                varchar("number","16",true),
                varchar("complement","255",true),
                varchar("district"),
                varchar("city"),
                varchar("state"),
                varchar("country"),
                {
                    name: "zipcode",
                    type: "CHAR",
                    length: "8"
                },
                {
                    name: "person_id",
                    type: "INT"
                },
                createdAt, updatedAt
            ]
        }));

        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["person_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            onDelete: "CASCADE",
            name: "FK_addresses_persons"

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropForeignKey("addresses","FK_addresses_persons");
        await queryRunner.dropTable("addresses");
    }

}

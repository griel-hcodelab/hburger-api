import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class Persons1646351038879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "persons",
            columns: [
                columnId,
                varchar("name"),
                varchar("photo","255",true),
                {
                    name: "birthAt",
                    type: "DATE",
                    isNullable: true
                },
                {
                    name: "document",
                    type: "CHAR",
                    length: "11",
                    isNullable: true
                },
                {
                    name: "phone",
                    type: "CHAR",
                    length: "11",
                    isNullable: true
                },
                {
                    name: "user_id",
                    type: "INT",
                    isNullable: false
                },
                createdAt,
                updatedAt
            ]
        }));

        await queryRunner.createForeignKey("persons", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            name: "FK_persons_users"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropForeignKey("persons","FK_persons_users");
        await queryRunner.dropTable("persons");
    }

}

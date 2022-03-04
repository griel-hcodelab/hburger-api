import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class Users1646350668751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                columnId,
                varchar("email"),
                varchar("password"),
                createdAt,
                updatedAt
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropTable("users");
    }

}
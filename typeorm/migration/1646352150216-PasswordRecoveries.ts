import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class PasswordRecoveries1646352150216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "password_recoveries",
            columns: [
                columnId,
                varchar("token"),
                {
                    name: "user_id",
                    type: "INT",
                    isNullable: false
                },
                {
                    name: "resetAt",
                    type: "DATETIME",
                    isNullable: true
                },
                createdAt, updatedAt
            ]
        }));

        await queryRunner.createForeignKey("password_recoveries", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            name: "FK_password_recoveries_users"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropForeignKey("password_recoveries","FK_password_recoveries_users");
        await queryRunner.dropTable("password_recoveries");
    }

}

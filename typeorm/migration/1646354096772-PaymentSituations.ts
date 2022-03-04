import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnId, createdAt, updatedAt, varchar } from "../columns";

export class PaymentSituations1646354096772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payment_situations',
            columns: [
                columnId,
                varchar('name'),
                createdAt,
                updatedAt
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment_situations');
    }

}

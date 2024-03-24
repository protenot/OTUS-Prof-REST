import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDate1711282075687 implements MigrationInterface {
    name = 'AddDate1711282075687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "data" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "data"`);
    }

}

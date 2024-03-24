import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDate1711283800269 implements MigrationInterface {
    name = 'AddDate1711283800269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "data" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "data"`);
    }

}

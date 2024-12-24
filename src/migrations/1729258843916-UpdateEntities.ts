import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1729258843916 implements MigrationInterface {
    name = 'UpdateEntities1729258843916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "dislikeCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "dislikeCount"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likeCount"`);
    }

}

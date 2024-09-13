import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrlToPost1725892194475 implements MigrationInterface {
    name = 'AddImageUrlToPost1725892194475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "imageUrl"`);
    }

}

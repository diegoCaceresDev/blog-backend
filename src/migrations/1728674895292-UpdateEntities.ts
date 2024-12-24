import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1728674895292 implements MigrationInterface {
    name = 'UpdateEntities1728674895292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

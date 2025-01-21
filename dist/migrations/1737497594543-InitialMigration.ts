import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737497594543 implements MigrationInterface {
    name = 'InitialMigration1737497594543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "username" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "username"
            SET DEFAULT 'default_username'
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
        `);
    }

}

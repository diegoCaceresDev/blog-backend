import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1734985586672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Primero agregar la columna `role`
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "role" VARCHAR NOT NULL DEFAULT 'user';
        `);

    // Luego, agregar la columna `username` con un valor predeterminado
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "username" VARCHAR NOT NULL DEFAULT 'default_username';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar las columnas en caso de revertir la migración
    await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "role";
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "username";
        `);
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoleToUser1734985586672 = void 0;
class AddRoleToUser1734985586672 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "role" VARCHAR NOT NULL DEFAULT 'user';
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "username" VARCHAR NOT NULL DEFAULT 'default_username';
        `);
    }
    async down(queryRunner) {
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
exports.AddRoleToUser1734985586672 = AddRoleToUser1734985586672;
//# sourceMappingURL=1734985586672-AddRoleToUser.js.map
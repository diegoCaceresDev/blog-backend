"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntities1729258843916 = void 0;
class UpdateEntities1729258843916 {
    name = 'UpdateEntities1729258843916';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "dislikeCount" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "dislikeCount"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likeCount"`);
    }
}
exports.UpdateEntities1729258843916 = UpdateEntities1729258843916;
//# sourceMappingURL=1729258843916-UpdateEntities.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntities1728674895292 = void 0;
class UpdateEntities1728674895292 {
    name = 'UpdateEntities1728674895292';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateEntities1728674895292 = UpdateEntities1728674895292;
//# sourceMappingURL=1728674895292-UpdateEntities.js.map
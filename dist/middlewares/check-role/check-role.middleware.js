"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleMiddleware = void 0;
const common_1 = require("@nestjs/common");
let CheckRoleMiddleware = class CheckRoleMiddleware {
    use(req, res, next) {
        const user = req.user;
        const allowedRoles = ['admin', 'superuser'];
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no autenticado');
        }
        req.user.isSuperuser = user.role === 'superuser';
        if (!allowedRoles.includes(user.role)) {
            throw new common_1.UnauthorizedException('Acceso denegado');
        }
        next();
    }
};
exports.CheckRoleMiddleware = CheckRoleMiddleware;
exports.CheckRoleMiddleware = CheckRoleMiddleware = __decorate([
    (0, common_1.Injectable)()
], CheckRoleMiddleware);
//# sourceMappingURL=check-role.middleware.js.map
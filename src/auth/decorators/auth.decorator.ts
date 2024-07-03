import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "./roles.decorator";

export function auth(role: Role){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}
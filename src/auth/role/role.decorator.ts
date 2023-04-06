import { SetMetadata } from "@nestjs/common";

export enum Role {
    ADMIN,
    USER
  }

export const role_key = "role";
export const Roles = (...roles: Role[]) => SetMetadata(role_key, roles);
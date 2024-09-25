import { Observable } from "rxjs";
import { UserEntity } from "../usuario/domain/user-entity";

export interface IAuth
{
    login(user: UserEntity) : void 
    getChangeStatusUser(): Observable<boolean>
}
import { UserModel} from "./user.model";
import {Roles} from "../enums/user/roles.enum";

export class StaffModel extends UserModel {
    constructor(
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {

        super(_id, firstName, lastName, email, Roles.STAFF, password)
    }
}

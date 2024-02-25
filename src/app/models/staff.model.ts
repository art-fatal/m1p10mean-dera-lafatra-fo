import { UserModel} from "./user.model";
import {Roles} from "../enums/user/roles.enum";

export class StaffModel extends UserModel {
    constructor(
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        password?: string | undefined,
    ) {
        super(_id, firstName, lastName, email, Roles.STAFF, password)
    }

    setModel(_staff: unknown) {
        const staff = _staff as StaffModel

        staff.role = 'staff'
        super.setModel(staff)
    }

}

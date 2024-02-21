import {UserModel} from "./user.model";

export class StaffModel extends UserModel{
    constructor(
        firstName: string,
        lastName: string,
        email: string,
    ) {
        super(firstName, lastName, email,'staff')
    }

    setModel(_staff: unknown) {
        const staff = _staff as StaffModel

        staff.role = 'staff'
        super.setModel(staff)
    }

}

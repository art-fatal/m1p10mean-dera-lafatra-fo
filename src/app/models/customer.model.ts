import {UserModel} from "./user.model";
export const ROLE = 'customer'
export class CustomerModel extends UserModel{
    constructor(
        firstName: string,
        lastName: string,
        email: string,
    ) {
        super(firstName, lastName, email, ROLE)
    }

    setModel(_model: unknown) {
        const model = _model as CustomerModel

        model.role = ROLE
        super.setModel(model)
    }

}

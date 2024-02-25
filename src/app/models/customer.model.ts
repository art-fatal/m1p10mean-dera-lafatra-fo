import {UserModel} from "./user.model";
import {Roles} from "../enums/user/roles.enum";
export class CustomerModel extends UserModel{
    constructor(
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        super(_id, firstName, lastName, email, Roles.CUSTOMER, password)
    }

    public static setModel(_model: unknown) {
        const model = _model as CustomerModel
        return new CustomerModel(model.id,model.firstName || '', model.lastName || '' ,model.email || '', model.password || '')
    }

}

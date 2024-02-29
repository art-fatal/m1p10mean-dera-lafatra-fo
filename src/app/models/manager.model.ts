import {UserModel} from "./user.model";
import {Roles} from "../enums/user/roles.enum";
export class ManagerModel extends UserModel{
    constructor(
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        super(_id,firstName, lastName, email, Roles.MANAGER, password)
    }

    public static setModel(_model: unknown) {
        const model = _model as ManagerModel
        return new ManagerModel(model.id,model.firstName || '', model.lastName || '' ,model.email || '', model.password || '')
    }
}

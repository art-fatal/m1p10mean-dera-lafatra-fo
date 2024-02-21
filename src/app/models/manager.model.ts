import {UserModel} from "./user.model";
export const ROLE = 'manager'
export class ManagerModel extends UserModel{
    constructor(
        firstName: string,
        lastName: string,
        email: string,
    ) {
        super(firstName, lastName, email, ROLE)
    }

    setModel(_model: unknown) {
        const model: ManagerModel = _model as ManagerModel

        model.role = ROLE
        super.setModel(model)
    }

}

export abstract class UserModel {
    public createdAt: Date = new Date();

    protected constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string
    ) {
    }

    protected setModel(_model: unknown) {
        const model = _model as UserModel

        this.firstName = model.firstName
        this.lastName = model.lastName
        this.email = model.email
        this.role = model.role
    }

}

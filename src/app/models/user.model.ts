export abstract class UserModel {
    public createdAt: Date = new Date();

    protected constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public password: string,
    ) {
    }
}

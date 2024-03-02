export class ExpenseModel {
    constructor(
        public id: string,
        public date: Date,
        public name: string,
        public amount: number,
    ) {
    }
}

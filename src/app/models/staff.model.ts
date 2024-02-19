export class StaffModel {
    name: string
    description: string;
    category: string;
    price: Number;
    duration: Number;
    comission: Number;
    createdAt: Date;

    setStaff(_staff: unknown) {
        const staff  = _staff as StaffModel

        this.name = staff.name
        this.price = staff.price
        this.duration = staff.duration
        this.comission = staff.comission
        this.createdAt = staff.createdAt
        this.description = staff.description
    }

}

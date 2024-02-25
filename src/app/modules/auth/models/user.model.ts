import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import {Roles} from "../../../enums/user/roles.enum";

export class UserModel extends AuthModel {
  id: number;
  password: string;
  email: string;
  pic: string;
  role: Roles;
  phone: string;
  address?: AddressModel;
  firstname: string;
  lastname: string;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.password = user.password || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/avatars/blank.png';
    this.role = user.role || '';
    this.phone = user.phone || '';
    this.address = user.address;
  }
}

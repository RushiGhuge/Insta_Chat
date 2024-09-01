import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/auth/Dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDto>) {}

  fetchUsers(request: Request) {
    try {
      const logiedInUser = request['user'];
      return this.userModel
        .find({ _id: { $ne: logiedInUser } })
        .select('-password');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

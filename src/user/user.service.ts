import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../auth/Dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDto>) {}

  fetchUsers(request: Request) {
    try {
      const logiedInUser = request['user']?._id;
      if (logiedInUser)
        return this.userModel
          .find({ _id: { $ne: logiedInUser } })
          .select('-password');

      return {
        message: 'User not found. pleae login again',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

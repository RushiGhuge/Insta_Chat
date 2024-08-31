import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto, UserLoginDto } from './Dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10; // Number of salt rounds for bcrypt
  constructor(@InjectModel('User') private userModel: Model<UserDto>) {}

  /**
   * Creates a new user in the database.
   * @param {UserDto} userData - The data for the user to be created. Includes email and password.
   * @returns {Promise<User>} - The newly created user object.
   */
  async createNewUser(userData: UserDto) {
    const userExists = await this.userModel.exists({ email: userData.email });
    if (userExists) {
      throw new ConflictException(`Email already in use`);
    }
    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    return newUser.save();
  }

  /**
   * Logs in a user by validating credentials.
   * @param {UserLoginDto} userData - The login data including email and password.
   * @returns {Promise<any>} - An object containing a success message and user details if credentials are valid.
   */
  async loginUser(userData: UserLoginDto) {
    const user = await this.validateUser(userData.email, userData.password);
    if (!user) {
      throw new NotFoundException(`Invalid credentials`);
    }
    return { message: 'Login successful', ...user };
  }

  /**
   * Hashes a plain text password.
   * @param {string} password - The plain text password to hash.
   * @returns {Promise<string>} - The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  // Method to compare a password with a hashed password
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Method to validate a user during login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }
    return null;
  }
}

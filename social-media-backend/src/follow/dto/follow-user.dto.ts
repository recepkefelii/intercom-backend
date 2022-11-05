import { IsEmail, IsString } from 'class-validator';


export class UserFolllowDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  username?: string;
  about?: string;
  profilPhotoPath?: string;
  sentFriendRequests?: any[];
}

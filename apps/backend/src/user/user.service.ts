import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterBio, CharacterBioDocument } from 'src/schemas/CharacterBio';
import { RolePlayAd, RolePlayAdDocument } from 'src/schemas/RolePlayAd';
import { User, UserDocument } from 'src/schemas/User';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(CharacterBio.name)
    private characterBioModel: Model<CharacterBioDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  async deleteUserById(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      _id: `${userId}`,
      email: `deleted_user_${userId.slice(-6)}@deleted.com`,
      firstName: null,
      lastName: null,
      username: `deleted_user_${userId.slice(-6)}`,
      profilePicture: `${process.env.BACKEND_URL}/assets/deleted-user-pfp.jpg`,
      characterBios: [],
      rolePlayAds: [],
    });

    // delete the email from Firebase
    await this.firebase.auth().deleteUser(userId);

    // delete all the user's ads and character bios
    await this.characterBioModel.deleteMany({ author: userId });
    await this.rolePlayAdModel.deleteMany({ author: userId });
  }
}

export type ProfileStoreUser = {
  _id: string;
    email: string;
    username: string;
    roles: {
      _id: string
    }[];
    profile: {
      name: string;
      phone: string;
      gender: string;
      avatar: ProfileAvatar;
      birthday: string
    };
}

export type ProfileAvatar = {
  _id: string 
}

export interface ProfileStoreData {
  data: ProfileStoreUser | null;
  waiting: boolean;
  avatar?: string
}

export type ProfileStoreConfig = object;
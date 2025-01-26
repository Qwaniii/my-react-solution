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
      avatar: {
        id: string
      }
    };
}

export interface ProfileStoreData {
  data: ProfileStoreUser | null;
  waiting: boolean;
}

export type ProfileStoreConfig = object;
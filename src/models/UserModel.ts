interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  phone?: string;
  token?: string;
  refreshToken?: string;
  timeStamp?: TimeStamp;
}
interface UserProfile {
  description?: string;
  image?: string;
  timeStamp?: TimeStamp;
}
interface UserPreference {
  isPhonePublic?: boolean;
  isEmailPublic?: boolean;
  userType?: string;
  workDistance?: number;
  timeStamp?: TimeStamp;
}
interface TimeStamp {
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

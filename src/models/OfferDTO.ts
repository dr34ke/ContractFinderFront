export interface OfferDTO  {
  id: string;
  userId :string;
  categoryId: string;
  title: string;
  description: string;
  sugestedSalary: number;
  isSalaryPerHour: boolean;
  isRepetetive: boolean;
  isFromWorker: boolean;
  onSite: boolean;
  coordinates: string[];
  distanceInKm: number;
  timeStamp: TimeStamp;
  usersApplications: UserApplication[]|undefined
}

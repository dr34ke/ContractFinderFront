export interface Offer{
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
    coordinates?: number[] | null;
  }
  
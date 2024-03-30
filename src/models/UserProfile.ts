interface UserProfileDTO {
    id: string;
    first_name: string;
    last_name: string;
    email?: string | null;
    phone?: string | null;
    description?: string | null;
    image?: string | null;  
    rating?:number;
  }
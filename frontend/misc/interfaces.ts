import { RegistrationStatus, UserRole } from "@/misc/enums";

export interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
  image?: string;
  role: UserRole;
  verified: boolean;
}

export interface RegistrationDetails
  extends Omit<User, "verified" | "username" | "_id"> {
  password: string;
}

export interface Event {
  _id: string;
  title: string;
  user: string;
  slug: string;
  image?: string;
  description?: string;
  date: Date;
  location: string;
  price: number;
}

export interface Registration {
  _id: string;
  user: User;
  event: Event;
  timeStamp: Date;
  transactionId: string;
  status: RegistrationStatus;
}

export interface OrderStats {
  total: number;
  delivered: number;
  pending: number;
  canceled: number;
}

export interface DashboardSummary {
  users: number;
  totalOrders: number;
  pendingOrders: number;
  ordersHistory: {
    dates: string[];
    counts: number[];
  };
}

export interface PaginationData {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export interface PaginatedResponse<T> extends PaginationData {
  docs: T[];
}

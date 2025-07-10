export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  householdSize: number | null;
  propertyType: string | null;
  location: string | null;
  electricitySupplier: string | null;
  profileCompletion: number;
  notificationPrefs: string;
}
// ---------- User Settings ----------
export interface UserSettings {
  ownerMode:         boolean;
  language:          string;
  notifyEndOfCycle:  boolean;
  notifyPromotions:  boolean;
  notifyMaintenance: boolean;
  updatedAt:         string;
}
export type PatchUserSettings = Partial<Pick<UserSettings, 'ownerMode' | 'language' | 'notifyEndOfCycle' | 'notifyPromotions' | 'notifyMaintenance'>>;

// ---------- Enums as unions ----------
export type UserRole = 'superadmin' | 'admin' | 'maintainer' | 'public';
export type LaundryVisibility = 'public' | 'private';
export type MachineType = 'washing_machine' | 'dryer';
export type MachineStatus = 'available' | 'in_use' | 'out_of_order' | 'maintenance';
export type PaymentStatus = 'pending' | 'executed' | 'failed' | 'relay_busy' | 'cancelled';

// ---------- Payment ----------
export interface Payment {
  paymentId:   string;
  machineId:   number;
  status:      PaymentStatus;
  provider:    string;
  /** Provider-specific data (e.g. Stripe client_secret) */
  clientData?: Record<string, unknown>;
  createdAt:   string;
}

// ---------- Core Row types (SELECT shapes) ----------
export type AuthUser = {
  id: number;
  email: string;
  name?: string;
  avatarId?: number | null;
};

export interface User {
  id: number;
  firebaseId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Organization {
  id: number;
  name: string;
  ownerId: number;
  createdAt: Date;
}

export interface Location {
  id: number;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: string | null; // NUMERIC -> string
  longitude: string | null; // NUMERIC -> string
  createdAt: Date;
}

export interface Laundry {
  id: number;
  name: string;
  location: Location;
  visibility: LaundryVisibility;
  createdAt: Date;
  machines?: Machine[]; // populated via relation
}

export interface Machine {
  id: number;
  laundryId: number;
  name: string;
  type: MachineType;
  status: MachineStatus;
  modelNumber: string | null;
  createdAt: Date;
  /** Seconds remaining in the current cycle — present only when status === 'in_use' */
  cycleRemainingSeconds?: number;
}

export interface MaintainerOrganization {
  userId: number;
  organizationId: number;
}

// ---------- Insert shapes ----------
export type NewUser = Omit<User, 'id' | 'createdAt'> & { createdAt?: Date };
export type NewOrganization = Omit<Organization, 'id' | 'createdAt'> & { createdAt?: Date };
export type NewLocation = Omit<Location, 'id' | 'createdAt'> & { createdAt?: Date };
export type NewLaundry = Omit<Laundry, 'id' | 'createdAt' | 'visibility' | 'machines'> & {
  visibility?: LaundryVisibility;
  createdAt?: Date;
};
export type NewMachine = Omit<Machine, 'id' | 'createdAt' | 'status'> & {
  status?: MachineStatus;
  createdAt?: Date;
};
export type NewMaintainerOrganization = MaintainerOrganization;

// ---------- My Laundries ----------

/** Single entry in the user's saved laundry list */
export interface MyLaundry {
  id: number;
  name: string;
  visibility: LaundryVisibility;
  isMain: boolean;
  addedAt: string; // ISO datetime
  /** Present when visibility === 'private' and the user registered with a code */
  accessCode: string | null;
  location: Location;
  machines: Machine[];
}

export interface MyLaundriesResponse {
  laundries: MyLaundry[];
  mainLaundryId: number | null;
}

// ---------- Reports ----------
export interface Report {
  id: number;
  userId: number;
  laundryId: number | null;
  machineId: number | null;
  subject: string;
  description: string;
  createdAt: string;
}

export interface CreateReport {
  subject: string;
  description: string;
  laundryId?: number;
  machineId?: number;
}

// ---------- ID aliases ----------
export type UserId = User['id'];
export type OrganizationId = Organization['id'];
export type LocationId = Location['id'];
export type LaundryId = Laundry['id'];
export type MachineId = Machine['id'];

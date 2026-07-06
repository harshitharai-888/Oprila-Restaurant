export interface Reservation {
  id: number;
  customer: string;
  subtitle?: string;
  guests: number;
  table: string;
  status: string;
  statusColor?: string;
  source: string;
  time: string;
  avatar: string;
  avatarColor?: string;
  highlight?: boolean;
  approve?: boolean;
}
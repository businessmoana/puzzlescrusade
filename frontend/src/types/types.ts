import { User as TGUser } from "@telegram-apps/sdk-react";
import { Socket } from "socket.io-client";

export type ActivePage =
  | "mine"
  | "boost"
  | "cards"
  | "friends"
  | "earn"
  | "daily-checkin"
  | "battle"
  | "profile";

export type LayoutBackground = "image" | "gradient-color";

export type Task = {
  icon: React.ReactNode;
  title: string;
  type: string;
  url: string;
};

export type TaskStatus = "todo" | "done" | "claim";

export type DynamicTask = {
  id: number;
  title: string;
  link: string;
  type: string;
  bonus_amount: number;
  createdAt: string;
  updatedAt: string;
};

export type DailyCheckInStatus = "claimed" | "claim" | "disabled";

export type Game = {
  user: User;
  introductionStep: number;
};

export type User = {
  id: number;
  t_user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  coin_balance: number;
  level_point: number;
  energy_point: number;
  energy_size_level: number;
  energy_recovery_level: number;
  tap_multipler_level: number;
  last_tap_time: string;
  createdAt: string;
  updatedAt: string;
  serverTime: string;
  photo_url?: string;
  Referrals: Referral[];
  total_referral_count: number;
  TaskStatuses: UserTaskStatus[];
  UserTaskStatuses: DynamicUserTaskStatus[];
  DailyCheckIn: DailyCheckIn;
  Cards: UserCard[];
  CardClaim: CardClaim;
  isNew: boolean;
};

export type Referral = {
  id: number;
  user_id: number;
  reffered_user_id: number;
  createdAt: string;
  updatedAt: string;
  User: ReferralUser;
};

export type UserTaskStatus = {
  id: number;
  user_id: number;
  task: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type DynamicUserTaskStatus = {
  id: number;
  user_id: number;
  task_id: number;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type ReferralUser = {
  id: number;
  t_user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  coin_balance: number;
  level_point: number;
  photo_url?: string;
};

export type DailyCheckIn = {
  id: number;
  user_id: number;
  checkedin_count: number;
  createdAt: string;
  updatedAt: string;
  last_check_in: string;
};

export type CardClaim = {
  id: number;
  user_id: number;
  last_claim: string;
  createdAt: string;
  updatedAt: string;
};

export type UserCard = {
  id: number;
  user_id: number;
  card_slug: string;
  card_level: number;
  createdAt: string;
  updatedAt: string;
};

export type UserLevel = {
  title: string;
  from: number;
  to: number;
  index?: number;
};

export type HeroType = "light" | "dark" | "volcano" | "forest" | "ocean";

export interface ExpandedTGUser extends TGUser {
  startParam?: string;
}

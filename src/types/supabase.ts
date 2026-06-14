export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ProfileRow {
  id: string;
  username: string | null;
  avatar_url: string | null;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface PredictionRow {
  id: string;
  user_id: string;
  slug: string;
  match_data: Json;
  view: string | null;
  tournament_mode: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeagueRow {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface LeagueMemberRow {
  league_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      predictions: {
        Row: PredictionRow;
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          match_data: Json;
          view?: string | null;
          tournament_mode?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<PredictionRow>;
        Relationships: [];
      };
      leagues: {
        Row: LeagueRow;
        Insert: {
          id?: string;
          name: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<LeagueRow>;
        Relationships: [];
      };
      league_members: {
        Row: LeagueMemberRow;
        Insert: {
          league_id: string;
          user_id: string;
          role?: string;
          joined_at?: string;
        };
        Update: Partial<LeagueMemberRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

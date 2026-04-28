export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string
          card_id: string | null
          company_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          notification_channels: string[] | null
          resolution_comment: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
        }
        Insert: {
          alert_type: string
          card_id?: string | null
          company_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          notification_channels?: string[] | null
          resolution_comment?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Update: {
          alert_type?: string
          card_id?: string | null
          company_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          notification_channels?: string[] | null
          resolution_comment?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      allowed_merchants: {
        Row: {
          brand: string | null
          company_id: string
          created_at: string | null
          id: string
          is_whitelisted: boolean | null
          list_type: string | null
          mcc_code: string | null
          merchant_name: string
        }
        Insert: {
          brand?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          is_whitelisted?: boolean | null
          list_type?: string | null
          mcc_code?: string | null
          merchant_name: string
        }
        Update: {
          brand?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          is_whitelisted?: boolean | null
          list_type?: string | null
          mcc_code?: string | null
          merchant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "allowed_merchants_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allowed_merchants_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      card_alert_settings: {
        Row: {
          alert_on_declined: boolean | null
          alert_on_limit_exceeded: boolean | null
          alert_on_out_of_hours: boolean | null
          alert_on_out_of_zone: boolean | null
          alert_on_suspicious: boolean | null
          card_id: string
          created_at: string | null
          id: string
          notify_app: boolean | null
          notify_email: boolean | null
          notify_sms: boolean | null
          updated_at: string | null
        }
        Insert: {
          alert_on_declined?: boolean | null
          alert_on_limit_exceeded?: boolean | null
          alert_on_out_of_hours?: boolean | null
          alert_on_out_of_zone?: boolean | null
          alert_on_suspicious?: boolean | null
          card_id: string
          created_at?: string | null
          id?: string
          notify_app?: boolean | null
          notify_email?: boolean | null
          notify_sms?: boolean | null
          updated_at?: string | null
        }
        Update: {
          alert_on_declined?: boolean | null
          alert_on_limit_exceeded?: boolean | null
          alert_on_out_of_hours?: boolean | null
          alert_on_out_of_zone?: boolean | null
          alert_on_suspicious?: boolean | null
          card_id?: string
          created_at?: string | null
          id?: string
          notify_app?: boolean | null
          notify_email?: boolean | null
          notify_sms?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_alert_settings_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: true
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_rules: {
        Row: {
          card_id: string
          created_at: string | null
          id: string
          is_enabled: boolean | null
          priority: number | null
          rule_config: Json
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          card_id: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          priority?: number | null
          rule_config?: Json
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          card_id?: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          priority?: number | null
          rule_config?: Json
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_rules_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          allow_shop_purchases: boolean | null
          allowed_days: number[] | null
          allowed_fuel_types: string[] | null
          allowed_hours_end: string | null
          allowed_hours_start: string | null
          block_non_fuel_mcc: boolean | null
          card_number: string
          company_id: string
          created_at: string
          daily_limit: number | null
          driver_id: string | null
          enforce_vehicle_fuel_type: boolean | null
          geofencing_enabled: boolean | null
          geofencing_regions: string[] | null
          geofencing_zones: Json
          id: string
          is_active: boolean | null
          limit_type: string | null
          max_fills_per_day: number | null
          max_tank_capacity_mad: number | null
          monthly_limit: number | null
          per_transaction_limit: number | null
          per_transaction_min: number | null
          policy_id: string | null
          shop_max_amount: number | null
          station_ids: string[]
          updated_at: string
          vehicle_id: string | null
          weekly_limit: number | null
        }
        Insert: {
          allow_shop_purchases?: boolean | null
          allowed_days?: number[] | null
          allowed_fuel_types?: string[] | null
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          block_non_fuel_mcc?: boolean | null
          card_number: string
          company_id: string
          created_at?: string
          daily_limit?: number | null
          driver_id?: string | null
          enforce_vehicle_fuel_type?: boolean | null
          geofencing_enabled?: boolean | null
          geofencing_regions?: string[] | null
          geofencing_zones?: Json
          id?: string
          is_active?: boolean | null
          limit_type?: string | null
          max_fills_per_day?: number | null
          max_tank_capacity_mad?: number | null
          monthly_limit?: number | null
          per_transaction_limit?: number | null
          per_transaction_min?: number | null
          policy_id?: string | null
          shop_max_amount?: number | null
          station_ids?: string[]
          updated_at?: string
          vehicle_id?: string | null
          weekly_limit?: number | null
        }
        Update: {
          allow_shop_purchases?: boolean | null
          allowed_days?: number[] | null
          allowed_fuel_types?: string[] | null
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          block_non_fuel_mcc?: boolean | null
          card_number?: string
          company_id?: string
          created_at?: string
          daily_limit?: number | null
          driver_id?: string | null
          enforce_vehicle_fuel_type?: boolean | null
          geofencing_enabled?: boolean | null
          geofencing_regions?: string[] | null
          geofencing_zones?: Json
          id?: string
          is_active?: boolean | null
          limit_type?: string | null
          max_fills_per_day?: number | null
          max_tank_capacity_mad?: number | null
          monthly_limit?: number | null
          per_transaction_limit?: number | null
          per_transaction_min?: number | null
          policy_id?: string | null
          shop_max_amount?: number | null
          station_ids?: string[]
          updated_at?: string
          vehicle_id?: string | null
          weekly_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          postal_code: string | null
          siret: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          postal_code?: string | null
          siret?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          postal_code?: string | null
          siret?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          role?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          company_id: string
          created_at: string
          email: string | null
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          license_number: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          license_number?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          license_number?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          first_name: string
          fleet_size: string | null
          id: string
          last_name: string
          message: string | null
          phone: string | null
          request_type: string
          status: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          first_name: string
          fleet_size?: string | null
          id?: string
          last_name: string
          message?: string | null
          phone?: string | null
          request_type?: string
          status?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          first_name?: string
          fleet_size?: string | null
          id?: string
          last_name?: string
          message?: string | null
          phone?: string | null
          request_type?: string
          status?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          allow_shop_purchases: boolean | null
          allowed_days: number[] | null
          allowed_fuel_types: string[] | null
          allowed_hours_end: string | null
          allowed_hours_start: string | null
          block_non_fuel_mcc: boolean | null
          company_id: string
          created_at: string
          daily_limit: number | null
          description: string | null
          enforce_vehicle_fuel_type: boolean | null
          geofencing_enabled: boolean | null
          geofencing_regions: string[] | null
          geofencing_zones: Json
          id: string
          is_default: boolean | null
          limit_type: string | null
          max_fills_per_day: number | null
          max_tank_capacity_mad: number | null
          monthly_limit: number | null
          name: string
          per_transaction_limit: number | null
          per_transaction_min: number | null
          shop_max_amount: number | null
          station_ids: string[]
          updated_at: string
          weekly_limit: number | null
        }
        Insert: {
          allow_shop_purchases?: boolean | null
          allowed_days?: number[] | null
          allowed_fuel_types?: string[] | null
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          block_non_fuel_mcc?: boolean | null
          company_id: string
          created_at?: string
          daily_limit?: number | null
          description?: string | null
          enforce_vehicle_fuel_type?: boolean | null
          geofencing_enabled?: boolean | null
          geofencing_regions?: string[] | null
          geofencing_zones?: Json
          id?: string
          is_default?: boolean | null
          limit_type?: string | null
          max_fills_per_day?: number | null
          max_tank_capacity_mad?: number | null
          monthly_limit?: number | null
          name: string
          per_transaction_limit?: number | null
          per_transaction_min?: number | null
          shop_max_amount?: number | null
          station_ids?: string[]
          updated_at?: string
          weekly_limit?: number | null
        }
        Update: {
          allow_shop_purchases?: boolean | null
          allowed_days?: number[] | null
          allowed_fuel_types?: string[] | null
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          block_non_fuel_mcc?: boolean | null
          company_id?: string
          created_at?: string
          daily_limit?: number | null
          description?: string | null
          enforce_vehicle_fuel_type?: boolean | null
          geofencing_enabled?: boolean | null
          geofencing_regions?: string[] | null
          geofencing_zones?: Json
          id?: string
          is_default?: boolean | null
          limit_type?: string | null
          max_fills_per_day?: number | null
          max_tank_capacity_mad?: number | null
          monthly_limit?: number | null
          name?: string
          per_transaction_limit?: number | null
          per_transaction_min?: number | null
          shop_max_amount?: number | null
          station_ids?: string[]
          updated_at?: string
          weekly_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          card_id: string
          created_at: string
          fuel_type: string | null
          id: string
          liters: number | null
          location: string | null
          odometer: number | null
          station_brand: string | null
          station_name: string | null
          transaction_date: string
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string
          fuel_type?: string | null
          id?: string
          liters?: number | null
          location?: string | null
          odometer?: number | null
          station_brand?: string | null
          station_name?: string | null
          transaction_date?: string
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string
          fuel_type?: string | null
          id?: string
          liters?: number | null
          location?: string | null
          odometer?: number | null
          station_brand?: string | null
          station_name?: string | null
          transaction_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string | null
          company_id: string
          created_at: string
          fuel_type: string | null
          id: string
          is_active: boolean | null
          model: string | null
          plate_number: string
          updated_at: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Insert: {
          brand?: string | null
          company_id: string
          created_at?: string
          fuel_type?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          plate_number: string
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Update: {
          brand?: string | null
          company_id?: string
          created_at?: string
          fuel_type?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          plate_number?: string
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_summaries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      company_summaries: {
        Row: {
          id: string | null
          name: string | null
        }
        Insert: {
          id?: string | null
          name?: string | null
        }
        Update: {
          id?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_company_with_owner: {
        Args: {
          _address?: string
          _city?: string
          _email?: string
          _name: string
          _phone?: string
          _postal_code?: string
          _siret?: string
        }
        Returns: string
      }
      get_user_company_ids: { Args: { _user_id: string }; Returns: string[] }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      seed_company_alerts: {
        Args: { _alerts: Json; _company_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "fleet_manager" | "accountant" | "viewer"
      vehicle_type: "car" | "van" | "truck" | "motorcycle"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "fleet_manager", "accountant", "viewer"],
      vehicle_type: ["car", "van", "truck", "motorcycle"],
    },
  },
} as const

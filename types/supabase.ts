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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_interactions: {
        Row: {
          clinic_id: string | null
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          role: string | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          role?: string | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          role?: string | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_settings: {
        Row: {
          agent_name: string | null
          clinic_id: string | null
          created_at: string | null
          id: string
          model_name: string | null
          prompt_instructions: string | null
          updated_at: string | null
          voice_enabled: boolean | null
          welcome_message: string | null
        }
        Insert: {
          agent_name?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          model_name?: string | null
          prompt_instructions?: string | null
          updated_at?: string | null
          voice_enabled?: boolean | null
          welcome_message?: string | null
        }
        Update: {
          agent_name?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          model_name?: string | null
          prompt_instructions?: string | null
          updated_at?: string | null
          voice_enabled?: boolean | null
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_settings_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: true
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          ai_summary: string | null
          clinic_id: string | null
          created_at: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string | null
          service_id: string | null
          slot_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ai_summary?: string | null
          clinic_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          service_id?: string | null
          slot_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_summary?: string | null
          clinic_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          service_id?: string | null
          slot_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          subdomain: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          subdomain?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          subdomain?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          clinic_id: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          clinic_id?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          clinic_id?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          clinic_id: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          name: string
          price_usdc: number | null
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price_usdc?: number | null
        }
        Update: {
          clinic_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_usdc?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      slots: {
        Row: {
          clinic_id: string | null
          created_at: string | null
          doctor_id: string | null
          end_time: string
          id: string
          is_booked: boolean | null
          start_time: string
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          end_time: string
          id?: string
          is_booked?: boolean | null
          start_time: string
        }
        Update: {
          clinic_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          end_time?: string
          id?: string
          is_booked?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "slots_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "slots_doctor_id_fkey"
            columns: [ "doctor_id" ]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: [ "id" ]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      exec_sql: { Args: { query: string }; Returns: undefined }
      execute_sql: { Args: { query: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
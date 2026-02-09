import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export type Database = {
  public: {
    Tables: {
      phrases: {
        Row: {
          id: string
          category: 'boss_rant' | 'resignation' | 'healing' | 'empathy'
          content: string
          is_user_submitted: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category: 'boss_rant' | 'resignation' | 'healing' | 'empathy'
          content: string
          is_user_submitted?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category?: 'boss_rant' | 'resignation' | 'healing' | 'empathy'
          content?: string
          is_user_submitted?: boolean
          created_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          total_practice_time: number
          total_characters_typed: number
          average_wpm: number
          average_accuracy: number
          level: number
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_practice_time?: number
          total_characters_typed?: number
          average_wpm?: number
          average_accuracy?: number
          level?: number
          title?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_practice_time?: number
          total_characters_typed?: number
          average_wpm?: number
          average_accuracy?: number
          level?: number
          title?: string
          created_at?: string
          updated_at?: string
        }
      }
      practice_sessions: {
        Row: {
          id: string
          user_id: string
          phrase_id: string
          wpm: number
          accuracy: number
          duration: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phrase_id: string
          wpm: number
          accuracy: number
          duration: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phrase_id?: string
          wpm?: number
          accuracy?: number
          duration?: number
          created_at?: string
        }
      }
    }
  }
}

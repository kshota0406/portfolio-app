// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// 環境変数からSupabaseの認証情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// デバッグ情報
console.log("Supabaseクライアント初期化:", {
  url: supabaseUrl ? "設定済み" : "未設定",
  key: supabaseAnonKey ? "設定済み" : "未設定",
});

// src/lib/supabase.ts の末尾に追加
import { initializeStorage } from "./supabaseStorage";

// アプリケーションの初期化時にストレージを初期化
initializeStorage().catch((error) => {
  console.error("ストレージ初期化に失敗しました:", error);
});

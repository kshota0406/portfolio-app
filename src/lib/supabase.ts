// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// 環境変数からSupabaseの認証情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// デバッグ情報
console.log("Supabaseクライアント初期化:", {
  url: supabaseUrl ? "設定済み" : "未設定",
  key: supabaseAnonKey ? "設定済み" : "未設定",
});

// ストレージ初期化の遅延インポート
setTimeout(async () => {
  try {
    const { initializeStorage } = await import("./supabaseStorage");
    await initializeStorage();
  } catch (error) {
    console.error("ストレージ初期化の確認に失敗しました:", error);
  }
}, 1000);

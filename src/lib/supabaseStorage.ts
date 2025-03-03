// src/lib/supabaseStorage.ts
import { supabase } from "./supabase";

// アプリ初期化時の処理
export async function initializeStorage(): Promise<void> {
  try {
    console.log("ストレージの初期化を確認中...");

    // バケット一覧を取得するだけ（作成はAPIルートに任せる）
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.warn("バケット一覧の取得に失敗しました:", error);
      return;
    }

    console.log(
      "既存のバケット:",
      buckets.map((b) => b.name).join(", ") || "なし"
    );
    console.log("ストレージの初期化確認完了");
  } catch (error) {
    console.error("ストレージの初期化確認に失敗しました:", error);
  }
}

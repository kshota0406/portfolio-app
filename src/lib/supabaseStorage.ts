// ファイルの先頭に以下のインポート文を追加
import { createClient } from "@supabase/supabase-js";

// 環境変数からSupabaseの接続情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabaseクライアントの初期化
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ファイルアップロード関数
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    // ファイル名からスペースを削除し、特殊文字を回避
    const fileExt = file.name.split(".").pop();
    const safeFileName = Date.now().toString();
    const filePath = path
      ? `${path}/${safeFileName}.${fileExt}`
      : `${safeFileName}.${fileExt}`;

    console.log("アップロード開始:", { bucket, filePath });

    // ファイルのアップロード
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true, // 既存ファイルを上書き
      });

    if (error) {
      console.error("ファイルアップロードエラー:", JSON.stringify(error));
      return null;
    }

    console.log("アップロード成功:", data);

    // ファイルの公開URL取得
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    console.log("公開URL:", urlData.publicUrl);

    return urlData.publicUrl;
  } catch (error) {
    console.error(
      "ファイルアップロード中に予期しないエラーが発生しました:",
      error
    );
    return null;
  }
}

export async function ensureBucketExists(
  bucketName: string,
  isPublic: boolean = true
): Promise<boolean> {
  try {
    // バケットリストを取得
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("バケットリスト取得エラー:", error);
      return false;
    }

    // バケットが存在するか確認
    const bucketExists = buckets.some((bucket) => bucket.name === bucketName);

    if (!bucketExists) {
      console.log(`バケット「${bucketName}」が存在しないため作成します`);

      // バケットを作成
      const { error: createError } = await supabase.storage.createBucket(
        bucketName,
        {
          public: isPublic,
        }
      );

      if (createError) {
        console.error(
          `バケット「${bucketName}」の作成に失敗しました:`,
          createError
        );
        return false;
      }

      console.log(`バケット「${bucketName}」を作成しました`);
    } else {
      console.log(`バケット「${bucketName}」は既に存在します`);
    }

    return true;
  } catch (error) {
    console.error("バケット確認中にエラーが発生しました:", error);
    return false;
  }
}

// アプリ初期化時にバケットを確認・作成
export async function initializeStorage(): Promise<void> {
  await ensureBucketExists("projects", true);
  await ensureBucketExists("avatars", true);
}

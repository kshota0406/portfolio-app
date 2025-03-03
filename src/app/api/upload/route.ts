// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";

// サーバーサイドでのみ使用するキー
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    // 認証チェック - getAuth()を使用して現在のリクエストの認証情報を取得
    const { userId } = getAuth(request);

    // 認証チェック
    if (!userId) {
      console.log("API: 認証されていないユーザー");
      return NextResponse.json(
        { error: "認証が必要です。ログインしてください。" },
        { status: 401 }
      );
    }

    console.log("API: 認証済みユーザー", userId);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;
    const path = formData.get("path") as string;

    if (!file || !bucket) {
      return NextResponse.json(
        { error: "ファイルとバケット名は必須です" },
        { status: 400 }
      );
    }

    // バケットが存在することを確認
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      console.error("バケット一覧取得エラー:", listError);
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    // バケットが存在するか確認
    const bucketExists = buckets.some((b) => b.name === bucket);

    // バケットが存在しない場合は作成
    if (!bucketExists) {
      console.log(`バケット「${bucket}」が存在しないため作成します`);
      const { error: createError } = await supabase.storage.createBucket(
        bucket,
        {
          public: true,
        }
      );

      if (createError) {
        console.error(
          `バケット「${bucket}」の作成に失敗しました:`,
          createError
        );
        return NextResponse.json(
          { error: createError.message },
          { status: 500 }
        );
      }

      console.log(`バケット「${bucket}」を作成しました`);

      // バケット作成後にポリシーを設定
      try {
        // すべての操作を許可するポリシーを作成
        const { error: policyError } = await supabase.storage
          .from(bucket)
          .createPolicy(`allow_public_${bucket}`, {
            name: `allow_public_${bucket}`,
            definition: "ALL",
            expression: "true",
          });

        if (policyError) {
          console.warn(`ポリシー設定エラー (無視します):`, policyError);
        } else {
          console.log(`バケット「${bucket}」にポリシーを設定しました`);
        }
      } catch (policyError) {
        console.warn(
          "ポリシー設定中にエラーが発生しました (無視します):",
          policyError
        );
      }
    } else {
      console.log(`バケット「${bucket}」は既に存在します`);
    }

    // ファイル名の準備
    const fileExt = file.name.split(".").pop();
    const safeFileName = Date.now().toString();
    const filePath = path
      ? `${path}/${safeFileName}.${fileExt}`
      : `${safeFileName}.${fileExt}`;

    console.log("アップロード開始:", { bucket, filePath, userId });

    // Supabaseにアップロード
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("アップロードエラー:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("アップロード成功:", data);

    // 公開URLを取得
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      success: true,
      message: "ファイルが正常にアップロードされました",
    });
  } catch (error: any) {
    console.error("サーバーエラー:", error);
    return NextResponse.json(
      { error: error.message || "内部サーバーエラー" },
      { status: 500 }
    );
  }
}

// src/app/admin/profile/page.tsx
import { Suspense } from "react";
import { getDefaultProfile } from "@/services/profileService";
import { Box, CircularProgress } from "@mui/material";
import ProfileEditClient from "@/components/admin/ProfileEditClient";

export default async function ProfileEditPage() {
  // データベースからプロフィールを取得
  const profile = await getDefaultProfile();

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <ProfileEditClient profile={profile} />
    </Suspense>
  );
}

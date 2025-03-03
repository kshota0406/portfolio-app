// src/components/admin/SkillForm.tsx
"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createSkillAction } from "@/app/actions/skillActions";

export default function SkillForm() {
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    icon: "",
    category: "frontend",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createSkillAction(formData);

    if (result.success) {
      // 成功時の処理
      alert("スキルが追加されました！");
      // フォームをリセット
      setFormData({
        name: "",
        level: 50,
        icon: "",
        category: "frontend",
      });
    } else {
      // エラー時の処理
      alert(`エラー: ${result.error}`);
    }
  };

  // フォームの入力処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームフィールド */}
      <TextField
        name="name"
        label="スキル名"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      {/* その他のフォームフィールド */}
      <Button type="submit" variant="contained" color="primary">
        スキルを追加
      </Button>
    </form>
  );
}

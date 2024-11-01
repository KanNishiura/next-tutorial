import { z } from "zod";

export const validationSchema = z.object({
    title : z.string().min(1,"入力必須です").max(15,"15文字以内で入力してください")
})
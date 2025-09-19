import { schema } from "src/app/(auth)/login/Login.schema"
import z from "zod"

export type LoginFormType=z.infer<typeof schema>
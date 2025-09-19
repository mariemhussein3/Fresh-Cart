import { schema } from "src/app/(auth)/register/Register.schema"
import z from "zod"

export type RegisterFormType=z.infer<typeof schema>
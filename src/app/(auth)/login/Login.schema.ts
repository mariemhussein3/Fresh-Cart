import { z } from "zod"
export const schema=z.object({
      
    email:z.email("email is required"),
    password:z.string().nonempty("email is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
),
   
  })

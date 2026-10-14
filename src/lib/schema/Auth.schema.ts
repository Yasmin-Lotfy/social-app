import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name s Required")
      .min(3, "min chars is 3")
      .max(10, "max chars is 10"),

    username: z
      .string()
      .nonempty("UserName is Required")
      .min(3, "min chars is 3")
      .max(10, "max chars is 10"),

    email: z.email("Not Valid Email").nonempty("email is Required"),

    dateOfBirth: z
      .string()
      .nonempty("dateOfBirth is Required")
      .refine((date) => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(date).getFullYear();

        const age = currentYear - birthYear;

        return age >= 18;
      }, "Age Must be Greater than 18 Years Old"),

    gender: z.string().nonempty("gender is Required"),

    password: z
      .string()
      .nonempty("password is Required")
      .min(3, "min chars is 3")
      .max(10, "max chars is 10"),

    rePassword: z.string().nonempty("rePassword is Required"),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      path: ["rePassword"],
      message: "Passwors nOT mATCH",
    },
  );

  
export const loginSchema = z
  .object({
   



    email: z.email("Not Valid Email").nonempty("email is Required"),





    password: z
      .string()
      .nonempty("password is Required")
      .min(3, "min chars is 3")
      .max(10, "max chars is 10"),

  });




  export type RegisterSchemaType = z.infer<typeof registerSchema>
  export type LoginSchemaType = z.infer<typeof loginSchema>
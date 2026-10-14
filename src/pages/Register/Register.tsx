import {
  Alert,
  Button,
  FieldError,
  Input,
  Spinner,
  TextField,
} from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../../lib/schema/Auth.schema";
import { registerUser } from "../../services/auth.services";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Register() {
  //  validation RHF
  // Library zod, Yup
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });

  async function submitData(formData: RegisterSchemaType) {
    console.log(formData);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await registerUser(formData);

      console.log(response);

      //  message
      console.log(response.data.message);
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      //  toast

      toast.success(response.data.message);


      //  redirect to login 

      setTimeout(()=>{
        navigate("/auth")
      }, 1500)


    } catch (error) {
      if (axios.isAxiosError(error)) {
        //  error message
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message);

        setTimeout(() => {
          setErrorMessage("");
        }, 1500);

        toast.error(error.response?.data.message)
      }
    }
  }
  // if there is validation error , we will find the properties  object
  console.log(errors);

  return (
    <>
      <section>
        <h1 className="text-main text-5xl font-bold">Create a new account</h1>
        <p className="py-5">It is quick and easy.</p>
        {successMessage && (
          <Alert status="success" className="my-3 bg-green-300">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{successMessage}</Alert.Title>
            </Alert.Content>
          </Alert>
        )}

        {errorMessage && (
          <Alert status="danger" className="my-3 bg-red-300">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{errorMessage}</Alert.Title>
            </Alert.Content>
          </Alert>
        )}
        <form className="space-y-4 " onSubmit={handleSubmit(submitData)}>
          <TextField
            aria-label="name"
            className="w-full"
            isInvalid={Boolean(errors.name)}
          >
            <Input
              {...register("name")}
              aria-label="Name"
              className="w-full rounded-lg"
              placeholder="Full Name"
            />

            <FieldError>{errors.name?.message}</FieldError>
          </TextField>

          <TextField
            aria-label="username"
            className="w-full"
            isInvalid={Boolean(errors.username)}
          >
            <Input
              {...register("username")}
              aria-label="userName"
              className="w-full rounded-lg"
              placeholder="User Name"
            />

            <FieldError>{errors.username?.message}</FieldError>
          </TextField>

          <TextField
            aria-label="email"
            className="w-full"
            isInvalid={Boolean(errors.email)}
          >
            <Input
              {...register("email")}
              aria-label="email"
              type="email"
              className="w-full rounded-lg"
              placeholder="Email"
            />
            <FieldError>{errors.email?.message}</FieldError>
          </TextField>

          <TextField
            aria-label="dateOfBirth"
            className="w-full"
            isInvalid={Boolean(errors.dateOfBirth)}
          >
            <Input
              {...register("dateOfBirth")}
              aria-label="date"
              type="date"
              className="w-full rounded-lg"
              placeholder="Date Of Birth"
            />

            <FieldError>{errors.dateOfBirth?.message}</FieldError>
          </TextField>

          <TextField
            aria-label="gender"
            className="w-full"
            isInvalid={Boolean(errors.gender)}
          >
            <Controller
              name="gender"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      aria-label="gender"
                      className="w-full"
                      placeholder="Gender"
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="male" textValue="male">
                            Male
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="female" textValue="female">
                            Female
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </>
                );
              }}
            />
            <FieldError>{errors.gender?.message}</FieldError>
          </TextField>
          <TextField
            aria-label="password"
            className="w-full"
            isInvalid={Boolean(errors.password)}
          >
            <Input
              {...register("password")}
              aria-label="password"
              type="password"
              className="w-full rounded-lg"
              placeholder="Password"
            />
            <FieldError>{errors.password?.message}</FieldError>
          </TextField>
          <TextField
            aria-label="rePassword"
            className="w-full"
            isInvalid={Boolean(errors.rePassword)}
          >
            <Input
              {...register("rePassword")}
              aria-label="repassword"
              type="password"
              className="w-full rounded-lg"
              placeholder="Confirm Password"
            />
            <FieldError>{errors.rePassword?.message}</FieldError>
          </TextField>

          <Button
            type="submit"
            className="bg-main p-3 w-full text-white rounded-lg"
          >
            {isSubmitting ? (
              <div className="flex gap-2 text-white">
                {" "}
                <Spinner /> <span>Loading...</span>
              </div>
            ) : (
              " Create New Account"
            )}
          </Button>
        </form>
      </section>
    </>
  );
}

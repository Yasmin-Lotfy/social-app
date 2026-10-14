import {
  Alert,
  Button,
  FieldError,
  Input,
  Spinner,
  TextField,
} from "@heroui/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../lib/schema/Auth.schema";
import { loginUser } from "../../services/auth.services";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {  useAuth } from "../../context/authContext";

export default function Login() {
  //  validation RHF
  // Library zod, Yup

  const {setToken} = useAuth()
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitData(formData: LoginSchemaType) {
    console.log(formData);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await loginUser(formData);

      console.log(response);
      // token 
      console.log(response.data.data.token);
      // local stoarge , session storage , cookies (browser)
      //  server cookies + encryption 

      localStorage.setItem("userToken",response.data.data.token );
      setToken (response.data.data.token )
      

      //  message
      console.log(response.data.message);
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      //  toast

      toast.success(response.data.message);

      //  redirect to login

      setTimeout(() => {
        navigate("/");
      }, 1500);


    } catch (error) {
      if (axios.isAxiosError(error)) {
        //  error message
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message);

        setTimeout(() => {
          setErrorMessage("");
        }, 1500);

        toast.error(error.response?.data.message);
      }
    }
  }
  // if there is validation error , we will find the properties  object
  console.log(errors);

  return (
    <>
      <section>
        <h1 className="text-main text-5xl font-bold">Log in to Route Posts</h1>
        <p className="py-5">Log in and continue your social journey.</p>
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
              " Login"
            )}
          </Button>
        </form>
      </section>
    </>
  );
}

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "./authApi";
import { AxiosError } from "axios";



// useLogin hook
export const useLogin = () => {


    const navigate = useNavigate();


    return useMutation({


        mutationFn: async (data: FormData) => {
            return await LoginApi(data);
        },


        onSuccess: (data: any) => {


            // Store token if returned
            if (data?.access_token) {
                localStorage.setItem("access_token", data.access_token);
            }


            toast.success("Welcome back!", { description: "You have been signed in successfully.", duration: 3000 });
            navigate("/dashboard");


        },



        onError: (error: AxiosError<any>) => {


            // Extract the most useful backend error message
            const responseData = error?.response?.data;
            let message = "An unexpected error occurred. Please try again.";


            if (responseData) {

                if (typeof responseData === "string") {

                    message = responseData;

                } else if (responseData?.detail) {

                    message = responseData.detail;

                } else if (responseData?.non_field_errors) {

                    message = responseData.non_field_errors[0];

                } else if (responseData?.message) {

                    message = responseData.message;

                }

            } else if (error?.message) {

                message = error.message;

            }


            toast.error("Login Failed", { description: message, duration: 5000 });


        },


    });


};
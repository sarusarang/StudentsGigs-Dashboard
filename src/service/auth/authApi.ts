import { CommonApi } from "@/lib/CommonApi";


//Login API
export const LoginApi = async (data: FormData) => {

    return await CommonApi("POST", `/dashboard/analytics/login/`, data);

}
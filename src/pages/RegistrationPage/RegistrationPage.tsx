import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginFormInputs {
  userName: string;
  name: string;
  surName: string;
  middleName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}

interface Error {
  code:string
  description:string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      let currentDate = new Date().toString()
      const url = new URL(`http://localhost:8080/Accounts/Register`);
      url.searchParams.append('UserName', data.userName);
      url.searchParams.append('Name', data.name);
      url.searchParams.append('SurName', data.surName);
      url.searchParams.append('MiddleName', data.middleName);
      url.searchParams.append('Email', data.email);
      url.searchParams.append('password', data.password);
      url.searchParams.append('PhoneNumber', data.phoneNumber);
      url.searchParams.append('BirthDate', currentDate);

      const response = await axios.post(url.toString(),null, { withCredentials: true });

      if (response.data.succeeded) {
        navigate("/Home");
        toast.success("Вы успешно зарегистрированы");
      } else {
        response.data.errors.forEach((error: Error) => {
          toast.error(error.description);
        })
      }
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Ошибка при регистрации");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Зарегистрируйтесь</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Или{' '}
          <a href="/LoginPage" className="font-medium text-indigo-600 hover:text-indigo-500">
            Войдите в ваш аккаунт
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("userName", { required: "User Name is required" })}
                />
                {errors.userName && <span className="text-red-500 text-sm">{errors.userName.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="surName" className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <div className="mt-1">
                <input
                  id="surName"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("surName", { required: "Surname is required" })}
                />
                {errors.surName && <span className="text-red-500 text-sm">{errors.surName.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <div className="mt-1">
                <input
                  id="middleName"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("middleName", { required: "Middle Name is required" })}
                />
                {errors.middleName && <span className="text-red-500 text-sm">{errors.middleName.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("phoneNumber", { required: "Phone Number is required" })}
                />
                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Birth Date
              </label>
              <div className="mt-1">
                <input
                  id="birthDate"
                  type="date"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("birthDate", { required: "Birth Date is required" })}
                />
                {errors.birthDate && <span className="text-red-500 text-sm">{errors.birthDate.message}</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { type ChangeEvent } from "react";
import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div>
      <div className="text-3xl font-bold">Create an account</div>
      <div className="text-slate-500 flex justify-center">
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className="underline ml-1"
        >
          {type === "signup" ? "login" : "signup"}
        </Link>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

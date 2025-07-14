import { AuthHeader } from "../components/AuthHeader";
import { Quote } from "../components/Quote";
import { LabelledInput } from "../components/AuthHeader";
import type { SignupType } from "@kiddoo/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

const Signup = () => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const postData = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signup`,
      postInputs
    );
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/blogs");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen flex flex-col justify-center items-center">
        <AuthHeader type="signup" />
        <div className="w-80">
          <LabelledInput
            label={"Name"}
            placeholder={"kiddo"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
          <LabelledInput
            label={"Username"}
            placeholder={"kiddo@gmail.com"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
          <LabelledInput
            label={"Password"}
            placeholder={"123456"}
            type={"password"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 w-full"
            onClick={postData}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;

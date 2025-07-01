import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="flex justify-between border-b px-6 py-4">
      <div className="flex items-center cursor-pointer">Medium</div>
      <div className="flex items-center">
        <button className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
          New
        </button>
        <Avatar size={"big"} name="Sanjay Ramabuddi" />
      </div>
    </div>
  );
};
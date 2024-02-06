import { error } from "../assets";

const Error = () => (
  <div className='w-full flex justify-center items-center'>
    <img src={error} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-white mt-2">Something went wrong, refresh</h1>
  </div>
);

export default Error;
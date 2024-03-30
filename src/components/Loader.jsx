import { loader } from "../assets";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from '@chakra-ui/react';


const Loader = ({ title, isLoading }) => (
  <Skeleton isLoaded={isLoading}>
    <div className="w-full flex justify-center items-center flex-col">
      <img src={loader} alt="loader" className="w-full h-32 object-contain" />
      <h1 className="font-bold text-2xl text-white mt-2">{title || "loading..."}</h1>
    </div>
  </Skeleton>
);

export default Loader;

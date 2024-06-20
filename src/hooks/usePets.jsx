
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const usePets = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: pets = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosCommon.get("/adoptable-pets");
      return res.data;
    },
  });

  return [pets, loading, refetch];
};

export default usePets;

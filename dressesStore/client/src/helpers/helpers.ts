import axios from "axios";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/types";

const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  export const getQuantityPrice = async (dress_id: number,setSizeQuantityObject:CallableFunction  ) => {
    try {
      // to-do get-inventory route
      const { data } = await axios.get(
        `/api/dresses/get-inventory/${dress_id}`
      );
      const {
        ok,
        results,
        results4,
      } = data;
      if (!ok) throw new Error();
      setSizeQuantityObject(results4);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response.data.error, toastOptions);
    }
  };

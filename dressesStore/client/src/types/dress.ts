interface Dress  {
        map(arg0: (dress?: any, index?: any) => JSX.Element): import("react").ReactNode;

        dress_id: number,
        dress_name?:string,
        dress_price:number,
        img?:string,

  };

  export default Dress
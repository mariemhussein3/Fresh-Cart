"use client";
import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CartData } from "src/types/Cart.type";
import getUserCart from "src/Actions/CartActions/getUserCart.action";
import z from "zod";
import { CreateCashOrder } from "src/Actions/OrdersActions/CreateCashOrder";
import { CountCart } from "src/Context/CountCart";
import { useRouter } from "next/navigation";
import { CreateCheckoutOrder } from "src/Actions/OrdersActions/CreateCheckoutOrder";
export default function Payment() {
  const route = useRouter();
  const context = useContext(CountCart);
  if (!context) {
    throw new Error("Not Exit")
  }
  const { setCountCart } = context;
  const [cartid, setCartId] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
    const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const [isDisabledOnline, setIsDisabledOnline] = useState(false);

  const schema = z.object({
    details: z.string().nonempty("details is required"),
    phone: z
      .string()
      .nonempty("phone is required")
      .regex(/^01[0125][0-9]{8}$/),
    city: z.string().nonempty("city is required"),
  });
  const formObj = useForm({
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    
  } = formObj;

  async function handleCreateCashOrder(values: z.infer<typeof schema>) {
    setIsLoading(true);
    setIsDisabled(true);
    const res = await CreateCashOrder(cartid!, values);

    if (res.status == "success") {
 
      setCountCart(0);
      toast.success("payment is done!!", {
        position: "top-center",
        duration: 2000,
      });
      route.push("/cart");
    } else {
    
      toast.success(res.message, { position: "top-center", duration: 2000 });
    }
      setIsLoading(false);
      setIsDisabled(false);
  }
    async function handleCreateOnlineOrder(values: z.infer<typeof schema>) {
    setIsLoadingOnline(true);
    setIsDisabledOnline(true);
    const res = await CreateCheckoutOrder(cartid!, values);

    if (res.status == "success") {
      window.open(res.session.url,"_self")
    } else {
      toast.success(res.message, { position: "top-center", duration: 2000 });
    }
        setIsLoadingOnline(false);
      setIsDisabledOnline(false);
  }
  async function getCartID() {
    const data: CartData = await getUserCart();
    setCartId(data.cartId);
  }
  useEffect(() => {
    getCartID();
  }, []);

  return (
    <>
      <div className="w-[40%] mx-auto my-32 ">
        <Form {...formObj}>
          <form
            className="px-3 w-full flex flex-col items-center"
          >
            <FormField
              control={control}
              name="details"
              render={({ field }) => (
                <FormItem className="my-5 w-full">
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem className="my-5 w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-5 w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
   <div className="flex gap-3 items-center justify-center w-full">

             <Button
              type="submit"
              onClick={handleSubmit(handleCreateCashOrder)}
              disabled={isDisabled}
              className="disabled:bg-[#dfba5be8] rounded-none py-5 w-1/2 btn cursor-pointer mt-2 text-[.8em]"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Payment Cash"
              )}
            </Button>
            <Button
              type="submit"
           onClick=   {handleSubmit(handleCreateOnlineOrder)}
              disabled={isDisabledOnline}
              className="disabled:bg-[#dfba5be8] rounded-none py-5 w-1/2 btn cursor-pointer mt-2 text-[.8em]"
            >
              {isLoadingOnline ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Payment Online"
              )}
            </Button>
   </div>
          </form>
        </Form>
      </div>
    </>
  );
}

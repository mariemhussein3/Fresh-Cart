"use client";
import React from "react";
import { product } from "./../../../types/products.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "../AddBtn/AddBtn";
import WishListBtn from "../WishListBtn/WishListBtn";
import { motion } from "framer-motion";
export default function ProductCard({ productCard }: { productCard: product }) {
  const { title, _id, imageCover, price, ratingsAverage } = productCard;

  return (
    <>
      <motion.div
        initial={{ x: -30, opacity: .9 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <Card className="gap-3 relative group overflow-hidden rounded-sm">
          <Link href={`products/${_id}`}>
            <CardHeader>
              <Image
                src={imageCover}
                width={200}
                height={200}
                className="w-full "
                alt={title}
              ></Image>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-2 font-medium line-clamp-1 text-[16px]">
                {title}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <CardContent className="p-0 my-2 flex justify-between w-full text-[14px] ">
                <span className="text-main font-bold text-[13px]">
                  {price}.00 EPG
                </span>
                <div className="">
                  <i className="fa-solid fa-star pr-3 rating-color "></i>
                  <span>{ratingsAverage}</span>
                </div>
              </CardContent>
            </CardFooter>
          </Link>
          <div className="px-3 top-10 right-[-40px] group-hover:right-0 absolute group-hover:transition-all  group-hover:duration-500 flex items-center justify-start flex-col gap-4">
            <WishListBtn id={_id} />
            <AddBtn id={_id} icon={true} />
          </div>
        </Card>
      </motion.div>
    </>
  );
}

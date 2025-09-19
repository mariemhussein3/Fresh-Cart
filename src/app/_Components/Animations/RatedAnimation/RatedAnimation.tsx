"use client"
import React from 'react'
import ProductCard from "src/app/_Components/ProductCard/ProductCard";
import { product } from 'src/types/products.type';
import { motion } from 'framer-motion';
export default function RatedAnimation({ratedProducts}:{ratedProducts:product[]}) {
  return <>
  
  <div className="grid xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
             {ratedProducts.map((productCard:product)=>(
            <motion.div
key={productCard._id}
                         className=""
                         initial={{ y: 120, opacity: 0 }}
                         whileInView={{ y: 0, opacity: 1 }}
                         transition={{ duration: 1 }}
                         viewport={{ once: true,amount:.6}}
           
                       >
                       <ProductCard  productCard={productCard}/>
                       </motion.div>

             ))}
          </div>
  </>
}

import React from 'react'
import CategoriesApi from 'src/services/Categories.api'
import CategorySwiper from '../CategorySwiper/CategorySwiper';
import { Total } from 'src/types/Total.type';

export default async function CategorySlider() {
    const data:Total= await CategoriesApi();
    
  return (
    <div className='my-10'>
        <CategorySwiper data={data.data}/>
    </div>
  )
}

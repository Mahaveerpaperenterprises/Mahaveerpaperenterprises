"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css/navigation";
import "swiper/css";
import ProductItem from "@/components/Common/ProductItem";

type CategoryItem = {
  title?: string;
  name?: string;
  label?: string;
  icon?: string;
  image?: string;
  thumbnail?: string;
  slug?: string;
  id?: string | number;
  href?: string;
  [key: string]: any;
};

const RecentlyViewdItems = () => {
  const sliderRef = useRef<any>(null);
  const [items, setItems] = useState<CategoryItem[]>([]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://mahaveerbe.vercel.app/api/categories", { cache: "no-store" });
        const json = await res.json();
        const raw: any[] =
          Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : Array.isArray(json?.categories) ? json.categories : [];
        const normalized = raw.map((c) => {
          const title = c?.title ?? c?.name ?? c?.label ?? "";
          const icon = c?.icon ?? c?.image ?? c?.thumbnail ?? "";
          const slug = c?.slug ?? c?.id ?? title?.toString()?.toLowerCase()?.replace(/\s+/g, "-");
          const href = c?.href ?? `/category/${slug}`;
          return { ...c, title, icon, href };
        });
        setItems(normalized);
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <Image src="/images/icons/icon-05.svg" width={17} height={17} alt="icon" />
                Categories
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">Browse by Category</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="swiper-button-prev">
                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z" />
                </svg>
              </button>
              <button onClick={handleNext} className="swiper-button-next">
                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z" />
                </svg>
              </button>
            </div>
          </div>
          <Swiper ref={sliderRef} slidesPerView={4} spaceBetween={20} className="justify-between">
            {items.map((item, key) => (
              <SwiperSlide key={key}>
                <ProductItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewdItems;

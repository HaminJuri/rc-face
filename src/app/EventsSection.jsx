"use client";
//! Required
import "./../app/swiper.css";
import { useEffect, useState } from "react";

//! Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import useSlidesAndEvents from "@/app/useSlidesAndEvents";

//! Template
const EventsSection = () => {
    const {
        data: SLIDES_AND_EVENTS,
        isSuccess: fetchedSlidesAndEvents,
        isFetching: fetchingSlidesAndEvents,
    } = useSlidesAndEvents();
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (window.screen.width >= 1024) {
            setIsDesktop(true);
        }
    }, []);
    return (
        <section className="mx-auto grid w-full max-w-md grid-cols-1 grid-rows-[15.625rem_10rem_10rem] items-stretch justify-items-stretch border-b-4 border-dotted border-orange-500 pb-10 sm:pt-7 lg:max-w-none lg:grid-cols-[49.688rem_23rem] lg:grid-rows-[11.5rem_11.5rem] lg:gap-4 lg:py-10">
            <div className="relative mx-auto block h-full w-full lg:row-span-2 lg:mt-0 lg:max-w-none">
                {!!fetchedSlidesAndEvents && (
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        pagination={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={isDesktop ? 1000 : 500}
                        loop={true}
                        className="h-full w-full sm:rounded-3xl"
                    >
                        {SLIDES_AND_EVENTS.slides
                            .sort((a, b) => a.sortIt - b.sortIt)
                            .map((slide) => {
                                return (
                                    <SwiperSlide key={slide._id}>
                                        <Link href={slide.href}>
                                            <figure className="h-full w-full">
                                                <Image
                                                    src={
                                                        isDesktop
                                                            ? slide.imageSrcDesktop
                                                            : slide.imageSrcMobile
                                                    }
                                                    alt={slide.title}
                                                    sizes="100vw"
                                                    width={isDesktop ? 795 : 448}
                                                    height={isDesktop ? 384 : 250}
                                                    priority
                                                    styles={
                                                        isDesktop
                                                            ? {
                                                                  width: "795px",
                                                                  height: "384px",
                                                                  objectFit: "contain",
                                                                  objectPosition: "center",
                                                              }
                                                            : {
                                                                  width: "448px",
                                                                  height: "250px",
                                                                  objectFit: "cover",
                                                                  objectPosition: "center",
                                                              }
                                                    }
                                                />
                                            </figure>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                )}
                {!!fetchingSlidesAndEvents && (
                    <div className="absolute right-0 top-0 z-[250] grid h-full w-full animate-pulse place-items-center bg-neutral-300 backdrop-blur-md backdrop-saturate-200 lg:rounded-2xl"></div>
                )}
            </div>
            {!!fetchedSlidesAndEvents ? (
                SLIDES_AND_EVENTS.events.map((e) => {
                    return (
                        <Link key={e._id} href={e.href} className="px-2 sm:px-0 lg:order-2">
                            <figure className="h-full w-full overflow-hidden rounded-3xl border border-neutral-200">
                                <Image
                                    src={isDesktop ? e.imageSrcDesktop : e.imageSrcMobile}
                                    alt={e.title}
                                    width={isDesktop ? 369 : 448}
                                    height={isDesktop ? 184 : 160}
                                    sizes="100vw"
                                    priority
                                    style={
                                        isDesktop
                                            ? {
                                                  width: "369px",
                                                  height: "184px",
                                                  objectFit: "cover",
                                                  objectPosition: "center",
                                              }
                                            : {
                                                  width: "448px",
                                                  height: "160px",
                                                  objectFit: "cover",
                                                  objectPosition: "center",
                                              }
                                    }
                                />
                            </figure>
                        </Link>
                    );
                })
            ) : (
                <>
                    <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-300"></div>
                    <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-300"></div>
                </>
            )}
        </section>
    );
};

export default EventsSection;

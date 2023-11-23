"use client";
import "./../../app/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import useDesktopEvents from "./useDesktopEvents";

const DesktopEventsSlider = () => {
    const { data: DESKTOP_EVENTS, isLoading: isFetchingDesktopEvents, isSuccess: fetchedDesktopEvents } = useDesktopEvents();
    return (
        <div className="relative mx-auto mb-6 block h-[11.875rem] w-[18.75rem]">
            {!!fetchedDesktopEvents && (
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    loop={true}
                    className="h-full w-full rounded-2xl shadow-xl shadow-black/10"
                >
                    {DESKTOP_EVENTS.map((slide) => {
                        return (
                            <SwiperSlide key={slide._id}>
                                <Link href={slide.href}>
                                    <figure className="h-full w-full">
                                        <Image
                                            src={slide.img}
                                            alt={slide.title}
                                            sizes="100vw"
                                            width={300}
                                            height={190}
                                            priority
                                            style={{
                                                width: "300px",
                                                height: "190px",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                            }}
                                        />
                                    </figure>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
            {!!isFetchingDesktopEvents && <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-300"></div>}
        </div>
    );
};

export default DesktopEventsSlider;

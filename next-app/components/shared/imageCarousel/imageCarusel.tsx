"use client";

import { useState } from "react";
import { ImageType } from "@/types/productsType";
import styles from "./imageCarousel.module.scss";
import { arrowLeftSVG, arrowRightSVG } from "../icons/icons";

export default function ImageCarousel({ images }: { images: ImageType[] }) {
	const [carouselPosition, setCarouselPosition] = useState(0);

	function moveCarousel(direction: "left" | "right") {
		const maxPosition = images.length * 100 - 100;
		switch (direction) {
			case "left":
				setCarouselPosition((prev) => {
					if (prev === 0) return -maxPosition;
					return prev + 100;
				});
				return;
			case "right":
				setCarouselPosition((prev) => {
					if (prev === -maxPosition) return 0;
					return prev - 100;
				});
				return;
		}
	}

	const currentSlide = Math.abs(carouselPosition / 100);

	return (
		<div className={styles.carouselContainer}>
			<div className={styles.carousel}>
				<div
					className={styles.carouselInner}
					style={{
						transform: `translateX(${carouselPosition}%)`,
					}}
				>
					{images.map((image, index) => (
						<div
							itemProp="image"
							key={image.src + index}
							className={styles.img}
							style={{
								background: `url(${image.src})`,
							}}
						/>
					))}
				</div>

				{/* Кнопки навигации */}
				{images.length > 1 && (
					<>
						<button
							onClick={() => moveCarousel("right")}
							className={styles.buttonController_right}
							aria-label="Следующее изображение"
						>
							{arrowRightSVG}
						</button>
						<button
							onClick={() => moveCarousel("left")}
							className={styles.buttonController_left}
							aria-label="Предыдущее изображение"
						>
							{arrowLeftSVG}
						</button>
					</>
				)}
			</div>

			{/* Индикаторы (показываем только если больше 1 изображения) */}
			{images.length > 1 && (
				<div className={styles.indicatorsContainer}>
					{images.map((image, index) => (
						<div
							className={styles.img}
							key={image.src + index}
							onClick={() => setCarouselPosition(-index * 100)}
							style={{
								background: `url(${image.src})`,
								borderColor: currentSlide === index ? "var(--orange-color)" : "transparent",
							}}
							aria-label={`Перейти к изображению ${index + 1}`}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setCarouselPosition(-index * 100);
								}
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}

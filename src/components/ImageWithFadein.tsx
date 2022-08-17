import React, { useCallback, useState } from 'react';
import { useScrollPosition, useWindowDimensions } from '../hooks';
import styles from './ImageWithFadein.module.css';

export interface ImageWithFadeinProps {
  src: string;
  width?: number;
  height?: number;
  scrollTo: number;
  imageTop: number;
  centerOffset?: number;
}

const WIDTH_BREAKPOINT = 768;

/**
 * @function ImageWithFadein
 * @desc renders a hidden image at a desired breakpoint (scrollTo) below the viewport,
 * and when scrolled down to, fixes it to the desired position (imageTop) and unhides it with a
 * ease-in animation. The image will hide again when scrolling up above the breakpoint.
 * 
 * @param {string} props.src url of image
 * @param {number} props.height height of image
 * @param {number} props.width width of image
 * @param {number} props.scrollTo position in vh of image before coming into view. For best results, this should be greater than 100
 * @param {number} props.imageTop fixed position in vh of image when in view. For best results, this should be between 0 and 100
 * @param {number} [props.centerOffset=0] % off center (0) in vw with left offset - and right offset +
 */

const ImageWithFadein = ({
  src,
  height,
  width,
  scrollTo,
  imageTop,
  centerOffset = 0,
}: ImageWithFadeinProps) => {
  const [imageHeight, setImageHeight] = useState<number>();

  const scrollPosition = useScrollPosition();

  const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();

  const getImageHeight = useCallback((e: any) => {
    setImageHeight(e.target.offsetHeight);
  }, [setImageHeight]);

  const fixedBreakpoint = (viewportHeight * (scrollTo / 100)) - (viewportHeight * (imageTop / 100));

  const isImageInView = scrollPosition >= fixedBreakpoint;

  const inlineImageStyles = isImageInView ? {
    top: `calc(${imageTop}vh - ${imageHeight}px)`,
  } : {
    top: `calc(${scrollTo}vh - ${imageHeight}px)`,
  };

  const isMobileWidth = viewportWidth < WIDTH_BREAKPOINT;

  return (
    <div className={styles.imageContainer}>
      <img
        className={
          !isImageInView ?
            `${styles.image} ${styles.imageInvisible}`
            : `${styles.image} ${styles.imageFixed} ${styles.imageVisible}`
        }
        src={src}
        alt=""
        style={{
          ...inlineImageStyles,
          transform: `translate(calc(-50% + ${centerOffset}vw), 0)${isMobileWidth ? ' scale(0.5)' : ''}`,
          height: height?.toString(),
          width: `${width?.toString()}px`,
        }}
        onLoad={getImageHeight}
      />
    </div>
  );
}

export default ImageWithFadein;
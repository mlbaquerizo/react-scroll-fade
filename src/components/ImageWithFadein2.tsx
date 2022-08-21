/**
 * ImageWithFadein
 * use useIntersectionObserver hook to trigger fade in animation
 */

 import { useState, useCallback, useRef, useEffect } from 'react';
 import { useScrollPosition, useWindowDimensions, useIntersectionObserver } from '../hooks';
 import styles from './ImageWithFadein2.module.css';
 
 /**
  * ImageWithFadeinProps
  * centerOffset: % off center (0) with left offset negative,
  *   right offset positive
  * scrollTo: position in vh of image before coming into view
  * imageTop: fixed position in vh of image when in view
  */
 
 interface ImageWithFadeinProps {
   src: string;
   width?: number;
   height?: number;
   scrollTo: number;
   imageTop: number;
   centerOffset?: number;
 }
 
 const WIDTH_BREAKPOINT = 768;
 
 const ImageWithFadein = ({
   src,
   height,
   width,
   scrollTo,
   imageTop,
   centerOffset = 0,
 }: ImageWithFadeinProps) => {
   const imageRef = useRef(null);
   const isBonFireInView = useIntersectionObserver(imageRef, { threshold: 1 });
 
   const [imageHeight, setImageHeight] = useState<number>();
   const [inlineImageStyles, setInlineImageStyles] = useState<{top: string;} | null>(null);
 
   const scrollPosition = useScrollPosition();
 
   const {
     height: viewportHeight,
     width: viewportWidth,
   } = useWindowDimensions();
 
   const getImageHeight = useCallback((e: any) => {
     setImageHeight(e.target.offsetHeight);
   }, [setImageHeight]);
 
   const fixedBreakpoint = (viewportHeight * (scrollTo / 100)) - (viewportHeight * (imageTop / 100));
 
   const isImageInView = scrollPosition >= fixedBreakpoint;
   
   useEffect(() => {
     if(isBonFireInView) {
       // console.log("BONFIRE IN VIEW!!!!!!!", isBonFireInView);
     }
   }, [isBonFireInView]);
 
   useEffect(() => {
     if (isImageInView) {
       setInlineImageStyles({
         top: `calc(${imageTop}vh - ${imageHeight}px)`,
       });
     } else {
       setInlineImageStyles({
         top: `calc(${scrollTo}vh - ${imageHeight}px)`,
       });
     }
   }, [isImageInView, imageHeight, imageTop, scrollTo]);
   
   const isMobileWidth = viewportWidth < WIDTH_BREAKPOINT;
 
   // console.log("scrollPosition: ", scrollPosition);
   // console.log("isImageInView: ", isImageInView);
 
   return (
     <div className={styles.imageContainer}>
       <img
         ref={imageRef}
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
 };
 
 export default ImageWithFadein;
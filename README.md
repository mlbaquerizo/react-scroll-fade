# react-scroll-fade
React component for scrolling to images with fade in and out.

The only export is the `ImageWithFadein` component. It renders a hidden image at a desired breakpoint (`scrollTo`) below the viewport, and when scrolled down to, fixes it to the desired position (`imageTop`) and unhides it with a ease-in animation. The image will hide again when scrolling up above the breakpoint.

The component takes care of smoothly transitioning to and from the image, so there are no jitters or hops when the image becomes visible. Just a nice and easy fade-in/out.

## Usage
```jsx
import { ImageWithFadein } from 'react-scroll-fade'; 

const App = () => {
  const imageSrc = './path/to/image.png|gif|jpg|etc';
  return () => {
    <ImageWithFadein
      src={imageSrc}
      centerOffset={-5}
      scrollTo={250}
      imageTop={80}
    />
  }
};
```

## Props
* `src` url of image
* `height` height of image
* `width` width of image
* `scrollTo` position in vh of image before coming into view. For best results, this should be greater than 100
* `imageTop` fixed position in vh of image when in view. For best results, this should be between 0 and 100
* `centerOffset` *default: 0* % of viewwidth off center (0) with left offset - and right offset +. By default, the image is centered. Use this prop to position it horizontally.

## Future
* Implement `ImageWithFadein` using `IntersetionObserver` API
* Add a non-fixed option
* Add a end-fixed-after-scroll option
* Add different animation types
* Allow control of animations
# Polaroid

An HTML/CSS/JS recreation of a classic polaroid 600 camera

## Instructions

`yarn build`

Open `index.html` in a modern web browser of choice

## Background

I'm an avid photographer and have always had fond memories of shooting with the
Polaroid 600. I remember my first Polaroid that I got was from Legoland

![Legoland
Polaroid](http://camera.ediot.com/wp-content/uploads/2010/11/Legoland-Polaroid-600.jpg)

I dug up an old one that's been collecting dust in my closet and decided an
interactive web version of it.

I took some time in the beginning to draw up a quick mock in Illustrator, but
also took some liberties during the implementation phase to change some things
up.

On the technical side, `getUserMedia` is used to request access to the user's
webcam. This is what creates the video stream that eventually renders a picture
onto the polaroid `canvas` element

## Future Steps

A lot of the code is documented with comments and todos. Furthermore:

- `getUserMedia` only works with latest browsers.
- Build not optimized for production
  - Javascript and CSS not minimized
- Recreating the polaroid in pure HTML/CSS was a fun challenge, but rendering a
  SVG of the design would have been way easier and more production friendly
- Implement a way for users to save and share their photos
- Add instructions on how to use the app. Polish the page to be more
  user-friendly

## Credits

- Polaroid sound sample taken from
  [freesound.org](http://freesound.org/people/satanicupsman/sounds/345906/),
  licensed under the Creative Commons 0 License by satnaicupsman

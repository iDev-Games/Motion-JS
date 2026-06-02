<p align="center">
  <img src="https://github.com/iDev-Games/Motion-JS/blob/master/logo.png">
</p>


[![iDev-Games - Motion-JS](https://img.shields.io/static/v1?label=iDev-Games&message=Motion-JS&color=blue&logo=github)](https://github.com/iDev-Games/Motion-JS "Go to GitHub repo")
[![stars - Motion-JS](https://img.shields.io/github/stars/iDev-Games/Motion-JS?style=social)](https://github.com/iDev-Games/Motion-JS)

[![Stargazers repo roster for @iDev-Games/Motion-JS](https://reporoster.com/stars/iDev-Games/Motion-JS)](https://github.com/iDev-Games/Motion-JS/stargazers)

[![GitHub tag](https://img.shields.io/github/tag/iDev-Games/Motion-JS?include_prereleases=&sort=semver&color=blue)](https://github.com/iDev-Games/Motion-JS/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

Motion.js is a time engine for CSS-native animations. It provides a global clock that updates CSS variables once per second while CSS handles smooth 60fps interpolation. Outputs `--motion-time`, `--motion-progress`, `--motion-loop`, `--motion-bounce`, and `--motion-noise`. Motion.js is the timing source; CSS is the animation engine. Create custom animations in CSS or use motion-animations.css for ready-made effects. Perfect for ambient motion, loading states, and continuous animations.

<p align="center">
  <img src="https://github.com/iDev-Games/Motion-JS/raw/master/creative.gif">
</p>


See it in action here: https://idev-games.github.io/Motion-JS/

You can download from Github.

Install with NPM

```css
npm i @idevgames/motion-js
```

Use Motion.js from a CDN
```
https://cdn.jsdelivr.net/npm/@idevgames/motion-js/dist/motion.min.js
```

# What is Motion.js?

Motion.js is a **time engine** for CSS-native animations. Unlike animation libraries that tween and interpolate in JavaScript, Motion.js provides a global clock that updates CSS variables once per second - CSS handles all the smooth 60fps animation via transitions.

**The Architecture:**
- **Motion.js** = Clock (updates time variables)
- **CSS** = Animation engine (interpolates smoothly)

This separation means animations stay in CSS where they belong, with full DevTools support and native browser optimization. Motion.js is really lightweight and created with pure JavaScript—no dependencies required.

Motion.js is simple to use - even if you aren't familiar with JavaScript, you can create stunning time-based effects with just HTML and CSS.

Motion.js is the perfect solution for time-based CSS animations in any project by developers of any skill level. It's ideal for:
- Loading animations and spinners
- Ambient motion effects (floating, pulsing, rotating)
- Continuous background animations
- Progress indicators
- Attention-grabbing micro-interactions
- Any animation driven by time rather than user interaction

**Includes practical animations like:**
- Pulse, Heartbeat, Glow
- Rotate, Spin, Float
- Shake, Wiggle, Bounce
- Loading Spinners & Progress Bars
- Fade, Slide, Zoom effects
- And many more!

# How To Install?

All you need to do is add the dist motion.js file into your project's JS folder and add the following code with your motion.js location as the src. Put this code in to your head HTML tags

```html
<script src="/js/motion.min.js"></script>
```

Or just add a CDN instead
```html
<script src="https://cdn.jsdelivr.net/npm/@idevgames/motion-js/dist/motion.min.js"></script>
```

# How To Use?

## Custom Time-Reactive Animations

To activate motion.js for custom animations, add the data attribute `data-motion` or class `enable-motion` to your HTML element. Motion.js will automatically start updating time-reactive CSS variables on that element.

```html
<div class="custom-animation" data-motion data-motion-var="true"> </div>
```
```css
.custom-animation {
    opacity: var(--motion-progress);
    transform: rotate(var(--motion-deg));
}
```

# Time-Reactive CSS Variables

Motion.js calculates time-based progress and creates CSS variables that you can use with CSS transforms, colors, opacity, etc.

```html
<div class="element" data-motion data-motion-var="true" data-motion-duration="2000"> </div>
```
```css
.element {
    transform: translateX(var(--motion-progress));
    opacity: calc(var(--motion-bounce) / 100);
}
```

The CSS variables available by adding `data-motion-var="true"` are:

```css
var(--motion-time)              /* Milliseconds elapsed */
var(--motion-time-reverse)      /* Negative milliseconds */
var(--motion-progress)          /* 0-100% through cycle */
var(--motion-progress-reverse)  /* 100-0% through cycle */
var(--motion-loop)              /* Loop count (integer) */
var(--motion-loop-reverse)      /* Negative loop count */
var(--motion-bounce)            /* 0→100→0 ping-pong */
var(--motion-bounce-reverse)    /* 100→0→100 ping-pong */
var(--motion-noise)             /* Pseudo-random 0-100% */
var(--motion-noise-reverse)     /* Inverted noise */
var(--motion-deg)               /* 0-360 degrees */
var(--motion-deg-reverse)       /* 360-0 degrees */
```

The data attribute will also update in increments of 10 so you can use CSS attribute selectors like:

```css
[data-motion-var="50"],
[data-motion-var="60"],
[data-motion-var="70"],
[data-motion-var="80"],
[data-motion-var="90"],
[data-motion-var="100"] {
    background: linear-gradient(45deg, #f00, #00f);
}
```

for more control and breakpoint-based styling.

# Animation State

Motion.js adds state classes to elements:
- `motion-playing` - Animation is actively running
- `motion-paused` - Animation is paused
- `motion` - Element is visible and being tracked

Progress checkpoint classes on body element:
- `motion-progress-start` - At 0% progress
- `motion-progress-25` - At 25% or more
- `motion-progress-50` - At 50% or more
- `motion-progress-75` - At 75% or more
- `motion-progress-end` - At 100% progress

# Data Attributes

You can use the below data attributes for additional configuration:

```html
<div id="yourelement"
     data-motion
     data-motion-var="true"
     data-motion-duration="1000"
     data-motion-delay="0"
     data-motion-min="0"
     data-motion-max="100"
     data-motion-global="false">
</div>
```

**Attributes:**
- `data-motion` - Enable motion tracking
- `data-motion-var="true"` - Enable CSS variable output
- `data-motion-duration="1000"` - Animation cycle duration in milliseconds (default: 1000)
- `data-motion-delay="0"` - Start delay in milliseconds (default: 0)
- `data-motion-min="0"` - Minimum progress value (default: 0)
- `data-motion-max="100"` - Maximum progress value (default: 100)
- `data-motion-global="true"` - Output variables globally with element ID suffix

# Global Variables

If you want to access an element's motion variables from anywhere in your CSS, use `data-motion-global="true"` and give the element an ID:

```html
<div id="loader" data-motion data-motion-var="true" data-motion-global="true"></div>
```

```css
.some-other-element {
    transform: rotate(var(--motion-deg-loader));
}
```

# Architecture Philosophy

Motion.js follows a unique **CSS-native paradigm**:

**Motion.js = Time Engine**
- Updates CSS variables once per second
- Provides the global clock for your animations
- Minimal JavaScript overhead

**CSS = Animation Engine**
- Handles all interpolation at 60fps via transitions/animations
- Provides the smooth motion between updates
- Full control in your stylesheets

This separation of concerns means Motion.js is **not** a tween engine like GSAP - it's purely a time source. CSS does all the heavy lifting for actual animation.

# Performance Features

Motion.js is highly optimized:
- **Lightweight updates**: Time variables update once per second; CSS handles 60fps interpolation
- **Manual pause/play API**: `motion.pause()` and `motion.play()` for DevTools workflow
- **IntersectionObserver**: Automatically pauses when elements are off-screen
- **Attribute caching**: Data attributes cached after first read
- **Conditional updates**: CSS variables only updated when values change
- **Zero dependencies**: Pure JavaScript, no external libraries
- **Tiny footprint**: Minimal file size for maximum performance

# Manual Control API

For inspecting CSS in DevTools or controlling animation playback:

```javascript
// Pause all time updates (in browser console)
motion.pause();

// Resume time updates
motion.play();
```

This is especially useful when inspecting and editing CSS in DevTools - pause the clock, make your changes, then resume.

# Part of the iDev Animation Toolkit

Motion.js is part of a family of complementary animation libraries:

**[Trig.js](https://github.com/iDev-Games/Trig-JS)** - Scroll-reactive CSS variables
- Perfect for scroll-based parallax and reveal animations
- Outputs scroll position data as CSS variables

**[Motion.js](https://github.com/iDev-Games/Motion-JS)** - Time-reactive CSS variables (this library)
- Perfect for continuous animations and loading states
- Outputs time-based data as CSS variables

**[Cursor.js](https://github.com/iDev-Games/Cursor-JS)** - Mouse-reactive CSS variables
- Perfect for cursor-following effects and interactive elements
- Outputs mouse position data as CSS variables

**Together they provide:**
- Complete control over scroll, time, and cursor interactions
- Same elegant CSS-first philosophy
- Same API patterns and conventions
- Same performance optimizations
- Zero dependencies for all
- Minimal footprint

Perfect toolkit for modern, interactive web experiences!

# Examples

## Simple Pulse Animation
```html
<div class="motion-pulse">
    <div class="motion-target">I'm pulsing!</div>
</div>
```

## Custom Duration Loading Spinner
```html
<div class="motion-rotate" style="--motion-duration: 1s;">
    <div class="motion-target">⚙️</div>
</div>
```

## Time-Driven Gradient
```html
<div data-motion data-motion-var="true" data-motion-duration="5000" style="
    background: linear-gradient(var(--motion-deg), #f00, #00f);
    width: 200px;
    height: 200px;
"></div>
```

## Bouncing Progress Indicator
```html
<div data-motion data-motion-var="true" style="
    width: var(--motion-bounce);
    height: 20px;
    background: blue;
"></div>
```

Check out the full documentation and more examples here: https://idev-games.github.io/Motion-JS/ and https://codepen.io/collection/WQeVyK

# License

Released under [MIT License](/LICENSE)

# Robert Mennell

# Viewing the Submission

1. Open the index.html file in a browser of your choice. It should have relative pathing to the assets folder and work no problem.
2. After that you can use the devtools on your browser and change the resolution or change the size of the browser to view the page as it changes sizes.
3. Once your browser is considered "mobile sized"(< 900px in either direction) it will apply the stylesheets.

Beyond that I have included my thoughts and methods in this readme that lead me to some decisions on how I should style the page and what tyles should be adopted.

## Hilton Challenge 1: Static Mobile Page

The first Hilton Coding Challenge wanted to focus more on HTML5, CSS, and responsive base design with a static HTML web page meant for mobile clients.

With an emphasis on design content, it is important to make sure that the design adheres to the specified layout for the mobile page on the resolution provided in the picture of 320 x 480, or the equivilant screen space of a Mobile-S Chrome Compability tools screen size. This is slightly shorter in height than an iPhone SE UIKit points size, but is the same width.

## Mobile only Stylesheets

Styling for this page is specified as for Mobile Phone support, and with this in mind, media queries should be used for certain adjustments to the styling to keep things in line. As for desktop/large format tablet sizes since those are such a drastic astpect ratio difference the browser or eventual actual rendering kit would load a different CSS based on media queries.

As such the CSS stylesheet will ONLY apply up to a max-width or max-height of 900px. After that a desktop/large format stylesheet should be adopted instead. This dissallows mobile styling on iPad, iPad Pros, and laptops.

## Bottom Footer

The bottom can easily be seen as another menu item, however the gradient scale begs to differ making it look more like a spacer for the menu than a menu item being drawn off screen. This appears to be a static menu, menu the licensing for the web page headers would show ownership of the logos in a meta tag.

## Background Image considerations

The background image has a height of 365 x 1100 there will need to either be slicing or scaling of the background to width or height. The image also does not scale nicely onto larger displays. Thankfully since this can only be shown on smaller screens, it is considered good enough. A larger background should be used in production to support different orentations.

### Centering and Edge Loss

The background image seems to have been centered in the preview image so that an equal ammount of clipping has happened on both sides. I'm not certain if this was intentional or just a weird artifact of the scaling of the original design size to the Chrome Mobile-S screen size. Seems that background is set to 110% size, center, fixed, and no-repeat. Scaling screen sizes should instead use a gradient beyond 2 times size. I'll pull some colors from the background itself.

## The Hilton Logo

The Hilton logo seems to have been cropped and adjusted to merge with the header background color.

To be able to use a similar logo a modification of the logo will be needed. Should be easy enough.

I don't want that 'registered' trademark in the bottom right of it though. In a real application it would be addressed in the copyright screen and licenses.

## Font

The Font appears to be Helvetica, but I cannot confirm. Will go with best guess of Helvetica and fall back to Arial and then Sans-serif family.

### Responsive Font Sizes

Because the stylesheet can ONLY apply to small format screens, the default font size has been decided to be kept on the stylesheet.

## Colors

I'll be using a color picker to match the colors as close as possible, but it seems there is some color fade and polution due to compression in the .png preview. A lossless would have been nice. Making best guess off of picker.

## Semantic HTML

Because this is a fairly straightforward page layout, a `header` tag, an `article` tag, and a `footer` tag should suffice for the three surrounding elements.

The bottom menu will be wrapped in a footer instead of a nav since I will be designing it to adhere to the bottom of the page and take up the width. This way either hand can interact with it from the bezel.

## Semantic CSS

Since a lot of CSS is text decoration it will be done with semantic CSS.

The CSS BEM naming convention will be adhered to when appropriate. Mainly visible in the Header, Article, and Footer sections

## Divs and their numbers

There are some points in time where a logical division is needed. In that case you should use a `div` tag.

This implimentation only uses 1!(As the spacing div on the footer)

### CAPTCHA

There used to be 4 `div`s instead of 1. I used them because I wanted to make certain that my code example was actually read. This was meant to be brought up in the feedback and questions for the interviewers. It was and as such the real styles I would use(calculated widths) are now being uploaded with the `button` semantic HTML.

It is after all better to be able to read your HTML and not have to trudge through it.

This does however mean a Div is still present as that `div` is an actual `division` of logic that I decided on to make a spacer.

## Feedback

After the interview there was some feedback discussed about the Static Page Assessment and is as follows:

1. The image should resize dynamically  
This was a misunderstanding as it is meant to not take up more than a certain amount of height until a certain threshold is passed so as to prevent unnessisary scrolling by the client. This could have been better documented in the README

2. There was an H4 tag closed with an H3 tag  
This was an error from a find and replace macro that was supposed to change the H3 to an H4, however it missed the closing tag. This is something my IDE(VSCode) does not support(highlighting of mismatched tags in pure HTML documents). This could probably be fixed by a plugin. I'll have to look for one.

3. The modification to the logo to achieve a proper logo was appreciated

4. The Arrow Fonts were actually images in Photoshop, it just so happens that they are almost 1:1 pixel perfect to Font Awesome's arrows  
A fun discovery

## Hilton Properties and Licenses

Hilton provided assets list:

- background.png
- Hl_mk_logo_hiltonbrandlogo_3.jpg
- HiltonHLogo.png
- hotelexterior.jpg
- test1-mobile-page.png

These files can be found in the assets folder. Their use is licensed by the Hilton Hotels & Resorts, any and all copyrights belong to them. Used with permission.

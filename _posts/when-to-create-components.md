---
title: 'Time to iterate: When you should create a component'
excerpt: ''
coverImage:
  path: '/assets/blog/man-under-box.jpg'
  alt: Man under box
date: '2023-04-01T02:00:00Z'
author:
  name: Jordan Booker
  picture: '/assets/blog/amplifierScreenshot.png'
ogImage:
  url: ''
  alt: Another image text
lead: Components are the new UI standard, however they are hard to get right the first time. They end up either prematurely over-engineered or require refactoring to accommodate new use-cases. Choose to create your components iteratively, after you’ve created the page.
---

It’s settled. The component pattern React popularized is the preferred organization method for web developers client side code. It’s a neat way to package up functionality in your website, it makes your code easier to maintain, and can even help you debug. So that being said when should you reach for this pattern? Short answer: if you see more than three instances of the same component, but only after you’ve completed your task.

Let’s take a look at this code below:

```javascript
const BlogPost = () => {
return (
	<div>
		<h1>Example Post</h1>
		<p>Blog post text</p>
		<div className="cards-container">
			<div className="card">
				<p>Card text</p>
				<button>CTA Button 1</button>
			</div>
			<div className="card">
				<p>Card text</p>
				<button>CTA Button 2</button>
			</div>
			<div className="card">
				<p>Card text</p>
				<button>CTA Button 3</button>
			</div>
		</div>
	<div>
	)
};
```

In the sample above the card jsx is repeated three times. This is a great candidate for refactoring. 

Let's now look at an example of how you could extract the repeated card code into a component.

```javascript
const Card = ({cardText, buttonText}) => {
	return (
		<div className="card">
			<p>{cardText}</p>
			<button>{buttonText}</button>
		</div>
	)
};

const BlogPost = () => {
	return (
		<div>
			<h1>Example Post</h1>
			<p>Blog post text</p>
			<div className="cards-container">
				<Card 
					cardText={"Card Text"} 
					buttonText={"CTA Button 1"} 
				/>
				<Card 
					cardText={"Card Text"} 
					buttonText={"CTA Button 2"} 
				/>
				<Card 
					cardText={"Card Text"} 
					buttonText={"CTA Button 3"} 
				/>
			</div>
		<div>
	)
};
```

Ah much better. But there are some caveats to this rule.

When I first started making my own components I remember thinking “I know I’ll be writing a bunch of button tags all with the same styles so let me go ahead and make it it’s own component and reuse when I need it again”  🤗

Fast forward to the end of development and I’ve used that button component once. On top of that I have different button components spread throughout my entire app. The original implementation of the button ended up being too specific.

So then I thought “okay…let’s just make the button more general next time”. Each new implementation of my button required some refactoring to fit all the use cases. And it worked, it also helped me develop some api skills. But it turned out to be incredibly inefficient. I found that I ended up spending too much time crafting and re-crafting the component’s API. Do I pass in the class as props? Or do I pass in if the button is disabled as props or let it be controlled in the components state? So on and so forth. Only to eventually go through the whole process again once a new requirement crept in.

![Face palm](https://media.tenor.com/Oaq1HNMNDVsAAAAC/facepalm-crowd.gif)

Be on the look out for a post on how I craft components in the future, heck you can even subscribe for email notifications when that article drops. 

If you develop professionally or plan to do so, speed matters. Unfortunately we don’t have time to make the perfect components and reflect on implementation details. Deadlines are inching ever closer and unfortunately this means I can’t waste time refactoring the same component each time I need to call it. This experience forced me to figure out how to work more efficiently. But not at the expense of quality. My solve was to rely on iteration. Worry about getting code in the editor, don’t worry about the first pass. Just get it rendered to the page with code smells and all. Then accommodate time to come back after you’ve finished your first pass and have a functioning prototype. If you don’t have time to come back to iterate on code then you have a different issue altogether. 

And that’s how I arrived at the rule of three as my general rule for using this pattern. It’s much easier to back into a component than build it before it’s implemented. 

![Understand gif](https://media.tenor.com/25IjtCdxlgoAAAAC/surprised-black.gif)

Here is an example - you’re creating a new landing page for an existing codebase. The page needs a CTA buttons in the hero, at the end of each section, and at the bottom of the page. You may think well let’s just go ahead and make a `<CTAButton />` and reference it everywhere you need it once you get there. Code your cute lil CTAButton once and done. Resist! You’ll quickly finding yourself problem solving how to have two different versions of buttons in one piece of code. All to find out down the line you need a third version.  

What you should do is… code it. I know, profound. But what I mean is try to hit a flow state. Maybe write the whole page in one huge ugly export. Don’t overthink it. Once it’s all working and you’re marveling at your progress you see you have buttons everywhere and the only difference is they are referencing different classes save the subscribe button. Now you should extract all of those buttons into a single CTAButton component. It’ll be easy as pie to pass in those classes you need as props. And you can just leave that nasty subscribe button alone because it doesn’t fit. 

I’ve included a [GitHub](https://github.com/jordattebayo/component-example) repo to highlight what this may look like.

Awesome, exception time. I actually don’t have many but the most compelling one is when you have a design system defined. Creating components that mirror the design system is a thing of documentation beauty. That being said design systems following atomic design are somewhat of a rarity so it’s relegated to being an exception. 

Actually I glossed over another exception in my example - when you’re component is huge. Sometimes it’s not about code reuse but cognitive load. There comes a point when a function becomes too unwieldy to wrap your brain around. The convention here is 500 lines. If your component goes passed 500 lines you may be better off creating a folder the same name as your component, then slicing your component up separating by logic or functionality. 

What are some hints you find in your code to iterate on a component. I’d be interested to know and discuss, hit me up on twitter or mastodon @jordattebayo.
<h1 align="center">Ellie's Quest Next</h1>

<p align="center">
  <br>
    <a href="https://travis-ci.org/richi1717/ellies-quest-next">
      <img src="https://img.shields.io/travis/rust-lang/rust.svg?style=plastic" alt="Gitter">
    </a>
    <a href="https://github.com/richi1717/ellies-quest-next">
      <img src="https://img.shields.io/david/expressjs/express.svg?style=plastic" alt="Gitter">
    </a>
    <a href="https://github.com/richi1717/ellies-quest-next">
      <img src="https://img.shields.io/david/dev/expressjs/express.svg?style=plastic" alt="Gitter">
    </a>
</p>

### Installation

```javascript
$ git clone git@github.com:richi1717/ellies-quest-next.git
$ cd ellies-quest-next
$ yarn
$ yarn dev
```

Then go to [http://localhost:3000/battle/forest](http:/localhost:3000/battle/forest) in chrome (because honestly that's the only one I've tested in right now) and enjoy.

### Paths

I use [next.js](https://nextjs.org/) for this project. The urls change the battle scene
and the enemies that appear. There will always be between 1-5 enemies but they are filtered based on where I think they
would exist if for some reason this world was real 😉. Here's a list of all of the locations you can go to. Still working
on the beach one because I'm not super happy with it.

- [http:/localhost:3000/battle/forest](http:/localhost:3000/battle/forest) -> forest
- [http:/localhost:3000/battle/grass](http:/localhost:3000/battle/grass) -> grass
- [http:/localhost:3000/battle/beach](http:/localhost:3000/battle/beach) -> beach
- [http:/localhost:3000/battle/boss](http:/localhost:3000/battle/boss) -> hellish volcano looking scene
- [http:/localhost:3000/battle/desert](http:/localhost:3000/battle/desert) -> desert wasteland looking area

I hope to add more in the future but want to get the mechanics sorted out.

### Insight

As you can clearly tell this is a huge project. The original that I did was poorly written as it was the first project I'd ever written by myself. Now I've gotten a few projects done and have a much better understanding of the tools I am using. I want to do this right and honestly have fun with it.

At the point of writing this I have only worked on the battle scene and have hard coded certain pieces just for testing. I've commented out the music for the battles, haven't even worked on triggering the battles, have hard coded the forest as my battle scene, and when you win the battle the only thing that happens is a div pops up with the words `You Win!!!` above the hero's head. I also, to save time and test, have only been using the one character. Eventually I'd like to get more characters in as well. I know React was not created with the thought of making games and honestly I will probably never create games for a living, but it is fun. I Hope this gets finished some day where people can play it and enjoy it as much as I have.

### Contributions

I love React and coding. So if anyone else has that same love and wants to contribute, feel free. I would also love to have an artist/designer to come up with scenes and such that aren't just used from google searching. I do love making music myself but just don't have the time to do all of this too.
If you want to be a part of this in any way, feel free to email me at richi1717@gmail.com.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

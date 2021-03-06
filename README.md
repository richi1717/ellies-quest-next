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

![Ellie's Quest](https://github.com/richi1717/ellies-quest-next/blob/master/public/battle.gif)

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

# Changelog

## #0.1.6

- next.config.js

  - add debug default value of false

- components/Enemies/Enemy

  - add logic to attack heroes
  - add logic to randomly select from living heroes
  - add animations to display attacking heroes
  - for debugging purposes add "turn icon" above enemy

- components/Header

  - make header absolute so it doesn't move the screen around

- components/Heroes/Hero

  - for debugging purposes change display numbers to show currentHp
  - edit styles to show dead even if they were defending

- MOVE components/StatusWindow/BattleMenu/Targets/helpers.js -> helpers/completeAction.js
- MOVE components/StatusWindow/Timer -> components/StatusWindow/HeroStats/Timer

- helpers/damageCalc

  - add logic to default to currentHp max damage amount

- hooks

  - add useDelayedEffect
  - remove useDelayedAction

- operations/mutations/addEnemies.js

  - add debug currentHp logic

- operations/mutations/killCharacter.js

  - add async/await to killCharacter so completeAction can wait until it's complete
  - add logic to call enemyKilledFadeOut with element

- operations/mutations/setWhoseTurn.js

  - add reset to whoseTurnVar
  - reorder calls
  - add console.error to see if whoseTurn messes up

- pages/battle/[battleScene].js

  - add items

- helpers/fadeOut.js

  - add enemyKilledFadeOut

## #0.1.5

- components/StatusWindow/BattleMenu/Items

  - add revive logic
  - remove console.log

- components/StatusWindow/BattleMenu/Targets/herlpers.js

  - add logic for revive item and magic

- operations/queries/getCharacters.js
  - add killed to heroes

## #0.1.4

- DELETE public/img/battle-sprites.png
- DELETE public/img/mario.gif
- DELETE public/img/mario.png
- DELETE public/img/ssscroll.png
- DELETE public/sprites
- DELETE src/constants/databaseUrls.js

- ADD next.config.js

  - add dbCharacters,dbEnemies, and dbItems

- package.json

  - add lint script

- cache.js

  - add itemsVar and items

- helpers/damageCalc.js

  - add itemHpCalculation
  - add itemMpCalculation

- components/StatusWindow/BattleMenu/Magic

  - add styledComponents from styled.js
  - remove styledComponents from index.js

- components/StatusWindow/BattleMenu/Targets

  - helpers.js

    - add dealItemDamage and logic
    - move mp logic for healTarget into check if typeOfMagic
    - add itemHealTarget and logic
    - add item to completeAction args
    - add itemDamage to switch
    - add check for item in switch heal

  - index.js

    - add item and sub to props
    - change warn logic to includes and add itemDamage to list
    - add item to completeAction args
    - add sub to styledComponent
    - update PropTypes typeOfAction list
    - set sub defaultProp

  - styled.js

    - remove unused styles
    - add props.sub logic to bottom and left styles

- MOVE components/BattleMenuItem.js -> components/StatusWindow/BattleMenu/Item

  - add logic to render item name and amount
  - add logic to select item
  - add logic to set typeOfAction and selectedItem
  - add Targets

- operations/mutations

  - add items.js and logic to add items and update amount
  - add addItem and updateItems to itemMutations
  - update logic and dependencies for resetDefending in setWhoseTurn.js

- operations/queries

  - add getItems.js

- components/BattleMenu/index.js

  - move BattleMenuAction out of BattleMenu
  - remove console.log
  - add Items
  - update all status bar border-radius to 10px

- pages/battle/[battleScene].js
  - add itemMutations call
  - remove constants import and use process.env instead for urls

## #0.1.3

- MOVE components/BattleMenuMagic.js -> components/StatusWindow/BattleMenu/Magic

  - add logic to render magic name and cost
  - add logic to select magic
  - add logic to set typeOfAction and typeOfMagic
  - add Targets

- components/Heroes/Hero

  - add turn indicator (fading yellow triangle)

- components/StatusWindow/BattleMenu/Targets

  - helpers.js
    - update calculations to include magic and subtract mp cost
    - update calculations to add healing
  - index.js
    - update propTypes to include typeOfMagic and targeter object instead of string
    - update calls to completeAction to include typeOfMagic
  - styled.js
    - remove duplicate left property

- components/StatusWindow/BattleMenu

  - change unable to disabled
  - update styles to use disabled
  - add magic render when selected

- hooks

  - add useDelayedAction for future use in animations

- operations/mutations/setWhoseTurn.js

  - update resetDefending to update character instead of whoseTurn character

- operations/mutations/updateStats.js
  - fix spacing

## #0.1.2

- operations/mutations/setWhoseTurn.js
  - add resetDefending function to reset hero defending "status"

## #0.1.1

- components/Enemies
  - Remove index from enemy mapping and use enemy.position for position
- components/Heroes
  - add id to HeroesContainer
- components/Heroes/Hero
  - add killed logic
  - change styled-component props from isHeroAttacking to attacking
  - clean up comments
  - add id to component
  - add defending to propTypes
- components/Heroes/Hero/styled.js
  - remove position: relative that was overridden
  - add background-position-x logic based off of attacking, killed, or defending props
- components/StatusWindow/BattleMenu
  - rename component BattleMenuTurn -> BattleMenu
  - clean up commented out code
  - add lodash clone
  - add logic to defendClick to clone hero, set defending to true, call updateHeroStats,
    and call finishTurn
- components/StatusWindow/BattleMenu/Targets
  - clean up and extract completeAction to helpers.js
  - add 'magicDamage' to list of typeOfAction propTypes
  - add helpers.js to handle different types of actions
- helpers/damageCalc.js
  - remove attacker.level check and just use calcLevel
  - tweak numbers
    - damageCalculation power 3.1, 3.6 up from 2.9, 3.3 and 1.9, 2.5 up from 1.8, 2.7
    - add defending check and cut damage in half
  - add magicHealthCalculation to calculate how much health to increase
- operations/mutations/addEnemies.js
  - set enemy.position instead of using index in Enemies map
- operations/mutations
  - add updateHeroStats and killCharacter
  - remove charactersVar
- operations/mutations/updateStats.js
  - change battleName destructure to optional chaining
  - add updateHeroStats to just update heroes instead of having to loop over enemies as well
- operations/queries/getCharacters.js
  - add optional chaining to enemies find check
- pages/battle/[battleScene].js
  - extract logic for header into components/Header
- pagesStyled
  - remove unused import and styles for Header
- components/Header
  - add Header and styles for Header
- operations/mutations/killCharacter.js
  - add killCharacter
  - add logic for killing enemies or heroes

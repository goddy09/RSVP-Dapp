# RSVP dApp

This workshop will focus on creating an decentralized application that allows two participant play a game of [Blackjack](https://en.wikipedia.org/wiki/Blackjack).

Ensure you have gone through the [Rock Paper Scissors](https://docs.reach.sh/tut/rps/#tut) tutorial before attempting this.

Create a directory named blackjack `~/reach/blackjack` where you would work in your [reach](https://docs.reach.sh/quickstart/#quickstart) folder.

```bash
$ mkdir -p ~/reach/blackjack && cd ~/reach/blackjack
```

Confirm you have Reach installed in `~/reach`:

```bash
$ ../reach version
```

Initialize the Reach program by running:

```bash
$ ../reach init
```

## **Problem Analysis**

Any program design process begins with a problem analysis to identify the information that is pertinent to the issue at hand.

In our case, we have the following questions:


> * Who is involved in this application?
> * What information do they know at the start of the program?
> * What information are they going to discover and use in the program?
> * What funds change ownership during the application and how?


You should write your answers in your Reach program (`index.rsh`) using a comment. /_ Remember comments are written like this. _/

**Write down the problem analysis of this program as a comment.**

Compare _your answers_ to _mine_:


> 1. This blackjack game consists of 2 roles:
>    * Alice: Who we know as the **Deployer**, as they are responsible for deploying the contract.
>    * Bob: Who we would call the **Attacher**, as they attach to the contract.
> 2. At the start of the program, Alice would know the wager and the timeout limit (deadline) they set for that particular session.
> 3. During the course of the game, each player will know the value of their cards as they are *dealt* by the program. Before the end of the game they would also know the value of the opponent's cards.
> 4. Both players will both pay the wager and the winner of the game would get paid a reward or the wager is split evenly in case of a tie.


It's fine if your responses vary from ours. Problem analysis is a "loose" approach that mimics creative expression more than it does monotonous computation. But it doesn't imply it's unnecessary, extraneous, or unwanted.


## **Data Definition**

After **Problem Analysis**, we move to **Data Definition** to describe what information our program needs, and how we can represent them in the program.

More details on [data types](https://docs.reach.sh/rsh/compute/#ref-programs-types) are available in Reach.

For our program we should decide:

> - What functions/values does Alice need to start the game?
> - What functions/values does Bob need to join the game?
> - What functions/values do the two players need to play and observe each other's moves?
> - What functions/values do the two players need to inform the contract of the value of their cards and assume their opponent has?

You should look back at your problem analysis to do this step. Whenever a participant starts off knowing something, then it is a field in the `interact` object. If they learn something, then it will be an argument to a function. If they provide something later, then it will be the result of a function.27

You should write your answers in your Reach file (`index.rsh`) as the participant interact interface for each of the participants.

#### **My data definitions**

```javascript
const Player = {
  ...hasRandom,
   // this would return an array whose first element is the sum of the cards and the second element is the first card
  dealCards: Fun([], Tuple(UInt, Bytes(8))),
  informTimeout: Fun([], Null),
  seeOutcome: Fun([UInt], Null),
  viewOpponentCards: Fun([Bytes(8)], Null),
};

const Alice = Participant("Alice", {
  ...Player,
  wager: UInt,
  deadline: UInt,
  revealCards: Fun([], Bytes(8)),
});

const Bob = Participant("Bob", {
  ...Player,
  acceptWager: Fun([UInt], Null),
});
```

#### **Things to note**

> 1. The cost of wager and deadline is represented as UInt ([unsigned integer](https://docs.reach.sh/rsh/compute/#rsh_UInt))
> 2. Alice also has a `revealCards` function to reveal their card at the end of the game. It returns a string of 8 [Bytes](https://docs.reach.sh/rsh/compute/#rsh_Bytes)
> 3. Both players share 4 more functions that perform the following respectively:
>  - Inform the contract of the sum of their random cards and the first card
>  - Get informed of timeout
>  - Get informed of the winner by accepting the sum value of their cards
>  - Display the content of their hidden cards.


## **Communication Construction**

The manner in which participants, including the consensus network, communicate and transmit information is a vital component of a decentralized program.

To write yours, check the sample from the [_Rock, Paper, Scissors!_](https://docs.reach.sh/tut/rps/#tut) tutorial.

**Check ours** below:


> 1. Alice set the wager and the deadline for the game
> 2. Alice is dealt with two randoms cards, Alice can decide to pick or stand, thereafter Alice informs the consensus of their cards and total card score
> 3. Alice publishes a digest of the cards and score
> 4. Bob accepts conditions of the contract, and also gets two cards simultaneously
> 5. Bob informs the contract of their cards and total cards score
> 6. Alice hidden card and total cards score is published
> 7. Consensus calculate the results, they are informed of the outcome
> 8. 1.5 of the wager total is given to Bob if they win and half is returned to Alice for fairness, since their card was displayed. But if Alice wins the whole wager goes to them. In the even of Blackjack or a tie for both players, they split the funds equally.


#### **Write down the communication pattern for the program as code**

```javascript
//Alice sets wager and deadline
Alice.only(() => {
  const wager = declassify(interact.wager);
  const deadline = declassify(interact.deadline);
});

Alice.publish(wager, deadline).pay(wager);

commit();

//Alice publish a digest of the card
Alice.publish(aliceCardsVisible);

commit();

//Bob accepts the wager and deadline
Bob.only(() => {
  interact.acceptWager(wager);
});

Bob.pay(wager);

//Bob publish informs the consensus of his cards and total card score relative to the deadline
Bob.publish(bobCardsTotal, bobCardsVisible);

// Alice digest is reveal
Alice.publish(aliceCardsTotal, aliceFinalCards);

//Outcome to the results
each([Alice, Bob], () => {
  interact.seeOutcome(outcome);
});

//Consensus calculate the results and makes the transfer
if (outcome == A_WINS) {
  transfer(2 * wager).to(Alice);
} else if (outcome == B_WINS) {
  transfer((3 * wager) / 2).to(Bob);
  transfer(wager / 2).to(Alice);
} else {
  transfer(wager).to(Bob);
  transfer(wager).to(Alice);
}

transfer(balance()).to(Alice);
```

At this point, we are almost ready to complete our program and make it so that we can run it. You've probably noticed that in our samples, the variables  `aliceCardsVisible`, `bobCardsTotal`, `bobCardsVisible`, `aliceCardsTotal` and `aliceFinalCards` are undefined. We'll handle that next.


## **Interaction Introduction**

Next we need to insert the appropriate calls to interact.

In our program this means defining `aliceCardsVisible`, `bobCardsTotal`, `bobCardsVisible`, `aliceCardsTotal` and `aliceFinalCards`

To insert **interact** calls to the frontend into the program, here is what we did:

```javascript
"reach 0.1";

const [isOutcome, A_WINS, DRAW, B_WINS] = makeEnum(3);

const winner = (bobTotal, aliceTotal) => {
  if (bobTotal > 21 || (aliceTotal < 22 && aliceTotal > bobTotal)) {
    return A_WINS;
  } else {
    if (bobTotal < 22 && (bobTotal > aliceTotal || aliceTotal > 21)) {
      return B_WINS;
    } else return DRAW;
  }
};

const Player = {
  ...hasRandom,
  dealCards: Fun([], Tuple(UInt, Bytes(8))),
  informTimeout: Fun([], Null),
  seeOutcome: Fun([UInt], Null),
  viewOpponentCards: Fun([Bytes(8)], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant("Alice", {
    ...Player,
    wager: UInt,
    deadline: UInt,
    revealCards: Fun([], Bytes(8)),
  });

  const Bob = Participant("Bob", {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });

  init();

  Alice.only(() => {
    const wager = declassify(interact.wager);
    const deadline = declassify(interact.deadline);
  });

  Alice.publish(wager, deadline).pay(wager);

  commit();

  Bob.only(() => {
    interact.acceptWager(wager);
  });

  Bob.pay(wager);

  commit();

  Alice.only(() => {
    const [_aliceCardsTotal, _aliceCardsVisible] = interact.dealCards();
    const aliceCardsVisible = declassify(_aliceCardsVisible);
    const [_aliceCommit, _aliceSalt] = makeCommitment(
      interact,
      _aliceCardsTotal
    );
  });

  Alice.publish(aliceCardsVisible);

  commit();

  Bob.interact.viewOpponentCards(aliceCardsVisible);

  Bob.only(() => {
    const [bobCardsTotal, bobCardsVisible] = declassify(interact.dealCards());
  });

  Bob.publish(bobCardsTotal, bobCardsVisible).timeout(
    relativeTime(deadline),
    () => closeTo(Alice, informTimeout)
  );

  commit();

  Alice.only(() => {
    const aliceCardsTotal = declassify(_aliceCardsTotal);
    interact.viewOpponentCards(bobCardsVisible);
    const aliceFinalCards = declassify(interact.revealCards());
  });

  Alice.publish(aliceCardsTotal, aliceFinalCards);

  Bob.interact.viewOpponentCards(aliceFinalCards);

  const outcome = winner(bobCardsTotal, aliceCardsTotal);

  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });

  if (outcome == A_WINS) {
    transfer(2 * wager).to(Alice);
  } else if (outcome == B_WINS) {
    transfer((3 * wager) / 2).to(Bob);
    transfer(wager / 2).to(Alice);
  } else {
    transfer(wager).to(Bob);
    transfer(wager).to(Alice);
  }

  transfer(balance()).to(Alice);

  commit();

  exit();
});
```

In the above code we defined the values that would represent the current outcome of our game using an enum `isOutcome`.

We also declared a function `winner` that calculates the results of both players. Then we declared variable `outcome` that receives the result, which will be revealed to the players, by the `seeOutcome` method.

Both Players can also see each other cards using the `viewOpponentCards` function.

At this point when we run:

```bash
$ ../reach compile
```

We will get a pleasant message that all our theorems are true. 

Nice Job, But we still need to add some more theorems.

## **Additions**

As of now, our code is flawless. But there are several areas where we can do better.

To prevent players from taking too long to play their move or, worse yet, quitting a game that has started, we imposed a timeout limit on each player.

Naturally, we'll need a way to alert both players when a timeout happens. To that end, we'll define a function like follows:

```javascript
const informTimeout = () => {
  each([Alice, Bob], () => {
    interact.informTimeout();
  });
};
```

We will utilize the deadline value that Alice supplied when she constructed the contract to apply the timeout.

When the timeout is implemented:

  * **Bob is to pay the wager**

```javascript
Bob.pay(wager).timeout(relativeTime(deadline), () =>
  closeTo(Alice, informTimeout)
);
```

* **Bob is to make is move**

```javascript
//........

Bob.only(() => {
  const [bobCardsTotal, bobCardsVisible] = declassify(interact.dealCards());
});

Bob.publish(bobCardsTotal, bobCardsVisible).timeout(
  relativeTime(deadline),
  () => closeTo(Alice, informTimeout)
);

//.............
```

* **Alice hidden card is to be revealed**

```javascript
//........

Alice.only(() => {
  const aliceCardsTotal = declassify(_aliceCardsTotal);
  interact.viewOpponentCards(bobCardsVisible);
  const aliceFinalCards = declassify(interact.revealCards());
});

Alice.publish(aliceCardsTotal, aliceFinalCards).timeout(
  relativeTime(deadline),
  () => closeTo(Bob, informTimeout)
);

//.............
```

**With all these changes our code will look like this:**

```javascript
"reach 0.1";

const [isOutcome, A_WINS, DRAW, B_WINS] = makeEnum(3);

const winner = (bobTotal, aliceTotal) => {
  if (bobTotal > 21 || (aliceTotal < 22 && aliceTotal > bobTotal)) {
    return A_WINS;
  } else {
    if (bobTotal < 22 && (bobTotal > aliceTotal || aliceTotal > 21)) {
      return B_WINS;
    } else return DRAW;
  }
};

const Player = {
  ...hasRandom,
  dealCards: Fun([], Tuple(UInt, Bytes(8))),
  informTimeout: Fun([], Null),
  seeOutcome: Fun([UInt], Null),
  viewOpponentCards: Fun([Bytes(8)], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant("Alice", {
    ...Player,
    wager: UInt,
    deadline: UInt,
    revealCards: Fun([], Bytes(8)),
  });

  const Bob = Participant("Bob", {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });

  init();

  const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
  };

  Alice.only(() => {
    const wager = declassify(interact.wager);
    const deadline = declassify(interact.deadline);
  });

  Alice.publish(wager, deadline).pay(wager);

  commit();

  Bob.only(() => {
    interact.acceptWager(wager);
  });

  Bob.pay(wager).timeout(relativeTime(deadline), () =>
    closeTo(Alice, informTimeout)
  );

  commit();

  Alice.only(() => {
    const [_aliceCardsTotal, _aliceCardsVisible] = interact.dealCards();
    const aliceCardsVisible = declassify(_aliceCardsVisible);
    const [_aliceCommit, _aliceSalt] = makeCommitment(
      interact,
      _aliceCardsTotal
    );
  });

  Alice.publish(aliceCardsVisible);

  commit();

  Bob.interact.viewOpponentCards(aliceCardsVisible);

  Bob.only(() => {
    const [bobCardsTotal, bobCardsVisible] = declassify(interact.dealCards());
  });

  Bob.publish(bobCardsTotal, bobCardsVisible).timeout(
    relativeTime(deadline),
    () => closeTo(Alice, informTimeout)
  );

  commit();

  Alice.only(() => {
    const aliceCardsTotal = declassify(_aliceCardsTotal);
    interact.viewOpponentCards(bobCardsVisible);
    const aliceFinalCards = declassify(interact.revealCards());
  });

  Alice.publish(aliceCardsTotal, aliceFinalCards).timeout(
    relativeTime(deadline),
    () => closeTo(Bob, informTimeout)
  );

  Bob.interact.viewOpponentCards(aliceFinalCards);

  const outcome = winner(bobCardsTotal, aliceCardsTotal);

  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });

  if (outcome == A_WINS) {
    transfer(2 * wager).to(Alice);
  } else if (outcome == B_WINS) {
    transfer((3 * wager) / 2).to(Bob);
    transfer(wager / 2).to(Alice);
  } else {
    transfer(wager).to(Bob);
    transfer(wager).to(Alice);
  }

  transfer(balance()).to(Alice);

  commit();

  exit();
});
```

## Deployment Decisions

We can write the frontend now that we have a complete contract. Because we will be connecting with an API to play the real Blackjack game, we need use a web frontend framework. It will be [React](https://reactjs.org/docs/getting-started.html) in our situation.

Stop! Incorporate frontend interact calls within the application.


```javascript
import * as backend from "./reach/build/index.main.mjs";
import { loadStdlib } from "@reach-sh/stdlib";
import { ALGO_MyAlgoConnect as MyAlgoConnect } from "@reach-sh/stdlib";

import "./App.css";
import { views, GameOutcome, blackJackGame } from "./utils/constants.js";
import { Loader } from "./utils/loader.jsx";
import React, { useState } from "react";

//views
import {
  AcceptWager,
  Attaching,
  ConnectAccount,
  Deploying,
  DeployOrAttach,
  PasteContractInfo,
  SetWager,
  WaitForAttacher,
  GameOutcomeView,
  GamePlayView,
} from "./views/";

import { Card } from "./cardComponents/index";
import { Header } from "./components/Header.js";

const reach = loadStdlib("ALGO");
reach.setWalletFallback(
  reach.walletFallback({ providerEnv: "TestNet", MyAlgoConnect })
);
const { standardUnit } = reach;

function App() {
  const [view, setView] = useState(views.CONNECT_ACCOUNT);
  const [account, setAccount] = useState({});
  const [contractInfo, setContractInfo] = useState();
  const [isAlice, setIsAlice] = useState(true);
  const [wager, setWager] = useState();
  const [resolver, setResolver] = useState({ resolve: () => null });
  const [gameOutcome, setGameOutcome] = useState(GameOutcome.UNDECIDED);
  const [opponentCards, setOpponentCards] = useState([]);
  const [myCards, setMyCards] = useState("");
  const [hasSeenSomeOpponentCards, setHasSeenSomeOpponentCards] = useState(
    false
  );
  const [canViewAllOpponentCards, setCanViewAllOpponentCards] = useState(false);

  const reachFunctions = {
    connect: async (secret, mnemonic = false) => {
      let result = "";
      try {
        const account = mnemonic
          ? await reach.newAccountFromMnemonic(secret)
          : await reach.getDefaultAccount();
        setAccount(account);
        setView(views.DEPLOY_OR_ATTACH);
        result = "success";
      } catch (error) {
        result = "failed";
      }
      return result;
    },

    setAsDeployer: (deployer = true) => {
      if (deployer) {
        setIsAlice(true);
        setView(views.SET_WAGER);
      } else {
        setIsAlice(false);
        setView(views.PASTE_CONTRACT_INFO);
      }
    },

    deploy: async (wager) => {
      const contract = account.contract(backend);
      const deadline = { ETH: 10, ALGO: 100, CFX: 1000 }[reach.connector];
      Alice.wager = reach.parseCurrency(wager);
      Alice.deadline = deadline;
      backend.Alice(contract, Alice);
      setView(views.DEPLOYING);
      const ctcInfo = JSON.stringify(await contract.getInfo(), null, 2);
      setContractInfo(ctcInfo);
      setView(views.WAIT_FOR_ATTACHER);
    },

    attach: (contractInfo) => {
      const contract = account.contract(backend, JSON.parse(contractInfo));
      backend.Bob(contract, Bob);
    },
  };

  const Player = {
    random: () => reach.hasRandom.random(),
    informTimeout: () => {
      setView(views.TIME_OUT);
      alert("Time out!!!!");
      window.location.reload();
    },

    dealCards: async () => {
      setView(views.GAME_PLAY);

      const card = await new Promise((resolve) => {
        setResolver({
          resolve,
        });
      });

      console.log(card);

      return card;
    },

    seeOutcome: async (value) => {
      const outcome = parseInt(value);
      console.log("The outcome is", outcome);

      if (outcome === 0) {
        setGameOutcome(isAlice ? GameOutcome.WINNER : GameOutcome.LOSS);
      } else if (outcome === 1) {
        setGameOutcome(GameOutcome.DRAW);
      } else {
        setGameOutcome(isAlice ? GameOutcome.LOSS : GameOutcome.WINNER);
      }

      setView(views.SEE_WINNER);
    },

    viewOpponentCards: async (cards) => {
      let splittedCard = cards.split("");
      let returnedCards = "";

      // check if it is a character
      splittedCard.forEach((char) => {
        //check if the character in array is among accepted cards
        if (blackJackGame.cards.indexOf(char) > -1) {
          returnedCards += char;
        }
      });

      setOpponentCards(returnedCards.split(""));

      if (isAlice) {
        setCanViewAllOpponentCards(true);
      } else {
        if (hasSeenSomeOpponentCards) {
          setCanViewAllOpponentCards(true);
        } else {
          setHasSeenSomeOpponentCards(true);
        }
      }
    },
  };

  const Alice = {
    ...Player,

    wager: 0,

    deadline: 0,

    setWagerAndDeadline: (wager, deadline) => {
      this.wager = wager;
      this.deadline = deadline;
    },

    waitingForAttacher: () => {
      setView(views.WAIT_FOR_ATTACHER);
    },

    revealCards: () => {
      return myCards;
    },
  };

  const Bob = {
    ...Player,

    acceptWager: async (wager) => {
      setView(views.ACCEPT_WAGER);
      setWager(reach.formatCurrency(wager, 4));
      return new Promise((resolve) => {
        setResolver({
          resolve: () => {
            setView(views.ATTACHING);
            resolve();
          },
        });
      });
    },
  };

  const handleCardsChange = (cards) => {
    setMyCards(cards);
  };

  return (
    <div className="App">
      <div className="topnav">
        <Header
          text2="BlackJack"
          span="Game"
          spanClass="Intro__span"
          class2="Intro__sub"
        />
      </div>

      {view === views.CONNECT_ACCOUNT && (
        <ConnectAccount connect={reachFunctions.connect} />
      )}

      {view === views.DEPLOY_OR_ATTACH && (
        <DeployOrAttach setAsDeployer={reachFunctions.setAsDeployer} />
      )}

      {view === views.SET_WAGER && <SetWager deploy={reachFunctions.deploy} />}

      {(view === views.DEPLOYING || view === views.ATTACHING) && <Loader />}

      {view === views.WAIT_FOR_ATTACHER && (
        <WaitForAttacher contractInfo={contractInfo} />
      )}

      {view === views.PASTE_CONTRACT_INFO && (
        <PasteContractInfo attach={reachFunctions.attach} />
      )}

      {view === views.ACCEPT_WAGER && (
        <AcceptWager
          wager={wager}
          standardUnit={standardUnit}
          accept={resolver.resolve}
          decline={() => setView(views.DEPLOY_OR_ATTACH)}
        />
      )}

      {view === views.SEE_WINNER && <GameOutcomeView outcome={gameOutcome} />}

      {view === views.GAME_PLAY && (
        <GamePlayView
          onCardsChange={handleCardsChange}
          opponentCards={opponentCards}
          isAlice={isAlice}
          canViewAllOpponentCards={canViewAllOpponentCards}
          submitCards={resolver.resolve}
        />
      )}
    </div>
  );
}

export default App;
```

## Discussion

Congratulations on finishing the workshop. You successfully implemented the Blackjack game on the blockchain on your own! 🥳🥳

You can Play this game with your friends. 🧑‍🤝‍🧑🧑‍🤝‍🧑

If you found this workshop rewarding, please let us know on the [Discord community!](https://discord.gg/AZsgcXu).

If you want to know what to do next, you should checkout more [workshops](https://docs.reach.sh/tut/#tuts).

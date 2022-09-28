# RSVP dApp

This workshop will focus on creating a decentralized application for running [RSVP] events (https://en.wikipedia.org/wiki/RSVP).

Ensure you have gone through the [Rock Paper Scissors](https://docs.reach.sh/tut/rps/#tut) tutorial before attempting this.

Create a directory named RSVP `~/reach/RSVP` where you would work in your [reach](https://docs.reach.sh/quickstart/#quickstart) folder.

```bash
$ mkdir -p ~/reach/RSVP && cd ~/reach/RSVP
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


> 1. This RSVP DApp consists of 2 roles:
>    * Alice: Who we know as the **Deployer**, as they are responsible for deploying the contract called the **Host**.
>    * Bob: Who we know as the **Attacher**, as they attach to the contract called the **Guests**.
> 2. Before the day of the event, Alice would set the reservation fee and the timeout limit (deadline) for that particular event.
> 3. And also wants the Guests to tell her if they're coming, so she accpets them o visit the DApp beforehand.
> 4. On the day of the event, the Guests arrives and check-in to get their reservations.


## **Data Definition**

After **Problem Analysis**, we move to **Data Definition** to describe what information our program needs, and how we can represent them in the program.

More details on [data types](https://docs.reach.sh/rsh/compute/#ref-programs-types) are available in Reach.

For our program we should decide:

> - What functions/values does Alice need to start?
> - What functions/values does Bob need to partcipate?
> - What functions/values do the two participants need to do?
> - What functions/values do the two participants need to inform the contract of the value of their decision?

You should look back at your problem analysis to do this step. Whenever a participant starts off knowing something, then it is a field in the `interact` object. If they learn something, then it will be an argument to a function.

You should write your answers in your Reach file (`index.rsh`) as the participant interact interface for each of the participants.

#### **My data definitions**

```javascript
const Player = {
  ...hasRandom,
  seeOutcome: Fun([UInt], Null),
  informTimeout: Fun([], Null),
};

const Alice = Participant('Alice', {
  ...Player,
  eventFee: UInt, // atomic units of currency
  deadline: UInt, // time delta (blocks/rounds)
  approveInvitee: Fun([], UInt),
});

const Bob = Participant('Bob', {
  ...Player,
  acceptEventFee: Fun([UInt], Null),
});
```

#### **Things to note**

> 1. The cost of wager and deadline is represented as UInt ([unsigned integer](https://docs.reach.sh/rsh/compute/#rsh_UInt))
> 2. Guests repeatedly make reservations, before deadline
> 3. The Host repeatedly reports whether Guests come.
> 4. The program ends when all the reserved Guests are accounted for.


## **Communication Construction**

The manner in which participants, including the consensus network, communicate and transmit information is a vital component of a decentralized program.

To write yours, check the sample from the [_Rock, Paper, Scissors!_](https://docs.reach.sh/tut/rps/#tut) tutorial.

#### **Write down the communication pattern for the program as code**

```javascript
Alice.only(() => {
    const eventFee = declassify(interact.eventFee);
    const deadline = declassify(interact.deadline);
  });
  Alice.publish(eventFee, deadline)
    .pay(eventFee);
  commit();

  Bob.only(() => {
    interact.acceptEventFee(eventFee);
  });
  Bob.pay(eventFee)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
  transfer(eventFee).to(Alice);

  var outcome = DRAW;
  invariant(balance() == eventFee && isOutcome(outcome));
  while (outcome == DRAW) {
    commit();

    Alice.only(() => {
      const _handAlice = interact.approveInvitee();
      const approvalStatus = declassify(_handAlice);
    });
    Alice.publish(approvalStatus)
      .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));

    if (approvalStatus === B_WINS) {
      outcome = B_WINS;
      continue;
    }

    if (approvalStatus === A_WINS) {
      outcome = A_WINS;
      continue;
    }

    continue;
  }

  assert(outcome == A_WINS || outcome == B_WINS);
  transfer(eventFee).to(outcome == A_WINS ? Alice : Bob);
  commit();

  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });
});
```

At this point, we are almost ready to complete our program and make it so that we can run it.

## **Interaction Introduction**

Next we need to insert the appropriate calls to interact.

To insert **interact** calls to the frontend into the program, here is what we did:

```javascript
"reach 0.1";

const [isHand, APPROVE, PAPER, DECLINE] = makeEnum(3);
const [isOutcome, B_WINS, DRAW, A_WINS] = makeEnum(3);

const winner = (handAlice, handBob) =>
  ((handAlice + (4 - handBob)) % 3);

assert(winner(APPROVE, PAPER) == B_WINS);
assert(winner(PAPER, APPROVE) == A_WINS);
assert(winner(APPROVE, APPROVE) == DRAW);

forall(UInt, handAlice =>
  forall(UInt, handBob =>
    assert(isOutcome(winner(handAlice, handBob)))));

forall(UInt, (hand) =>
  assert(winner(hand, hand) == DRAW));

const Player = {
  ...hasRandom,
  seeOutcome: Fun([UInt], Null),
  informTimeout: Fun([], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...Player,
    eventFee: UInt, // atomic units of currency
    deadline: UInt, // time delta (blocks/rounds)
    approveInvitee: Fun([], UInt),
  });
  const Bob = Participant('Bob', {
    ...Player,
    acceptEventFee: Fun([UInt], Null),
  });
  init();

  const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
  };

  Alice.only(() => {
    const eventFee = declassify(interact.eventFee);
    const deadline = declassify(interact.deadline);
  });
  Alice.publish(eventFee, deadline)
    .pay(eventFee);
  commit();

  Bob.only(() => {
    interact.acceptEventFee(eventFee);
  });
  Bob.pay(eventFee)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
  transfer(eventFee).to(Alice);

  var outcome = DRAW;
  invariant(balance() == eventFee && isOutcome(outcome));
  while (outcome == DRAW) {
    commit();

    Alice.only(() => {
      const _handAlice = interact.approveInvitee();
      const approvalStatus = declassify(_handAlice);
    });
    Alice.publish(approvalStatus)
      .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));

    if (approvalStatus === B_WINS) {
      outcome = B_WINS;
      continue;
    }

    if (approvalStatus === A_WINS) {
      outcome = A_WINS;
      continue;
    }

    continue;
  }

  assert(outcome == A_WINS || outcome == B_WINS);
  transfer(eventFee).to(outcome == A_WINS ? Alice : Bob);
  commit();

  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });
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

Naturally, we'll need a way to define a function like this:

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

  Bob.pay(eventFee)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
```

## Deployment Decisions

We can write the frontend now that we have a complete contract. Because we will be connecting with an API to play the real Blackjack game, we need use a web frontend framework. It will be [React](https://reactjs.org/docs/getting-started.html) in our situation.

Stop! Incorporate frontend interact calls within the application.


```javascript
import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/render';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
const reach = loadStdlib(process.env);
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
reach.setWalletFallback(reach.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));

const handToInt = {'APPROVE': 0, 'PAPER': 1, 'DECLINE': 2};
const intToOutcome = ['RSVP has been approved', 'Draw!', 'RSVP was declined'];
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultEventFee: '3', standardUnit};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'ConnectAccount', ...defaults};
  }
  async componentDidMount() {
    const acc = await reach.getDefaultAccount();
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    this.setState({acc, bal});
    if (await reach.canFundFromFaucet()) {
      this.setState({view: 'FundAccount'});
    } else {
      this.setState({view: 'DeployerOrAttacher'});
    }
  }
  async fundAccount(fundAmount) {
    await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
    this.setState({view: 'DeployerOrAttacher'});
  }
  async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); }
  selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
  selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
  render() { return renderView(this, AppViews); }
}

class Player extends React.Component {
  random() { return reach.hasRandom.random(); }
  seeOutcome(i) { this.setState({view: 'Done', outcome: intToOutcome[i]}); }
  informTimeout() { this.setState({view: 'Timeout'}); }
  playHand(hand) { this.state.resolveHandP(hand); }
}

class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'SetEventFee'};
  }
  setEventFee(eventFee) { this.setState({view: 'Deploy', eventFee}); }
  async deploy() {
    const ctc = this.props.acc.contract(backend);
    this.setState({view: 'Deploying', ctc});
    this.eventFee = reach.parseCurrency(this.state.eventFee); // UInt
    this.deadline = {ETH: 10, ALGO: 100, CFX: 1000}[reach.connector]; // UInt
    backend.Alice(ctc, this);
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    this.setState({view: 'WaitingForAttacher', ctcInfoStr});
  }

  async approveInvitee() { // Fun([], UInt)
    const hand = await new Promise(resolveHandP => {
      this.setState({view: 'ApproveInvitee', playable: true, resolveHandP});
    });
    this.setState({view: 'WaitingForResults', hand});
    return handToInt[hand];
  }

  render() { return renderView(this, DeployerViews); }
}
class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Attach'};
  }
  attach(ctcInfoStr) {
    const ctc = this.props.acc.contract(backend, JSON.parse(ctcInfoStr));
    this.setState({view: 'Attaching'});
    backend.Bob(ctc, this);
  }
  async acceptEventFee(eventFeeAtomic) { // Fun([UInt], Null)
    const eventFee = reach.formatCurrency(eventFeeAtomic, 4);
    return await new Promise(resolveAcceptedP => {
      this.setState({view: 'AcceptTerms', eventFee, resolveAcceptedP});
    });
  }
  termsAccepted() {
    this.state.resolveAcceptedP();
    this.setState({view: 'WaitingForTurn'});
  }

  render() { return renderView(this, AttacherViews); }
}

renderDOM(<App />);
```

## Discussion

Congratulations on finishing the workshop. You successfully implemented the RSVP DApp on the blockchain on your own! 🥳🥳

If you found this workshop rewarding, please let us know on the [Discord community!](https://discord.gg/AZsgcXu).

If you want to know what to do next, you should checkout more [workshops](https://docs.reach.sh/tut/#tuts).

---
title: 'Wowen, Consensus Modularity in Blockchains for Reliability and Optimization'
excerpt: 'A crowded space'
coverImage: '/assets/blog/covers/wowen_1.jpg'
date: '2023-05-22T00:00:00.000Z'
author:
  name: Emanuele Ragnoli
  picture: '/assets/avatars/emanuele_ragnoli.png'
ogImage:
  url: '/assets/blog/covers/wowen_1.jpg'
tags: ['Press Release', 'Blockchain', 'Wowen']
readTime: '4 min read'
---

## A crowded space

There are a lot of blockchains out there. Some say more than 1000. Some state that the majority of those 1000 are dormant and bear no transaction activities. I have never tried to find some robust data sources to corroborate that. But heuristically, for whoever has been in Crypto, Web3, or in the Blockchain space since the Bitcoin White Paper, it is true that this space has seen a phenomenal number of projects, technologies and creative efforts.

Indeed, over the past decade blockchains have released tokens and campaigns to attract users, developers, and projects, often leading to chain maximalism. While some blockchains have succeeded, others have failed, leaving valuable technological contributions inaccessible.

## Enters modularity

There is a new kid on the block. The rise of modular blockchains marks a significant shift in the blockchain landscape, a new paradigm that can bring enhanced flexibility, scalability, and adaptability. In contrast to monolithic blockchains, modular blockchains separate the primary functions (Data Availability, Consensus, Settlement, and Execution), paving the way for more efficient and customizable systems.

Modularity is not new. In software engineering it is an approach that focuses on dividing systems into smaller, independent modules with clear interfaces and responsibilities. Originating in the 1960s, Edsger W. Dijkstra promoted structured programming for modular code design. The 1970s saw structured programming emerge, followed by object-oriented programming in the 1980s, component-based engineering in the 1990s, service-oriented architecture (SOA) in the 2000s, and microservices in the 2010s, emphasizing modularity and scalability through independent services.

Following the software engineering trajectory, modularity made its way into the blockchain sector in the late 2010s. Since then, numerous brilliant minds in the field have been investigating and crafting various components within the blockchain stack. Fast forward to 2023, and we now witness the emergence of the first fully-fledged modular blockchain networks. The modular blockchain (r)evolution has officially commenced.

We, at RunTime Machines, decided to implement modularity to tackle first the consensus primary function. Why? Because consensus is at the core of blockchain. A consensus protocol dictates almost everything. Scalability, security, transactions costs, as far as adversarial exploitations in coopetition settings.

## Wowen

It takes time to create. It takes humility, hard work, and intelligence to create something new. It takes creativity and a sparkle of craziness to forget what you knew to solve long standing problems.

For about ten years few of us have had the “obsession” of consensus protocols. In our different or common pasts, we tinkered with POW, implemented SCRYPT with GPUs, played with game theory strategies for POS attacks, built p2p consensus-based marketplaces, sheltered in secure old reliables like PBFT and RAFT, coded consensus algorithms as a plug-ins, invented and implemented HybridIOT, engineered the first monolithic Consensus as a Service.

![Wowen team.](/assets/blog/visuals/wowen_1_team.jpg#width-50#max-width-fit)

Six months ago, we set up to achieve a new goal:

_Could we build a modular blockchain network that would achieve transaction verifiability with ensembles of distinct and distributed consensus functions supported by the public blockchain ecosystems?_

Six months later Wowen is born. Wowen Network is a novel public modular blockchain that specializes in the Consensus layer of the modular blockchain stack, addressing its limitations and providing a groundbreaking solution. It is the world’s first decentralized consensus network for modular blockchains.

Wowen separates the Consensus layer from the Data availability layer, and provides consensus modularity. The latter is achieved with the concept of distributed consensus functions, the Wowen Consensus Wrappers (WCWs). WCWs create an intelligent and dynamic system of ensemble algorithms that delegates the consensus to public blockchains. By “_standing on the sholder [sic] of giants_” Wowen interacts with the public ecosystems to achieve transactions verifiability. Developers or end users can select the specific chain from which they want to obtain consensus for their transactions. This flexibility enables them to choose different chains according to the requirements of each smart contract use case. In basic terms: Wowen enables the inclusion of transactions with different consensus mechanisms in the same block, which unlocks unseen customization and efficiency.

![Wowen overview.](/assets/blog/covers/wowen_1.jpg#max-width-fit)

Modularity is achieved mostly in two ways in this iteration of Wowen. Firstly, WCWs and their intelligent orchestration are small independent lightweight interchangeable algorithms cooperating and competing in a soon to come Wowen Consensus Marketplace. Secondly, the public blockchains become consensus systems that interact with the Wowen network.

Wowen will be tested and tried in a Hackathon In Zurich, Switzerland, on the 27th of May 2023. The lite paper with more details and the roadmap for this iteration of Wowen is available at [https://www.wowen.io](https://www.wowen.io/).

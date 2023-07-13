---
title: '🔓 Unleashing robustness and efficiency: RustLang'
excerpt: 'Introducing RustLang'
coverImage: '/assets/blog/covers/rustlang_1.png'
date: '2023-07-13T00:00:00.000Z'
author:
  name: Roberto Ripamonti
  picture: '/assets/avatars/roberto_ripamonti.png'
ogImage:
  url: '/assets/blog/covers/rustlang_1.png'
tags: ['Technical Blog', 'Coding', 'RustLang']
readTime: '3 min read'
---

Are you searching for a programming language that combines performance, safety, and concurrency? Look no further! 🚀 Today, I want to share my excitement about Rust, a language that has been steadily gaining popularity among developers and is revolutionizing the way we build reliable and efficient software. 🌐

## Why such excitement around Rust?

🔐 Safety first, always. Rust enforces strict memory safety and eliminates common programming errors such as null pointer dereferences, buffer overflows, and data races, thanks to its ownership, borrowing, and lifetime concepts.

🚀 Uncompromising performance. Its zero-cost abstractions allow you to write code that is as efficient as low-level languages like C or C++, while its modern tooling and expressive syntax make development a breeze.

✨ Fearless concurrency. By enforcing strict rules around mutable access to shared data, Rust makes it nearly impossible to encounter data races, a notorious source of bugs in concurrent systems.

🌐 Cross-platform compatibility. Rust's focus on portability allows you to write code that can seamlessly run across different platforms and architectures.

🤝 Community and ecosystem. Rust's growing community is vibrant, supportive, and inclusive. The official documentation is comprehensive and beginner-friendly, while the package manager, Cargo, simplifies dependency management and project setup.

Last but not least, as demonstrated in [Energy efficiency across programming languages: how do energy, time, and memory relate?](https://dl.acm.org/doi/10.1145/3136014.3136031) RustLang is in the top three languages for energy efficiency!

![Normalized energy consumption.](/assets/blog/visuals/rustlang_1_energy.png#max-width-fit)

These are the main reasons for the huge excitement around Rust, demonstrated also by the survey conducted by Stack Overflow, where Rust position itself among the more desired and (actually the most) admired programming languages.

[](https://survey.stackoverflow.co/2023/#section-admired-and-desired-programming-scripting-and-markup-languages#max-width-fit)

![Stack Overflow survey.](/assets/blog/visuals/rustlang_1_survey.png)

Embracing Rust opens doors to a world where reliable, performant, and concurrent software becomes the norm. Its safety guarantees, performance optimizations, and thriving community make it a powerful language being suitable for many use cases, such as: embedded systems, distributed systems, system programming, and more. As a fact, even Google, AWS, Meta and Microsoft are joining the Rust Foundation and rewriting the core of their system with this powerful programming language.

## Are you ready to give it a try? Then let's begin with its setup.

The easiest way to install Rust is through _rustup_, the official toolchain multiplexer, enabling the management of Rust toolchain, by making available various tools such as _rustc_ (the compiler), _cargo_ (the package manager), and _rustup_ itself. To get _rustup_, open the terminal and type:

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

not on Unix? checkout the official [website](https://www.rust-lang.org/tools/install) to discover the recommended procedure. If after installation,

rustc --version

fails, it means that you may need to configure the _PATH_ environment variable.

Now you are ready to create your first Rust project!

_P.S. I strongly recommend the use of an IDE such as VsCode, to ease the development journey._ 😉

Stay tuned for the next post regarding RustLang, in which we are going to understand how to use _cargo_ to create our first project.

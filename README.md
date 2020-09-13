<!-- <p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="assets/logo.png" alt="Project logo"></a>
</p> -->

<h3 align="center">Bone lang</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/NessMC/bone.svg)](https://github.com/NessMC/bone/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/NessMC/bone.svg)](https://github.com/NessMC/bone/pulls)
[![License](https://img.shields.io/badge/license-Creative%20commons-blue.svg)](/LICENSE)
[![BCH compliance](https://bettercodehub.com/edge/badge/NessMC/bone?branch=master)](https://bettercodehub.com/)
[![Discord](https://discordapp.com/api/guilds/738827425043185717/widget.png?style=shield)]()
 
</div>

---

<p align="center"> 
    Bone is an interpreted programming language written in Typescript that transforms Bone code into HTML.
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Manual installation](#manual)
-   [Build](#build)
-   [Usage](#usage)
-   [TODO](./TODO.md)
-   [Contributing](./CONTRIBUTING.md)
-   [Authors](#authors)

## 🧐 About <a name = "about"></a>

Bone is a language that is interpreted and translated into HTML. It allows you to write applications with a pleasant syntax and features that HTML doesn't handle.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See
[Manual installation](#manual) for notes on how to install the project on a live
system.

### Prerequisites

To install Bone, you will need:

```
Node.JS > 13
NPM > 6
```

### Installing

---

## 🔧 Running the tests <a name = "tests"></a>

To run the tests:

```
npm run test
```

### Break down into end to end tests

No tests for the moment.

### And coding style tests

The linter is present in order to allow anyone to be able to contribute while
being in the main coherence of the code.

```
npm run lint
```

## 🎈 Usage <a name="usage"></a>

No usage informations for the moment.

## 🚀 Manual installation <a name = "manual"></a>

To deploy Bone, do:

```bash
 $ git clone git@github.com:NessMC/bone.git

 # OR

 $ git init
 $ git remote add origin git@github.com:NessMC/bone.git
 $ git pull

 # OR

 $ docker pull nessmcfr/bone
 $ docker run nessmcfr/bone
```

## 🚀 Build <a name = "build"></a>

To build the project, do:

```bash
$ npm run bundle 
# That generate file called bundle.js, just run it with : node dist/bundle.js

# OR

$ docker-compose build
$ docker run bone_app

```

## ✍️ Authors <a name = "authors"></a>

-   [@NessMC](https://github.com/NessMC) - Idea & Initial work

See also the list of
[contributors](https://github.com/NessMC/bone/contributors) who
participated in this project.

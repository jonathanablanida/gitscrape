# Gitscrape

## What? Never heard of it...
Gitscrape is a command line tool for actively searching and compiling your git commit history, written in javascript and runnning on node.js (Javascript is what the cool kids use now, right??).

## How does this HELP me?
With a little added effort of recording formatted details in your commit messages, you can make it very easy to know what has been added to your project, what has been tested, who did it, what commit it was, when it happened, who shot JFK, and how to make all of your wildest dreams come true.

## How do I INSTALL it?
```
npm install gitscrape
```
OR

Add "gitscrape" to your package.json

OR (for those who like global binaries)

```
npm install -g gitscrape
```

## How do I USE it?

#### Simply follow these special commit message guidelines....

```
{title}
[blank line]
{tag}:
 - {bullet}
 * {bullet}
 1. {bullet}
```

*title* - A summary of the commit. Less than 50 characters.

*tag* - A tag representing a group or category. Good tags could be details, tested, breaks, fixes, etc. I'm sure you will think up some great tags. _Tags should always end with a colon!_

*bullet* - A bullet indicates an item inside a tag. For example, if your tag is "tested", then each bullet will represent an item that was tested. Pretty straightforward stuff.

#### ....And run gitscrape
```
gitscrape TAG
```

..and voila! You are bombarded with tagged items, preceded by the culprit who commit each vile item.

## Narrowing your search

Patience! I'll fill this part out soon.

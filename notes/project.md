I was tempted to use NX to generate monorepo with different apps and libraries, but found the folder structure and scaffolding to extreme for this small project.
Therefore I decided to make my own bespoke configurations, this way I learned how to setup micro frontends in a very simple manner. In the end of the day we just building js which be imported by html.

Of course NX comes with build chains and dependency graphs and cache. But as this is just a small project, with rather small changes, the speed of compiling is less important.

## React setup 

As is started to extract shared code into another library which can be reused by all the frameworks, like moving a card. I noticed that Create React App is not playing nice with alias and paths. It requires either an extra library to change webpack or eject completely. 
After a short trial I found Vite is giving me what I require without any extra dependencies, it is using under the hood rollup which is as well used to build the host app. Which will reduce the node packages.

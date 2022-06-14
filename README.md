# Notes

- I did not implement the post operation. I was planning to have the dance off data be posted when the user clicked on either "play again" or "see scores", but ended up second guessing myself, and thinking that it might not be a bad idea to do it, after we generate the dance pairs.

- I did implement a bit of state management, in order to control the inputs, even though the information is not being persisted across dance offs.

- I was torn between providing app navigation via routing, by replacing the screens. I believe that navigation via routing would be a more robust experience, but due to some time constraints I ended up going with a mix of both routing and replacing components based on state, which I'm not a particular fan of, as I like the user to feel in control of what is happening on the screen, and deterministically changing screens via code conditions, in my opinion is not a good practice.

- The application needs some testing. There are some edge cases that creep up, when the player repeatedly plays.

- There are some parts of the code that could be better abstracted. The buttons and text sections, should be their own components, allowing for a greater uniformity throughout the code base.

- Overall the app is given to a lot of component abstraction, due to the nature of the requirements. While some abstractions were obvious, I nonetheless try not to commit to abstractions too soon, in order to avoid pinning myself into situations, in which these early abstractions could only hamper me later.

- The API calls are missing error handling, and I would've preferred to have added some fallbacks to the components, for when data fails to load, or the app takes a bit longer to respond, via lazy loading. Adding Error boundaries would've also been a nice addition.

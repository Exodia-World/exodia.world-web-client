# UI Design Principles for Non-Designers

If you are a non-designer and you are going to work on UI-related features, please consider the following principles before you start.

## Affordances, Signifiers, Constraints

In short, *affordances* are all possible actions users can perform with an object.
For example, a button can be hovered, focused, clicked, etc.
*Signifiers* expose those affordances. They show what users can do and how they can do it.
On the other hand, *constraints* tell users what they cannot/should not do.
Using a button as an example, its signifiers are shape, colors, and cursor type of the button.
Cultural constraints dictate that a button should be pressed (clicked), and is not usually dragged.
You can also use a physical constraint such as disabling the button to signal that users should not perform an action (it can be argued that we are actually eliminating the affordance).

In our UI review, we should try to identify objects of these types and make sure we use them appropriately.
Some important questions to ask ourselves:
* What are the affordances of these components? Are there unwanted actions that can be performed with them?
* Have I displayed the correct signifiers to encourage actions? Or is there none? Are they clear and unambiguous?
* Have I put proper constraints for this area? Are my users overwhelmed by too many options?

## Natural Mapping

A control and its controlled should be mapped naturally such that they can be easily understood and remembered.
For example, a button to submit a form should be put near the form fields. Natural mappings can be found in metaphors, symbols, and analogies.
Let's say you are choosing an icon for a button. Should you choose a globe, or an arrow? That depends on the action being performed.
Another application of spatial-based mapping is the display of error messages. They should be displayed near where the actions failed. In most cases, the actions are being represented by buttons.

Some important questions to ask ourselves:
* What does this component do? Do I easily understand and remember its relationship to the action?
* Does the performed action logically follows from what I see in this component?
* Can it be that someone from halfway across the world will see the mapping differently? (be careful of cultural differences)

## Feedback

Users should know what is going on inside the system at all times (not everything, only relevant statuses).
We should be generous with feedback, as it helps our users in understanding the results of their actions and navigate through problems they encountered.
Instead of "Internal Server Error," we should try our best to suggest the next correct action to users. The best software is the best communicator.

Some important questions to ask ourselves:
* How can I make results clear and unambiguous to the users?
* Am I hiding some information from the users?
* Have I suggested anything useful to the users in case of failures?

## Conceptual Model

While we may not be aware, users hold many different conceptual models of how our system works in their heads.
The words, phrases, images, and symbols we use in our UI influence how our users understand the whole system. Hence, we should use them with consistency.
The conceptual models held by users don't have to be the correct ones to work fine. When something goes wrong, however, it will lead them to the wrong paths.

Imagine yourself taking the perspective of our users: what are they thinking and learning at various interaction points?

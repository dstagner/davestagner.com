+++
title = "Conway's Aftermath"
keywords = ["tech", "Conway's Law", "Hacker Noon"]
date = "2017-04-16T00:00:00Z"
coverImage = "/img/Prosecutors_office_burned_bishkek.JPG"

+++

Conway’s Law is well known in the software industry. Here it is, in Mel Conway’s own words:

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization’s communication structure.

But in its original formulation, Conway’s Law is only talking about the creation of software. Software, at least successful software, lasts for years, often a decade or even longer. Long enough for the “organization that designs a system” to disappear, replaced by a new organization responsible for maintaining the system.
<!-- more -->

Could Conway’s Law be applicable to maintaining legacy software as well? I propose this formulation:

> The difficulty of maintaining a system is proportional to the difference in structure between the organization that created the system, and the organization that maintains the system.

The life of a software project can go on for many, many years beyond its initial implementation. Legacy software, in maintenance mode, is typically updated as little as possible — often only to deal with major bugs, security flaws, or environmental changes.

### A victim of its own success

Suppose a team is skilled enough and lucky enough to build a successful software system? Something large and complex, that consumes the team for years? Key leaders are promoted, given new challenges, put in charge of new projects. Standout engineers and analysts are poached by other projects, or hired away. Some tired and frustrated team members quit. The team disintegrates.
As team members leave, replacements fill in the gaps. The replacements lack the institutional knowledge of those involved with the design from the start.

The code itself isn’t the problem. Most experienced programmers know they can’t count on understanding code they themselves wrote just months earlier. Good architecture and good test suites go a long way toward readability and maintainability. But to the extent that quality code helps those dealing with the aftermath, it also helped the original development team do better work. The ratios remain the same.

### Organization and reorganization

Conway’s Aftermath has very real implications for the ever popular management practice of reorganization. Every time the organization is reorganized, it creates deeper differences between the organization that built the product, and the one that is now responsible for it.

This is where the avoidable pain starts. Reorgs aren’t usually a result of team maturity, but rather are due to outside forces unrelated to the team or the project — budgets, politics, growth, layoffs.

### So what do we do about it?

I don’t think we can do anything about it. Conway’s Aftermath is an essential condition of software development, as much as Conway’s Law. The only cure seems to be to hold the original team together after the software is complete and functional. This seems both wasteful and unlikely, given the forces mentioned earlier — the urge to promote the heroes, and burnout causing others to abandon the project completely. The best that can be done is to resist the urge to unnecessary reorganization, keeping teams together and stable whenever possible. Management needs to recognize the impact large-scale reorganization has on their company’s ability to deliver and maintain software.

Yeah, we’re screwed.

_This article was originally published at [Hacker Noon](https://hackernoon.com/conways-aftermath-a014749135e3)._

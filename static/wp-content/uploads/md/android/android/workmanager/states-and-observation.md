# Work States

Work goes through a series of `State` changes over its lifetime.

One-time work states
--------------------

For a `one-time` work request, your work begins in an `ENQUEUED` state.

In the `ENQUEUED` state, your work is eligible to run as soon as its `Constraints` and initial delay timing requirements are met. From there it moves to a `RUNNING` state and then depending on the outcome of the work it may move to `SUCCEEDED`, `FAILED`, or possibly back to `ENQUEUED` if the result is `retry`). At any point in the process, work can be cancelled, at which point it will move to the `CANCELLED` state.

Figure 1 illustrates the life of one-time work, with the events that may take it to another state.

![](https://developer.android.com/static/images/topic/libraries/architecture/workmanager/how-to/one-time-work-flow.png)

**Figure 1.** State diagram for one-time work.

`SUCCEEDED`, `FAILED` and `CANCELLED` all represent a terminal state for this work. If your work is in any of these states, `WorkInfo.State.isFinished()`) returns true.

Periodic work states
--------------------

Success and failed states apply only to one-time and chained work. For periodic work, there is only one terminal state, `CANCELLED`. This is because periodic work never ends. After each run, it’s rescheduled, regardless of the result. Figure 2 depicts the condensed state diagram for periodic work.

![](https://developer.android.com/static/images/topic/libraries/architecture/workmanager/how-to/periodic-work-states.png)

**Figure 2.** State diagram for periodic work.

Blocked state
-------------

There is one final state we haven’t mentioned yet, and that is `BLOCKED`. This state applies to work that is orchestrated in a series, or chain of work. Work chains, and their state diagram, are covered in Chaining work.

In Managing work, you’ll learn more about how to manage and monitor the progress of your work.
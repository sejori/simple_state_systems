# Simple Entity-Based Systems

The `System` class provides a mutable `state` and `input` and `output` function records.

## State

A user-defined object that describes the state of the system, e.g. temp, light, plants. 


## Input and output functions

Input functions are triggered by external application logic, they take existing `state` as arg and must return an updated `state` object.

Output functions take `state` as argument and implement conditional logic to trigger external application logic. This is basic state-feedback control.

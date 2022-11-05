# Simple Entity-Based Systems

The `System` class provides a mutable `state`, holds `Entity` objects and `input` and `output` functions.

Input functions are triggered by external application logic and must return an updated `state` object.

Output functions take `state` as argument and implement conditional logic to trigger external application logic.

import { assert } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import System from "./System.ts";

class Plant {
  constructor(public name: string, public preferredTemp: number) {}
}

Deno.test("System", (t) => {
  type state = {
    plants: Plant[],
    temperature: number
  } 

  const tempSetter = (temp: number) => ({ temperature: temp })
  const heaterActivator = (state: state) => state.temperature < Math.min(state.plants.map(plant => plant.preferredTemp))
    ? "activating heater"
    : "not activation heater"

  const plantBed = new System({
    plants: [
      new Plant("tomato", 27),
      new Plant("potato", 22),
      new Plant("olive", 28)
    ],
    temperature: 19
  }, {
    temperature: tempSetter
  }, {
    activateHeater: heaterActivator
  });

  t.step("Initialized with state and inputs/outputs correctly", () => {
    assert(plantBed.state.plants[2].name === "olive")
    assert(plantBed.state.temperature === 19)
    assert(plantBed.inputs["setTemperature"] === tempSetter)
    assert(plantBed.outputs["activateHeater"] === heaterActivator)
  })

  t.step("Inputs update state and trigger outputs", async () => {
    plantBed.outputs["state returner"] = (state) => state
    const inputResult = await plantBed.input()

    assert(inputResult.length === 2)
    assert(inputResult[0] === "activating heater")

    const secondInputResult = await plantBed.input("temperature", 22)
    assert(secondInputResult[0] === "not activating header")
    assert(secondInputResult[1].temperature === 22)
  })
})


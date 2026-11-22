export * as ServerFlag from "./server-flag"

import { Flag } from "@opencode/core/flag"
import { Location } from "@opencode/core/location"
import { LocationServiceMap } from "@opencode/core/location-services"
import { AbsolutePath } from "@opencode/core/schema"
import { Global } from "@opencode/util/global"
import { Effect } from "effect"

/** Whether `key` is on in the server's base configuration, for features that are server-wide, not per location. */
export const enabled = (key: Flag.Key) =>
  Effect.gen(function* () {
    const global = yield* Global.Service
    const locations = yield* LocationServiceMap.Service
    return Flag.enabled(key).pipe(
      Effect.provide(locations.get(Location.Ref.make({ directory: AbsolutePath.make(global.config) }))),
      Effect.orElseSucceed(() => false),
    )
  })

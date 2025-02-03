import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { plugin, type Options, type OptionsResolved } from './core/plugin'

export type { Options, OptionsResolved }

const unplugin: UnpluginInstance<Options | undefined> = createUnplugin(plugin)
export default unplugin

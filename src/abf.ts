import { I_accessor, Storage } from './storage'
import { I_vnode, patch } from './superfine'

/** A Bit Fine */
export
async function ABF<T>(root: HTMLElement, accessor: I_accessor<T>, renderer: (data: T) => I_vnode) {
	const storage = new Storage(accessor)
	storage.subscribe((data: T) => {
		patch(root, renderer(data))
	})
	await storage.trigger()
	return storage
}

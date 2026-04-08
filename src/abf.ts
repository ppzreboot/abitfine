import { I_accessor, Storage } from './storage'
import { I_vnode, patch } from './superfine'

/** A Bit Fine */
export
function ABF<T>(roort: HTMLElement, accessor: I_accessor<T>, renderer: (data: T) => I_vnode) {
	const storage = new Storage(accessor)
	storage.subscribe((data: T) => {
		patch(roort, renderer(data))
	})
	storage.trigger()
	return storage
}

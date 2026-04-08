import {
	h as _h,
	text as _text,
	patch as _patch,
} from 'superfine'

declare const _unique_symbol: unique symbol
export
type I_vnode = {
	[_unique_symbol]: void
}

type I_h = (tag: string, props: object, children: I_vnode[]) => I_vnode
export
const h: I_h = _h

type I_text = (text: string) => I_vnode
export
const text: I_text = _text

type I_patch = (dom: HTMLElement, vnode: I_vnode) => void
export
const patch: I_patch = _patch

export
interface I_accessor<T> {
	get(): Promise<T>
	set(data: T): Promise<void>
}

export
class Storage<T> {
	private lock = false
	private subscriber_list: ((data: T) => void)[] = []

	constructor(
		private readonly accessor: I_accessor<T>,
	) {
	}

	async get() {
		if (this.lock)
			throw new Error('Storage is locked')
		this.lock = true
		try {
			return await this.accessor.get()
		} finally {
			this.lock = false
		}
	}
	async set(data: T) {
		if (this.lock)
			throw new Error('Storage is locked')
		this.lock = true
		try {
			await this.accessor.set(data)
			this.subscriber_list.forEach(callback => callback(data))
		} finally {
			this.lock = false
		}
	}

	subscribe(callback: (data: T) => void) {
		this.subscriber_list.push(callback)
		return () => {
			const index = this.subscriber_list.indexOf(callback)
			if (index === -1)
				throw new Error('Subscriber not found')
			this.subscriber_list.splice(index, 1)
		}
	}

	async trigger() {
		const data = await this.get()
		this.subscriber_list.forEach(callback => callback(data))
	}
}

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

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
			this.subscriber_list.splice(
				this.subscriber_list.indexOf(callback),
				1,
			)
		}
	}

	async trigger() {
		const data = await this.get()
		this.subscriber_list.forEach(callback => callback(data))
	}
}

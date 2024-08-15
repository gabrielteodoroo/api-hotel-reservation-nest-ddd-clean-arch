export default class Money {
	private constructor(readonly value: number) {
		this.value = value
	}

	static create(value: number) {
		return new Money(value)
	}

	formattedPriceBRL() {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(this.value / 100)
	}
}

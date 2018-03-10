class CodePoint {
	// code: Integer value
	constructor(code) {
		this.code = code;
	}

	toString(prefix=false) {
		var str = this.code.toString(16);
		while (str.length < 4) {
			str = "0" + str;
		}
		if (prefix === true) str = "U+" + str;
		return str.toUpperCase();
	}

	toCharacter() {
		// Use String.fromCodePoint.
		if (0 <= this.code && this.code <= 0x1f)
			return String.fromCodePoint(0xFFFD);
		return String.fromCodePoint(this.code);
	}

	// Return previous CodePoint instance.
	previous() {
		if (this.code <= 0)
			return this
		return new CodePoint(this.code - 1)
	}

	// Return next CodePoint instance.
	next() {
		if (this.code >= 0x10FFFF)
			return this
		return new CodePoint(this.code + 1)
	}

	static fromString(str, prefix=false) {
		if (prefix === true) str = str.substr(2);
		return new CodePoint(parseInt(str, 16));
	}
}

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}
Number.prototype.loop = function(min, max) {
	// debugger
	if (this==max) {
		return min
	}
	let diff = max-min
	let start = this
	while (min>start || start>max) {
		if (!min<start) {
			start -= diff
		} else if (!start<max) {
			start += diff
		}
	}
	return start
}
console.vec = function(vec) {
	this.log(vec.xy())
}
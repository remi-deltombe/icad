
var abs = window.Math.abs
var max = window.Math.max
var min = window.Math.min
var pow = window.Math.pow
var round = window.Math.round
var floor = window.Math.floor
var ceil = window.Math.ceil
var minmax = (v, m, M) => min(M, max(m, v))
var delay = (f, t=1) => setTimeout(f, t)
var map = (v, ff,ft,tf,tt) => {
    var df = (ft-ff)
    var dt = (tt-tf)
    if(Array.isArray(v))
        return v.map(v=>((v-ff) / df) * dt + tf)
    else
        return ((v-ff) / df) * dt + tf
}
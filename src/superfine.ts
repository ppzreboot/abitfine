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

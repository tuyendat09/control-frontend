import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

/**
 * GSAP setup + the named curves from the motion spec. Import `gsap` / `useGSAP` from here
 * (never from the packages directly) so plugins and eases are always registered.
 */
gsap.registerPlugin(useGSAP, CustomEase)

CustomEase.create('soft', '.2,.8,.2,1') // panes, sheets, presses
CustomEase.create('expo', '.22,1,.36,1') // auth, scan: long glide
CustomEase.create('spring', '.34,1.56,.64,1') // tab icons, lock
CustomEase.create('springHard', '.34,1.6,.64,1') // set tick
CustomEase.create('springSoft', '.32,1.4,.5,1') // segmented
CustomEase.create('plus', '.34,1.4,.64,1') // "+" rotation
CustomEase.create('draw', '.2,.85,.3,1') // ring, bars
CustomEase.create('sweep', '.45,0,.55,1') // scan line
CustomEase.create('drift', '.4,0,.4,1') // auth blob

const query = window.matchMedia('(prefers-reduced-motion: reduce)')

/** True when the OS asks for reduced motion — loops must not start. */
export const reducedMotion = () => query.matches

// One-shot tweens finish near-instantly under reduced motion.
const sync = () => gsap.globalTimeline.timeScale(query.matches ? 50 : 1)
sync()
query.addEventListener('change', sync)

export { gsap, useGSAP }

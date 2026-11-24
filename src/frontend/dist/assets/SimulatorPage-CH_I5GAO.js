import { c as useComposedRefs, d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { c as composeEventHandlers, i as useControllableState, s as createContextScope, t as Primitive } from "./dist-D8c95m3S.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { n as ChartPie, t as Gauge } from "./gauge-CkvVKm1l.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { t as TrendingUp } from "./trending-up-mHIadLz6.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { At as useSize, It as useDirection, Lt as createCollection, dt as Link } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { o as formatDollars, s as formatNumber } from "./format-9V_VuN1H.js";
import { t as clamp } from "./dist-B95XG0K8.js";
import { t as usePrevious } from "./dist-DgJK4kho.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CalendarClock = createLucideIcon("calendar-clock", [
	["path", {
		d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
		key: "1osxxc"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M3 10h5",
		key: "r794hk"
	}],
	["path", {
		d: "M17.5 17.5 16 16.3V14",
		key: "akvzfd"
	}],
	["circle", {
		cx: "16",
		cy: "16",
		r: "6",
		key: "qoo3c4"
	}]
]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-slider@1.3.6_@types+react-dom@19.1.11_@types+react@19.1.17__@types+reac_33bf42785ddcf111b996c6452d345be7/node_modules/@radix-ui/react-slider/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var BACK_KEYS = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
};
var SLIDER_NAME = "Slider";
var [Collection, useCollection, createCollectionScope] = createCollection(SLIDER_NAME);
var [createSliderContext, createSliderScope] = createContextScope(SLIDER_NAME, [createCollectionScope]);
var [SliderProvider, useSliderContext] = createSliderContext(SLIDER_NAME);
var Slider$1 = import_react.forwardRef((props, forwardedRef) => {
	const { name, min = 0, max = 100, step = 1, orientation = "horizontal", disabled = false, minStepsBetweenThumbs = 0, defaultValue = [min], value, onValueChange = () => {}, onValueCommit = () => {}, inverted = false, form, ...sliderProps } = props;
	const thumbRefs = import_react.useRef(/* @__PURE__ */ new Set());
	const valueIndexToChangeRef = import_react.useRef(0);
	const SliderOrientation = orientation === "horizontal" ? SliderHorizontal : SliderVertical;
	const [values = [], setValues] = useControllableState({
		prop: value,
		defaultProp: defaultValue,
		onChange: (value2) => {
			[...thumbRefs.current][valueIndexToChangeRef.current]?.focus();
			onValueChange(value2);
		}
	});
	const valuesBeforeSlideStartRef = import_react.useRef(values);
	function handleSlideStart(value2) {
		updateValues(value2, getClosestValueIndex(values, value2));
	}
	function handleSlideMove(value2) {
		updateValues(value2, valueIndexToChangeRef.current);
	}
	function handleSlideEnd() {
		const prevValue = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
		if (values[valueIndexToChangeRef.current] !== prevValue) onValueCommit(values);
	}
	function updateValues(value2, atIndex, { commit } = { commit: false }) {
		const decimalCount = getDecimalCount(step);
		const snapToStep = roundValue(Math.round((value2 - min) / step) * step + min, decimalCount);
		const nextValue = clamp(snapToStep, [min, max]);
		setValues((prevValues = []) => {
			const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
			if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
				valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
				const hasChanged = String(nextValues) !== String(prevValues);
				if (hasChanged && commit) onValueCommit(nextValues);
				return hasChanged ? nextValues : prevValues;
			} else return prevValues;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderProvider, {
		scope: props.__scopeSlider,
		name,
		disabled,
		min,
		max,
		valueIndexToChangeRef,
		thumbs: thumbRefs.current,
		values,
		orientation,
		form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
			scope: props.__scopeSlider,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeSlider,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientation, {
					"aria-disabled": disabled,
					"data-disabled": disabled ? "" : void 0,
					...sliderProps,
					ref: forwardedRef,
					onPointerDown: composeEventHandlers(sliderProps.onPointerDown, () => {
						if (!disabled) valuesBeforeSlideStartRef.current = values;
					}),
					min,
					max,
					inverted,
					onSlideStart: disabled ? void 0 : handleSlideStart,
					onSlideMove: disabled ? void 0 : handleSlideMove,
					onSlideEnd: disabled ? void 0 : handleSlideEnd,
					onHomeKeyDown: () => !disabled && updateValues(min, 0, { commit: true }),
					onEndKeyDown: () => !disabled && updateValues(max, values.length - 1, { commit: true }),
					onStepKeyDown: ({ event, direction: stepDirection }) => {
						if (!disabled) {
							const multiplier = PAGE_KEYS.includes(event.key) || event.shiftKey && ARROW_KEYS.includes(event.key) ? 10 : 1;
							const atIndex = valueIndexToChangeRef.current;
							const value2 = values[atIndex];
							updateValues(value2 + step * multiplier * stepDirection, atIndex, { commit: true });
						}
					}
				})
			})
		})
	});
});
Slider$1.displayName = SLIDER_NAME;
var [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext(SLIDER_NAME, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
});
var SliderHorizontal = import_react.forwardRef((props, forwardedRef) => {
	const { min, max, dir, inverted, onSlideStart, onSlideMove, onSlideEnd, onStepKeyDown, ...sliderProps } = props;
	const [slider, setSlider] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setSlider(node));
	const rectRef = import_react.useRef(void 0);
	const direction = useDirection(dir);
	const isDirectionLTR = direction === "ltr";
	const isSlidingFromLeft = isDirectionLTR && !inverted || !isDirectionLTR && inverted;
	function getValueFromPointer(pointerPosition) {
		const rect = rectRef.current || slider.getBoundingClientRect();
		const value = linearScale([0, rect.width], isSlidingFromLeft ? [min, max] : [max, min]);
		rectRef.current = rect;
		return value(pointerPosition - rect.left);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientationProvider, {
		scope: props.__scopeSlider,
		startEdge: isSlidingFromLeft ? "left" : "right",
		endEdge: isSlidingFromLeft ? "right" : "left",
		direction: isSlidingFromLeft ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderImpl, {
			dir: direction,
			"data-orientation": "horizontal",
			...sliderProps,
			ref: composedRefs,
			style: {
				...sliderProps.style,
				["--radix-slider-thumb-transform"]: "translateX(-50%)"
			},
			onSlideStart: (event) => {
				const value = getValueFromPointer(event.clientX);
				onSlideStart?.(value);
			},
			onSlideMove: (event) => {
				const value = getValueFromPointer(event.clientX);
				onSlideMove?.(value);
			},
			onSlideEnd: () => {
				rectRef.current = void 0;
				onSlideEnd?.();
			},
			onStepKeyDown: (event) => {
				const isBackKey = BACK_KEYS[isSlidingFromLeft ? "from-left" : "from-right"].includes(event.key);
				onStepKeyDown?.({
					event,
					direction: isBackKey ? -1 : 1
				});
			}
		})
	});
});
var SliderVertical = import_react.forwardRef((props, forwardedRef) => {
	const { min, max, inverted, onSlideStart, onSlideMove, onSlideEnd, onStepKeyDown, ...sliderProps } = props;
	const sliderRef = import_react.useRef(null);
	const ref = useComposedRefs(forwardedRef, sliderRef);
	const rectRef = import_react.useRef(void 0);
	const isSlidingFromBottom = !inverted;
	function getValueFromPointer(pointerPosition) {
		const rect = rectRef.current || sliderRef.current.getBoundingClientRect();
		const value = linearScale([0, rect.height], isSlidingFromBottom ? [max, min] : [min, max]);
		rectRef.current = rect;
		return value(pointerPosition - rect.top);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientationProvider, {
		scope: props.__scopeSlider,
		startEdge: isSlidingFromBottom ? "bottom" : "top",
		endEdge: isSlidingFromBottom ? "top" : "bottom",
		size: "height",
		direction: isSlidingFromBottom ? 1 : -1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderImpl, {
			"data-orientation": "vertical",
			...sliderProps,
			ref,
			style: {
				...sliderProps.style,
				["--radix-slider-thumb-transform"]: "translateY(50%)"
			},
			onSlideStart: (event) => {
				const value = getValueFromPointer(event.clientY);
				onSlideStart?.(value);
			},
			onSlideMove: (event) => {
				const value = getValueFromPointer(event.clientY);
				onSlideMove?.(value);
			},
			onSlideEnd: () => {
				rectRef.current = void 0;
				onSlideEnd?.();
			},
			onStepKeyDown: (event) => {
				const isBackKey = BACK_KEYS[isSlidingFromBottom ? "from-bottom" : "from-top"].includes(event.key);
				onStepKeyDown?.({
					event,
					direction: isBackKey ? -1 : 1
				});
			}
		})
	});
});
var SliderImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, onSlideStart, onSlideMove, onSlideEnd, onHomeKeyDown, onEndKeyDown, onStepKeyDown, ...sliderProps } = props;
	const context = useSliderContext(SLIDER_NAME, __scopeSlider);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...sliderProps,
		ref: forwardedRef,
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			if (event.key === "Home") {
				onHomeKeyDown(event);
				event.preventDefault();
			} else if (event.key === "End") {
				onEndKeyDown(event);
				event.preventDefault();
			} else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
				onStepKeyDown(event);
				event.preventDefault();
			}
		}),
		onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
			const target = event.target;
			target.setPointerCapture(event.pointerId);
			event.preventDefault();
			if (context.thumbs.has(target)) target.focus();
			else onSlideStart(event);
		}),
		onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
			if (event.target.hasPointerCapture(event.pointerId)) onSlideMove(event);
		}),
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			const target = event.target;
			if (target.hasPointerCapture(event.pointerId)) {
				target.releasePointerCapture(event.pointerId);
				onSlideEnd(event);
			}
		})
	});
});
var TRACK_NAME = "SliderTrack";
var SliderTrack = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, ...trackProps } = props;
	const context = useSliderContext(TRACK_NAME, __scopeSlider);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-disabled": context.disabled ? "" : void 0,
		"data-orientation": context.orientation,
		...trackProps,
		ref: forwardedRef
	});
});
SliderTrack.displayName = TRACK_NAME;
var RANGE_NAME = "SliderRange";
var SliderRange = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, ...rangeProps } = props;
	const context = useSliderContext(RANGE_NAME, __scopeSlider);
	const orientation = useSliderOrientationContext(RANGE_NAME, __scopeSlider);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const valuesCount = context.values.length;
	const percentages = context.values.map((value) => convertValueToPercentage(value, context.min, context.max));
	const offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0;
	const offsetEnd = 100 - Math.max(...percentages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-orientation": context.orientation,
		"data-disabled": context.disabled ? "" : void 0,
		...rangeProps,
		ref: composedRefs,
		style: {
			...props.style,
			[orientation.startEdge]: offsetStart + "%",
			[orientation.endEdge]: offsetEnd + "%"
		}
	});
});
SliderRange.displayName = RANGE_NAME;
var THUMB_NAME = "SliderThumb";
var SliderThumb = import_react.forwardRef((props, forwardedRef) => {
	const getItems = useCollection(props.__scopeSlider);
	const [thumb, setThumb] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
	const index = import_react.useMemo(() => thumb ? getItems().findIndex((item) => item.ref.current === thumb) : -1, [getItems, thumb]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumbImpl, {
		...props,
		ref: composedRefs,
		index
	});
});
var SliderThumbImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, index, name, ...thumbProps } = props;
	const context = useSliderContext(THUMB_NAME, __scopeSlider);
	const orientation = useSliderOrientationContext(THUMB_NAME, __scopeSlider);
	const [thumb, setThumb] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
	const isFormControl = thumb ? context.form || !!thumb.closest("form") : true;
	const size = useSize(thumb);
	const value = context.values[index];
	const percent = value === void 0 ? 0 : convertValueToPercentage(value, context.min, context.max);
	const label = getLabel(index, context.values.length);
	const orientationSize = size?.[orientation.size];
	const thumbInBoundsOffset = orientationSize ? getThumbInBoundsOffset(orientationSize, percent, orientation.direction) : 0;
	import_react.useEffect(() => {
		if (thumb) {
			context.thumbs.add(thumb);
			return () => {
				context.thumbs.delete(thumb);
			};
		}
	}, [thumb, context.thumbs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[orientation.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
			scope: props.__scopeSlider,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
				role: "slider",
				"aria-label": props["aria-label"] || label,
				"aria-valuemin": context.min,
				"aria-valuenow": value,
				"aria-valuemax": context.max,
				"aria-orientation": context.orientation,
				"data-orientation": context.orientation,
				"data-disabled": context.disabled ? "" : void 0,
				tabIndex: context.disabled ? void 0 : 0,
				...thumbProps,
				ref: composedRefs,
				style: value === void 0 ? { display: "none" } : props.style,
				onFocus: composeEventHandlers(props.onFocus, () => {
					context.valueIndexToChangeRef.current = index;
				})
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderBubbleInput, {
			name: name ?? (context.name ? context.name + (context.values.length > 1 ? "[]" : "") : void 0),
			form: context.form,
			value
		}, index)]
	});
});
SliderThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var SliderBubbleInput = import_react.forwardRef(({ __scopeSlider, value, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevValue = usePrevious(value);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setValue = Object.getOwnPropertyDescriptor(inputProto, "value").set;
		if (prevValue !== value && setValue) {
			const event = new Event("input", { bubbles: true });
			setValue.call(input, value);
			input.dispatchEvent(event);
		}
	}, [prevValue, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		style: { display: "none" },
		...props,
		ref: composedRefs,
		defaultValue: value
	});
});
SliderBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
	const nextValues = [...prevValues];
	nextValues[atIndex] = nextValue;
	return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
	const percentage = 100 / (max - min) * (value - min);
	return clamp(percentage, [0, 100]);
}
function getLabel(index, totalValues) {
	if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
	else if (totalValues === 2) return ["Minimum", "Maximum"][index];
	else return;
}
function getClosestValueIndex(values, nextValue) {
	if (values.length === 1) return 0;
	const distances = values.map((value) => Math.abs(value - nextValue));
	const closestDistance = Math.min(...distances);
	return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
	const halfWidth = width / 2;
	return (halfWidth - linearScale([0, 50], [0, halfWidth])(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
	return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
	if (minStepsBetweenValues > 0) {
		const stepsBetweenValues = getStepsBetweenValues(values);
		return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
	}
	return true;
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function getDecimalCount(value) {
	return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
	const rounder = Math.pow(10, decimalCount);
	return Math.round(value * rounder) / rounder;
}
var Root = Slider$1;
var Track = SliderTrack;
var Range = SliderRange;
var Thumb = SliderThumb;
//#endregion
//#region src/components/ui/slider.tsx
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
	const _values = import_react.useMemo(() => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max], [
		value,
		defaultValue,
		min,
		max
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		"data-slot": "slider",
		defaultValue,
		value,
		min,
		max,
		className: cn("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
			"data-slot": "slider-track",
			className: cn("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
				"data-slot": "slider-range",
				className: cn("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
			})
		}), Array.from({ length: _values.length }, (value, _) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			"data-slot": "slider-thumb",
			className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
		}, `${value}`))]
	});
}
//#endregion
//#region src/pages/SimulatorPage.tsx
var SCENARIOS = [
	{
		id: "cafe",
		name: "Neighbourhood cafe",
		blurb: "Steady foot traffic, loyal regulars, gentle growth.",
		icon: Store,
		customers: 420,
		avgSpend: 14,
		roundUpRate: 55,
		growthRate: 3,
		goal: 25e3
	},
	{
		id: "retailer",
		name: "Local retailer",
		blurb: "Higher basket sizes, moderate round-up participation.",
		icon: Wallet,
		customers: 1150,
		avgSpend: 48,
		roundUpRate: 40,
		growthRate: 5,
		goal: 75e3
	},
	{
		id: "online",
		name: "Growing online brand",
		blurb: "Large audience, fast compounding, ambitious target.",
		icon: TrendingUp,
		customers: 8400,
		avgSpend: 32,
		roundUpRate: 62,
		growthRate: 12,
		goal: 25e4
	}
];
var OWNERSHIP_POOL_BPS = 1800;
var VALUATION_MULTIPLE = 4;
var DEFAULT_CONTROLS = {
	customers: SCENARIOS[0].customers,
	avgSpend: SCENARIOS[0].avgSpend,
	roundUpRate: SCENARIOS[0].roundUpRate,
	growthRate: SCENARIOS[0].growthRate,
	goal: SCENARIOS[0].goal
};
function projectCapital(controls, months) {
	const monthlyBase = controls.customers * controls.avgSpend * (controls.roundUpRate / 100) * .5;
	const monthlyGrowth = controls.growthRate / 100;
	let total = 0;
	for (let m = 0; m < months; m += 1) total += monthlyBase * (1 + monthlyGrowth) ** m;
	return total;
}
function monthsToGoal(controls) {
	const monthlyBase = controls.customers * controls.avgSpend * (controls.roundUpRate / 100) * .5;
	if (monthlyBase <= 0) return null;
	const monthlyGrowth = controls.growthRate / 100;
	let total = 0;
	for (let m = 1; m <= 240; m += 1) {
		total += monthlyBase * (1 + monthlyGrowth) ** (m - 1);
		if (total >= controls.goal) return m;
	}
	return null;
}
function SliderRow({ id, label, icon: Icon, value, display, min, max, step, onChange, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": `simulator.control.${id}`,
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: `sim-${id}`,
					className: "flex items-center gap-2 text-sm font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						"aria-hidden": "true",
						className: "size-4 text-primary"
					}), label]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-numeric text-sm font-semibold tabular-nums text-accent",
					children: display
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				id: `sim-${id}`,
				"aria-label": label,
				value: [value],
				min,
				max,
				step,
				onValueChange: (next) => onChange(next[0] ?? value),
				className: "[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-primary [&_[data-slot=slider-range]]:to-accent"
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function FigureCard({ label, value, hint, icon: Icon, tone, ocid }) {
	const toneText = {
		emerald: "text-primary",
		cyan: "text-accent",
		violet: "text-chart-3",
		gold: "text-warning"
	}[tone];
	const toneRing = {
		emerald: "border-primary/30",
		cyan: "border-accent/30",
		violet: "border-chart-3/30",
		gold: "border-warning/30"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": ocid,
		className: cn("relative overflow-hidden rounded-2xl border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-0.5", toneRing),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					className: cn("size-4 shrink-0", toneText)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-numeric text-2xl font-semibold tracking-tight md:text-3xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted-foreground",
				children: hint
			})
		]
	});
}
function SimulatorPage() {
	const [controls, setControls] = (0, import_react.useState)(DEFAULT_CONTROLS);
	const [activeScenario, setActiveScenario] = (0, import_react.useState)("cafe");
	const update = (key, value) => {
		setControls((prev) => ({
			...prev,
			[key]: value
		}));
		setActiveScenario(null);
	};
	const applyScenario = (scenario) => {
		setControls({
			customers: scenario.customers,
			avgSpend: scenario.avgSpend,
			roundUpRate: scenario.roundUpRate,
			growthRate: scenario.growthRate,
			goal: scenario.goal
		});
		setActiveScenario(scenario.id);
	};
	const projection = (0, import_react.useMemo)(() => {
		const months = monthsToGoal(controls);
		const capitalRaised = projectCapital(controls, months ?? 36);
		const ownershipGranted = Math.min(capitalRaised / Math.max(controls.goal, 1) * OWNERSHIP_POOL_BPS, OWNERSHIP_POOL_BPS);
		return {
			months,
			capitalRaised,
			ownershipGranted,
			dilutionPct: ownershipGranted / 100,
			portfolioValue: controls.customers * controls.avgSpend * 12 * (1 + controls.growthRate / 100) * VALUATION_MULTIPLE
		};
	}, [controls]);
	const goalProgress = Math.min(projection.capitalRaised / Math.max(controls.goal, 1) * 100, 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Capital-raising simulator",
				title: "Model your raise",
				description: "Move the levers of a round-up ownership program and watch projected capital, ownership and value respond in real time. Every figure is a simulation."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-ocid": "simulator.panel.controls",
					"aria-labelledby": "sim-controls-title",
					className: "rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
							"aria-hidden": "true",
							className: "size-5 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "sim-controls-title",
							className: "text-lg font-semibold",
							children: "Program levers"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
								id: "customers",
								label: "Customers",
								icon: Users,
								value: controls.customers,
								display: formatNumber(controls.customers),
								min: 50,
								max: 2e4,
								step: 50,
								onChange: (v) => update("customers", v),
								hint: "Active customers participating in round-ups each month."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
								id: "spend",
								label: "Average spend",
								icon: Coins,
								value: controls.avgSpend,
								display: formatDollars(controls.avgSpend),
								min: 5,
								max: 200,
								step: 1,
								onChange: (v) => update("avgSpend", v),
								hint: "Typical transaction size per customer visit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
								id: "roundup",
								label: "Round-up rate",
								icon: ChartPie,
								value: controls.roundUpRate,
								display: `${controls.roundUpRate}%`,
								min: 5,
								max: 100,
								step: 1,
								onChange: (v) => update("roundUpRate", v),
								hint: "Share of customers who round up their purchase."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
								id: "growth",
								label: "Monthly growth",
								icon: TrendingUp,
								value: controls.growthRate,
								display: `${controls.growthRate}%`,
								min: 0,
								max: 25,
								step: 1,
								onChange: (v) => update("growthRate", v),
								hint: "Compounding month-over-month customer growth."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
								id: "goal",
								label: "Funding goal",
								icon: Wallet,
								value: controls.goal,
								display: formatDollars(controls.goal),
								min: 1e4,
								max: 5e5,
								step: 5e3,
								onChange: (v) => update("goal", v),
								hint: "Target capital to raise from round-up owners."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-ocid": "simulator.panel.projection",
					"aria-labelledby": "sim-projection-title",
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-primary/25 bg-gradient-subtle p-6 shadow-glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										"aria-hidden": "true",
										className: "size-5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										id: "sim-projection-title",
										className: "text-lg font-semibold",
										children: "Live projection"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-warning/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-warning",
									children: "Simulated"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureCard, {
										ocid: "simulator.figure.capital",
										label: "Projected capital raised",
										value: formatDollars(projection.capitalRaised),
										hint: "Total round-up contributions accumulated over the horizon.",
										icon: Coins,
										tone: "emerald"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureCard, {
										ocid: "simulator.figure.ownership",
										label: "Projected ownership granted",
										value: `${projection.ownershipGranted.toFixed(1)}%`,
										hint: "Share of the business issued to round-up owners.",
										icon: ChartPie,
										tone: "cyan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureCard, {
										ocid: "simulator.figure.dilution",
										label: "Ownership dilution",
										value: `${projection.dilutionPct.toFixed(1)}%`,
										hint: "Founder stake reduced by the ownership pool issued.",
										icon: Gauge,
										tone: "violet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureCard, {
										ocid: "simulator.figure.value",
										label: "Hypothetical portfolio value",
										value: formatDollars(projection.portfolioValue),
										hint: "Illustrative value at a 4× annual revenue multiple.",
										icon: TrendingUp,
										tone: "gold"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-xl border border-border bg-background/40 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2 text-sm font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
												"aria-hidden": "true",
												className: "size-4 text-accent"
											}), "Months to reach goal"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-ocid": "simulator.figure.timeline",
											className: "font-numeric text-lg font-semibold tabular-nums text-accent",
											children: projection.months ? `${projection.months} mo` : "Beyond 20 yr"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-2 overflow-hidden rounded-full bg-muted",
										role: "progressbar",
										tabIndex: 0,
										"aria-valuenow": Math.round(goalProgress),
										"aria-valuemin": 0,
										"aria-valuemax": 100,
										"aria-label": "Progress toward funding goal",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-cinematic",
											style: { width: `${goalProgress}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [
											formatDollars(projection.capitalRaised),
											" of",
											" ",
											formatDollars(controls.goal),
											" goal · ",
											goalProgress.toFixed(0),
											"% reached"
										]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-xs leading-relaxed text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-warning",
								children: "Not an offer."
							}),
							" ",
							"These projections are a simulation for illustration only. They are not an offer of securities, an investment recommendation, or a promise of returns."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "simulator.section.presets",
				"aria-labelledby": "sim-presets-title",
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						"aria-hidden": "true",
						className: "size-5 text-warning"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "sim-presets-title",
						className: "text-lg font-semibold",
						children: "Preset scenarios"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: SCENARIOS.map((scenario) => {
						const Icon = scenario.icon;
						const isActive = activeScenario === scenario.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-ocid": `simulator.preset.${scenario.id}`,
							onClick: () => applyScenario(scenario),
							"aria-pressed": isActive,
							className: cn("group rounded-2xl border p-5 text-left transition-smooth ease-cinematic hover:-translate-y-0.5 hover:border-primary/50", isActive ? "border-primary/60 bg-primary/10 shadow-glow" : "border-border bg-card/70 hover:bg-card"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											"aria-hidden": "true",
											className: "size-5"
										})
									}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary",
										children: "Active"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-base font-semibold",
									children: scenario.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted-foreground",
									children: scenario.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 font-numeric text-xs text-accent",
									children: [
										formatNumber(scenario.customers),
										" customers ·",
										" ",
										formatDollars(scenario.goal),
										" goal"
									]
								})
							]
						}, scenario.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-ocid": "simulator.section.cta",
				className: "mt-14 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-subtle p-8 shadow-glow md:p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-bold tracking-tight md:text-3xl",
							children: "Turn the model into a real workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base leading-relaxed text-muted-foreground",
							children: "Launch a business DAO to structure your ownership pool, or try the Round Up to Own demo to see how customers become owners."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full flex-col gap-3 sm:w-auto sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							"data-ocid": "simulator.cta.launch_button",
							className: "h-11 rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/launch",
								children: ["Launch your business DAO", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"aria-hidden": "true",
									className: "size-4"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							"data-ocid": "simulator.cta.demo_button",
							className: "h-11 rounded-full border-border px-6 font-semibold transition-smooth hover:-translate-y-0.5 hover:border-primary/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/demo",
								children: "Try the Round Up demo"
							})
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { SimulatorPage as default };

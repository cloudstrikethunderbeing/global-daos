import { c as useComposedRefs$1, d as require_react, g as __toESM, n as Button, r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { c as composeEventHandlers, i as useControllableState, s as createContextScope, t as Primitive } from "./dist-D8c95m3S.js";
import { t as ArrowLeft } from "./arrow-left-TP66jKGS.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Check } from "./check-B_X7dERu.js";
import { t as CircleDollarSign } from "./circle-dollar-sign-B6pnsrqH.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as LoaderCircle } from "./loader-circle-Cq00dUZM.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { At as useSize, Bt as useInternetIdentity, V as useRecordDaoDeployment, dt as Link, gt as ShieldCheck, y as useCreateBusiness, z as useRecordBusinessRegistration, zt as SignInButton } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { t as Label } from "./label-BRHHlJK-.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { c as slugify, n as formatCurrency, t as formatBps } from "./format-9V_VuN1H.js";
import { t as Textarea } from "./textarea-ChU4ZABm.js";
import { a as PresenceContext, c as LayoutGroupContext, i as isHTMLElement, n as usePresence, o as useIsomorphicLayoutEffect, r as MotionConfigContext, s as useConstant, t as motion } from "./proxy-3lbWeVuX.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
import { t as usePrevious } from "./dist-DgJK4kho.js";
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/framer-motion@12.38.0_react-dom@19.1.5_react@19.1.5__react@19.1.5/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
*/
/**
* Set a given ref to a given value
* This utility takes care of different types of refs: callback refs and RefObject(s)
*/
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
/**
* A utility to compose multiple refs together
* Accepts callback refs and RefObject(s)
*/
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
/**
* A custom hook that composes multiple refs
* Accepts callback refs and RefObject(s)
*/
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/framer-motion@12.38.0_react-dom@19.1.5_react@19.1.5__react@19.1.5/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var import_jsx_runtime = require_jsx_runtime();
/**
* Measurement functionality has to be within a separate component
* to leverage snapshot lifecycle.
*/
var PopChildMeasure = class extends import_react.Component {
	getSnapshotBeforeUpdate(prevProps) {
		const element = this.props.childRef.current;
		if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
			const parent = element.offsetParent;
			const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
			const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
			const computedStyle = getComputedStyle(element);
			const size = this.props.sizeRef.current;
			size.height = parseFloat(computedStyle.height);
			size.width = parseFloat(computedStyle.width);
			size.top = element.offsetTop;
			size.left = element.offsetLeft;
			size.right = parentWidth - size.width - size.left;
			size.bottom = parentHeight - size.height - size.top;
		}
		return null;
	}
	/**
	* Required with getSnapshotBeforeUpdate to stop React complaining.
	*/
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
	const id = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const size = (0, import_react.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	});
	const { nonce } = (0, import_react.useContext)(MotionConfigContext);
	const composedRef = useComposedRefs(ref, children.props?.ref ?? children?.ref);
	/**
	* We create and inject a style block so we can apply this explicit
	* sizing in a non-destructive manner by just deleting the style block.
	*
	* We can't apply size via render as the measurement happens
	* in getSnapshotBeforeUpdate (post-render), likewise if we apply the
	* styles directly on the DOM node, we might be overwriting
	* styles set via the style prop.
	*/
	(0, import_react.useInsertionEffect)(() => {
		const { width, height, top, left, right, bottom } = size.current;
		if (isPresent || pop === false || !ref.current || !width || !height) return;
		const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
		const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
		ref.current.dataset.motionPopId = id;
		const style = document.createElement("style");
		if (nonce) style.nonce = nonce;
		const parent = root ?? document.head;
		parent.appendChild(style);
		if (style.sheet) style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
		return () => {
			ref.current?.removeAttribute("data-motion-pop-id");
			if (parent.contains(style)) parent.removeChild(style);
		};
	}, [isPresent]);
	return (0, import_jsx_runtime.jsx)(PopChildMeasure, {
		isPresent,
		childRef: ref,
		sizeRef: size,
		pop,
		children: pop === false ? children : import_react.cloneElement(children, { ref: composedRef })
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/framer-motion@12.38.0_react-dom@19.1.5_react@19.1.5__react@19.1.5/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
	const presenceChildren = useConstant(newChildrenMap);
	const id = (0, import_react.useId)();
	let isReusedContext = true;
	let context = (0, import_react.useMemo)(() => {
		isReusedContext = false;
		return {
			id,
			initial,
			isPresent,
			custom,
			onExitComplete: (childId) => {
				presenceChildren.set(childId, true);
				for (const isComplete of presenceChildren.values()) if (!isComplete) return;
				onExitComplete && onExitComplete();
			},
			register: (childId) => {
				presenceChildren.set(childId, false);
				return () => presenceChildren.delete(childId);
			}
		};
	}, [
		isPresent,
		presenceChildren,
		onExitComplete
	]);
	/**
	* If the presence of a child affects the layout of the components around it,
	* we want to make a new context value to ensure they get re-rendered
	* so they can detect that layout change.
	*/
	if (presenceAffectsLayout && isReusedContext) context = { ...context };
	(0, import_react.useMemo)(() => {
		presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
	}, [isPresent]);
	/**
	* If there's no `motion` components to fire exit animations, we want to remove this
	* component immediately.
	*/
	import_react.useEffect(() => {
		!isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
	}, [isPresent]);
	children = (0, import_jsx_runtime.jsx)(PopChild, {
		pop: mode === "popLayout",
		isPresent,
		anchorX,
		anchorY,
		root,
		children
	});
	return (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: context,
		children
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/framer-motion@12.38.0_react-dom@19.1.5_react@19.1.5__react@19.1.5/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
var getChildKey = (child) => child.key || "";
function onlyElements(children) {
	const filtered = [];
	import_react.Children.forEach(children, (child) => {
		if ((0, import_react.isValidElement)(child)) filtered.push(child);
	});
	return filtered;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/framer-motion@12.38.0_react-dom@19.1.5_react@19.1.5__react@19.1.5/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
/**
* `AnimatePresence` enables the animation of components that have been removed from the tree.
*
* When adding/removing more than a single child, every child **must** be given a unique `key` prop.
*
* Any `motion` components that have an `exit` property defined will animate out when removed from
* the tree.
*
* ```jsx
* import { motion, AnimatePresence } from 'framer-motion'
*
* export const Items = ({ items }) => (
*   <AnimatePresence>
*     {items.map(item => (
*       <motion.div
*         key={item.id}
*         initial={{ opacity: 0 }}
*         animate={{ opacity: 1 }}
*         exit={{ opacity: 0 }}
*       />
*     ))}
*   </AnimatePresence>
* )
* ```
*
* You can sequence exit animations throughout a tree using variants.
*
* If a child contains multiple `motion` components with `exit` props, it will only unmount the child
* once all `motion` components have finished animating out. Likewise, any components using
* `usePresence` all need to call `safeToRemove`.
*
* @public
*/
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
	const [isParentPresent, safeToRemove] = usePresence(propagate);
	/**
	* Filter any children that aren't ReactElements. We can only track components
	* between renders with a props.key.
	*/
	const presentChildren = (0, import_react.useMemo)(() => onlyElements(children), [children]);
	/**
	* Track the keys of the currently rendered children. This is used to
	* determine which children are exiting.
	*/
	const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
	/**
	* If `initial={false}` we only want to pass this to components in the first render.
	*/
	const isInitialRender = (0, import_react.useRef)(true);
	/**
	* A ref containing the currently present children. When all exit animations
	* are complete, we use this to re-render the component with the latest children
	* *committed* rather than the latest children *rendered*.
	*/
	const pendingPresentChildren = (0, import_react.useRef)(presentChildren);
	/**
	* Track which exiting children have finished animating out.
	*/
	const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
	/**
	* Track which components are currently processing exit to prevent duplicate processing.
	*/
	const exitingComponents = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	/**
	* Save children to render as React state. To ensure this component is concurrent-safe,
	* we check for exiting children via an effect.
	*/
	const [diffedChildren, setDiffedChildren] = (0, import_react.useState)(presentChildren);
	const [renderedChildren, setRenderedChildren] = (0, import_react.useState)(presentChildren);
	useIsomorphicLayoutEffect(() => {
		isInitialRender.current = false;
		pendingPresentChildren.current = presentChildren;
		/**
		* Update complete status of exiting children.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const key = getChildKey(renderedChildren[i]);
			if (!presentKeys.includes(key)) {
				if (exitComplete.get(key) !== true) exitComplete.set(key, false);
			} else {
				exitComplete.delete(key);
				exitingComponents.current.delete(key);
			}
		}
	}, [
		renderedChildren,
		presentKeys.length,
		presentKeys.join("-")
	]);
	const exitingChildren = [];
	if (presentChildren !== diffedChildren) {
		let nextChildren = [...presentChildren];
		/**
		* Loop through all the currently rendered components and decide which
		* are exiting.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const child = renderedChildren[i];
			const key = getChildKey(child);
			if (!presentKeys.includes(key)) {
				nextChildren.splice(i, 0, child);
				exitingChildren.push(child);
			}
		}
		/**
		* If we're in "wait" mode, and we have exiting children, we want to
		* only render these until they've all exited.
		*/
		if (mode === "wait" && exitingChildren.length) nextChildren = exitingChildren;
		setRenderedChildren(onlyElements(nextChildren));
		setDiffedChildren(presentChildren);
		/**
		* Early return to ensure once we've set state with the latest diffed
		* children, we can immediately re-render.
		*/
		return null;
	}
	/**
	* If we've been provided a forceRender function by the LayoutGroupContext,
	* we can use it to force a re-render amongst all surrounding components once
	* all components have finished animating out.
	*/
	const { forceRender } = (0, import_react.useContext)(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderedChildren.map((child) => {
		const key = getChildKey(child);
		const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
		const onExit = () => {
			if (exitingComponents.current.has(key)) return;
			if (exitComplete.has(key)) {
				exitingComponents.current.add(key);
				exitComplete.set(key, true);
			} else return;
			let isEveryExitComplete = true;
			exitComplete.forEach((isExitComplete) => {
				if (!isExitComplete) isEveryExitComplete = false;
			});
			if (isEveryExitComplete) {
				forceRender?.();
				setRenderedChildren(pendingPresentChildren.current);
				propagate && safeToRemove?.();
				onExitComplete && onExitComplete();
			}
		};
		return (0, import_jsx_runtime.jsx)(PresenceChild, {
			isPresent,
			initial: !isInitialRender.current || initial ? void 0 : false,
			custom,
			presenceAffectsLayout,
			mode,
			root,
			onExitComplete: isPresent ? void 0 : onExit,
			anchorX,
			anchorY,
			children: child
		}, key);
	}) });
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.1.11_@types+react@19.1.17__@types+reac_d28b9ab4436ff6508f78f61d6091c188/node_modules/@radix-ui/react-switch/dist/index.mjs
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs$1(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs$1(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "switch",
		className: cn("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			"data-slot": "switch-thumb",
			className: cn("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
		})
	});
}
//#endregion
//#region src/pages/LaunchPage.tsx
var CATEGORIES = [
	"Coffee & Cafés",
	"Bakery & Food",
	"Retail & Goods",
	"Fitness & Wellness",
	"Creative Studio",
	"Home Services",
	"Hospitality",
	"Other"
];
var STEPS = [
	{
		id: "identity",
		label: "Business",
		icon: Sparkles
	},
	{
		id: "capital",
		label: "Capital",
		icon: CircleDollarSign
	},
	{
		id: "ownership",
		label: "Ownership",
		icon: Users
	},
	{
		id: "review",
		label: "Deploy",
		icon: Rocket
	}
];
var INITIAL_DRAFT = {
	name: "",
	category: CATEGORIES[0],
	description: "",
	city: "",
	goalDollars: "25000",
	poolPercent: "20",
	roundUpPercent: "5",
	loyaltyRewards: false,
	matchingContributions: false,
	profitParticipation: false
};
function toCents(dollars) {
	const value = Number.parseFloat(dollars);
	if (!Number.isFinite(value) || value < 0) return 0n;
	return BigInt(Math.round(value * 100));
}
function toBps(percent) {
	const value = Number.parseFloat(percent);
	if (!Number.isFinite(value) || value < 0) return 0n;
	return BigInt(Math.round(value * 100));
}
function buildInput(draft) {
	const goal = toCents(draft.goalDollars);
	const pool = toBps(draft.poolPercent);
	const name = draft.name.trim();
	return {
		name,
		slug: slugify(name) || `dao-${Date.now().toString(36)}`,
		description: draft.description.trim(),
		industry: draft.category,
		city: draft.city.trim() || "Remote",
		country: "United States",
		isFictional: true,
		constitution: "Consumer-funded ownership. Round-ups are the default contribution model; business-funded incentives remain optional and off unless enabled by the founder.",
		consumerOwnershipPool: pool,
		totalOwnershipSupply: 10000n,
		maxFundraisingTarget: goal,
		minContribution: 100n,
		maxContribution: goal,
		ownershipRights: {
			transferable: false,
			votingEnabled: true,
			profitShareEnabled: draft.profitParticipation,
			rightsSummary: "One member, one vote on governance proposals. Ownership units vest over time and are non-transferable."
		},
		vesting: {
			transferRestricted: true,
			cliffMonths: 6n,
			vestingMonths: 48n,
			restrictionsSummary: "48-month vesting with a 6-month cliff. Units are non-transferable while vesting."
		},
		valuation: {
			preMoneyValuation: goal,
			annualRevenue: goal / 2n,
			revenueMultiple: 2,
			notes: "Founder-provided simulated valuation assumptions."
		},
		participation: {
			maxContribution: goal,
			minContribution: 100n,
			incentives: {
				loyaltyRewards: draft.loyaltyRewards,
				matchingContributions: draft.matchingContributions,
				businessFundedOwnership: false,
				promotionalAllocations: false,
				profitParticipation: draft.profitParticipation
			},
			contributionOptions: {
				roundToNearestDollar: true,
				roundToNearestFive: true,
				roundToNearestTen: false,
				customAllowed: true,
				optOutAllowed: true
			}
		},
		foundingAuthorities: [{
			name: "Founder",
			role: "Founder & Steward",
			contact: "founder@example.com"
		}],
		logo: void 0
	};
}
function LaunchPage() {
	const reduce = useReducedMotion();
	const { identity } = useInternetIdentity();
	const authenticated = !!identity && !identity.getPrincipal().isAnonymous();
	const [step, setStep] = (0, import_react.useState)("identity");
	const [draft, setDraft] = (0, import_react.useState)(INITIAL_DRAFT);
	const [error, setError] = (0, import_react.useState)(null);
	const [deployed, setDeployed] = (0, import_react.useState)(null);
	const createBusiness = useCreateBusiness();
	const recordRegistration = useRecordBusinessRegistration();
	const recordDeployment = useRecordDaoDeployment();
	const stepIndex = STEPS.findIndex((s) => s.id === step);
	const roundUpBps = toBps(draft.roundUpPercent);
	const poolBps = toBps(draft.poolPercent);
	const goalCents = toCents(draft.goalDollars);
	const canAdvance = (0, import_react.useMemo)(() => {
		if (step === "identity") return draft.name.trim().length >= 2 && draft.description.trim().length >= 10;
		if (step === "capital") return goalCents > 0n;
		if (step === "ownership") return poolBps > 0n && poolBps <= 10000n && roundUpBps > 0n && roundUpBps <= 10000n;
		return true;
	}, [
		step,
		draft.name,
		draft.description,
		goalCents,
		poolBps,
		roundUpBps
	]);
	function update(key, value) {
		setDraft((prev) => ({
			...prev,
			[key]: value
		}));
		setError(null);
	}
	function goNext() {
		if (!canAdvance) return;
		const next = STEPS[stepIndex + 1];
		if (next) setStep(next.id);
	}
	function goBack() {
		const prev = STEPS[stepIndex - 1];
		if (prev) setStep(prev.id);
	}
	function deploy() {
		setError(null);
		const input = buildInput(draft);
		createBusiness.mutate(input, {
			onSuccess: (business) => {
				setDeployed(business);
				recordRegistration.mutate();
				recordDeployment.mutate();
			},
			onError: (err) => {
				if (err && typeof err === "object" && "__kind__" in err) setError(describeBackendError(err));
				else setError(errorMessage(err));
			}
		});
	}
	if (deployed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
		business: deployed,
		roundUpBps,
		reduce: !!reduce
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -left-24 top-0 size-72 bg-primary/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -right-16 top-40 size-64 bg-accent/30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Business DAO launcher",
						title: "Launch your business DAO",
						description: "Four quick steps. Sign in only when you deploy — the wizard is yours to explore first."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { current: stepIndex }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-8 lg:grid-cols-[1fr_320px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								initial: false,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: reduce ? false : {
										opacity: 0,
										y: 12
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: reduce ? void 0 : {
										opacity: 0,
										y: -8
									},
									transition: {
										duration: .35,
										ease: [
											.16,
											1,
											.3,
											1
										]
									},
									children: [
										step === "identity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityStep, {
											draft,
											update
										}),
										step === "capital" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapitalStep, {
											draft,
											update
										}),
										step === "ownership" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnershipStep, {
											draft,
											update
										}),
										step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewStep, {
											draft,
											authenticated,
											pending: createBusiness.isPending,
											error,
											onDeploy: deploy
										})
									]
								}, step)
							}), step !== "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									"data-ocid": "launch.back_button",
									onClick: goBack,
									disabled: stepIndex === 0,
									className: "rounded-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									"data-ocid": "launch.next_button",
									onClick: goNext,
									disabled: !canAdvance,
									className: "rounded-full bg-primary px-6 text-primary-foreground",
									children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
							draft,
							goalCents,
							poolBps,
							roundUpBps
						})]
					})
				]
			})
		]
	});
}
function Stepper({ current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		"data-ocid": "launch.stepper",
		className: "mt-8 flex items-center gap-2 overflow-x-auto pb-1",
		children: STEPS.map((s, i) => {
			const done = i < current;
			const active = i === current;
			const Icon = s.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors", active && "border-primary/60 bg-primary/10 text-primary", done && "border-primary/30 bg-primary/5 text-primary/80", !active && !done && "border-border text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-5 items-center justify-center rounded-full text-[10px]", active && "bg-primary text-primary-foreground", done && "bg-primary/20 text-primary", !active && !done && "bg-muted text-muted-foreground"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap",
						children: s.label
					})]
				}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: cn("hidden h-px flex-1 sm:block", done ? "bg-primary/40" : "bg-border")
				})]
			}, s.id);
		})
	});
}
function Field({ label, hint, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor,
				className: "text-sm font-medium",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function IdentityStep({ draft, update }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTitle, {
				title: "Name your business",
				subtitle: "This is what members see in the directory and on your profile."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Business name",
				htmlFor: "biz-name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "biz-name",
					"data-ocid": "launch.name_input",
					value: draft.name,
					onChange: (e) => update("name", e.target.value),
					placeholder: "Fern & Forge Coffee",
					autoComplete: "organization"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Category",
					htmlFor: "biz-category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "biz-category",
						"data-ocid": "launch.category_select",
						value: draft.category,
						onChange: (e) => update("category", e.target.value),
						className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "City",
					htmlFor: "biz-city",
					hint: "Optional — defaults to Remote.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "biz-city",
						"data-ocid": "launch.city_input",
						value: draft.city,
						onChange: (e) => update("city", e.target.value),
						placeholder: "Portland"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				htmlFor: "biz-desc",
				hint: "At least 10 characters. Tell members what they're backing.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "biz-desc",
					"data-ocid": "launch.description_textarea",
					value: draft.description,
					onChange: (e) => update("description", e.target.value),
					placeholder: "A neighborhood roastery turning daily round-ups into shared ownership.",
					rows: 4
				})
			})
		]
	});
}
function CapitalStep({ draft, update }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTitle, {
				title: "Set your funding goal",
				subtitle: "The maximum simulated capital your DAO will raise from consumer round-ups."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Funding goal (USD)",
				htmlFor: "biz-goal",
				hint: "Backend enforces this as the fundraising ceiling.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
						children: "$"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "biz-goal",
						"data-ocid": "launch.goal_input",
						type: "number",
						min: 100,
						step: 500,
						value: draft.goalDollars,
						onChange: (e) => update("goalDollars", e.target.value),
						className: "pl-7 font-numeric"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					"10000",
					"25000",
					"100000"
				].map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": `launch.goal_preset.${preset}`,
					onClick: () => update("goalDollars", preset),
					className: cn("rounded-full font-numeric", draft.goalDollars === preset && "border-primary text-primary"),
					children: ["$", Number(preset).toLocaleString()]
				}, preset))
			})
		]
	});
}
function OwnershipStep({ draft, update }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTitle, {
				title: "Ownership & round-ups",
				subtitle: "Consumer-funded round-ups are the default model. Incentives stay off unless you opt in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ownership pool (%)",
					htmlFor: "biz-pool",
					hint: "Share of the DAO reserved for consumer owners.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "biz-pool",
						"data-ocid": "launch.pool_input",
						type: "number",
						min: 1,
						max: 100,
						step: 1,
						value: draft.poolPercent,
						onChange: (e) => update("poolPercent", e.target.value),
						className: "font-numeric"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Round-up rate (%)",
					htmlFor: "biz-roundup",
					hint: "Portion of each purchase rounded up into ownership.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "biz-roundup",
						"data-ocid": "launch.roundup_input",
						type: "number",
						min: 1,
						max: 100,
						step: 1,
						value: draft.roundUpPercent,
						onChange: (e) => update("roundUpPercent", e.target.value),
						className: "font-numeric"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-border bg-muted/30 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Optional incentives — off by default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "loyalty",
						label: "Loyalty rewards",
						description: "Business-funded perks for repeat owners.",
						checked: draft.loyaltyRewards,
						onChange: (v) => update("loyaltyRewards", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "matching",
						label: "Matching contributions",
						description: "Business matches a portion of consumer round-ups.",
						checked: draft.matchingContributions,
						onChange: (v) => update("matchingContributions", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "profit",
						label: "Profit participation",
						description: "Owners share in simulated profit distributions.",
						checked: draft.profitParticipation,
						onChange: (v) => update("profitParticipation", v)
					})
				]
			})
		]
	});
}
function ToggleRow({ id, label, description, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: `toggle-${id}`,
				className: "text-sm font-medium",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			id: `toggle-${id}`,
			"data-ocid": `launch.toggle.${id}`,
			checked,
			onCheckedChange: onChange
		})]
	});
}
function ReviewStep({ draft, authenticated, pending, error, onDeploy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTitle, {
				title: "Review & deploy",
				subtitle: "Confirm the details, then deploy your persistent business DAO."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "divide-y divide-border rounded-xl border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Business",
						value: draft.name.trim() || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Category",
						value: draft.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Funding goal",
						value: formatCurrency(toCents(draft.goalDollars))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Ownership pool",
						value: formatBps(toBps(draft.poolPercent))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Round-up rate",
						value: formatBps(toBps(draft.roundUpPercent))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
						label: "Incentives",
						value: [
							draft.loyaltyRewards && "Loyalty",
							draft.matchingContributions && "Matching",
							draft.profitParticipation && "Profit share"
						].filter(Boolean).join(", ") || "None (default)"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "alert",
				"data-ocid": "launch.error_state",
				className: "rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
				children: error
			}),
			authenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				"data-ocid": "launch.deploy_button",
				onClick: onDeploy,
				disabled: pending,
				className: "w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground shadow-glow",
				children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }), "Deploying your DAO…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-5" }), "Deploy business DAO"] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/30 bg-primary/5 p-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted-foreground",
					children: "Sign in with Internet Identity to deploy a persistent business DAO."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "All activity is simulated. No real money moves."]
			})
		]
	});
}
function ReviewRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "min-w-0 truncate text-right text-sm font-medium",
			children: value
		})]
	});
}
function StepTitle({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xl font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-muted-foreground",
		children: subtitle
	})] });
}
function PreviewCard({ draft, goalCents, poolBps, roundUpBps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "h-fit rounded-2xl border border-border bg-gradient-subtle p-5 lg:sticky lg:top-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Live preview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 truncate font-display text-lg font-semibold",
				children: draft.name.trim() || "Your business DAO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
				children: draft.description.trim() || "Your description appears here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewStat, {
						label: "Funding goal",
						value: formatCurrency(goalCents),
						accent: "text-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewStat, {
						label: "Ownership pool",
						value: formatBps(poolBps),
						accent: "text-violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewStat, {
						label: "Round-up rate",
						value: formatBps(roundUpBps),
						accent: "text-primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-gold",
						children: "Consumer-funded by default."
					}),
					" ",
					"Incentives are optional."
				]
			})
		]
	});
}
function PreviewStat({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-numeric text-sm font-semibold", accent),
			children: value
		})]
	});
}
function Reveal({ business, roundUpBps, reduce }) {
	const stats = [
		{
			label: "Funding goal",
			value: formatCurrency(business.maxFundraisingTarget),
			accent: "text-accent"
		},
		{
			label: "Ownership pool",
			value: formatBps(business.consumerOwnershipPool),
			accent: "text-violet"
		},
		{
			label: "Round-up rate",
			value: formatBps(roundUpBps),
			accent: "text-primary"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "ambient-orb left-1/2 top-10 size-80 -translate-x-1/2 bg-primary/40"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: reduce ? false : {
				opacity: 0,
				scale: .96
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			transition: {
				duration: .6,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			className: "relative rounded-3xl border border-primary/30 bg-card/90 p-8 text-center shadow-glow backdrop-blur sm:p-12",
			"data-ocid": "launch.success_state",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: reduce ? false : {
						scale: 0,
						rotate: -20
					},
					animate: {
						scale: 1,
						rotate: 0
					},
					transition: {
						delay: .15,
						type: "spring",
						stiffness: 200,
						damping: 14
					},
					className: "mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-primary",
					children: "DAO deployed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-3xl font-bold sm:text-4xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-spectrum",
						children: business.name
					}), " is live"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-muted-foreground",
					children: "Your business DAO is deployed. Members can now round up purchases into shared ownership. Your founding business registration and completed deployment Founding Credits have been added to your workspace."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3 sm:grid-cols-3",
					children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduce ? false : {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .3 + i * .1,
							duration: .4
						},
						className: "rounded-xl border border-border bg-background/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-1 font-numeric text-lg font-bold", s.accent),
							children: s.value
						})]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full bg-primary px-6 text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/$businessId",
							params: { businessId: business.id.toString() },
							"data-ocid": "launch.admin_link",
							children: ["Open admin workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/business/$slug",
							params: { slug: business.slug },
							"data-ocid": "launch.profile_link",
							children: "View public profile"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/directory",
						search: (prev) => prev,
						"data-ocid": "launch.directory_link",
						className: "text-primary underline-offset-4 hover:underline",
						children: "Browse the directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/founding",
						"data-ocid": "launch.founding_link",
						className: "inline-flex items-center gap-1 text-gold underline-offset-4 hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Join the Founding Business Program"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { LaunchPage as default };

import type {
  Rectangle,
  HasLayoutTrait,
  StrokeWeights,
  HasFramePropertiesTrait,
} from "@figma/rest-api-spec";
import { isTruthy } from "remeda";
import { CSSHexColor } from "~/services/simplify-node-response";
import { CSSRGBAColor } from "~/services/simplify-node-response";

export { isTruthy };

export function hasValue<K extends PropertyKey, T>(
  key: K,
  obj: unknown,
  typeGuard?: (val: unknown) => val is T,
): obj is Record<K, T> {
  const isObject = typeof obj === "object" && obj !== null;
  if (!isObject || !(key in obj)) return false;
  const val = (obj as Record<K, unknown>)[key];
  return typeGuard ? typeGuard(val) : val !== undefined;
}

export function isFrame(val: unknown): val is HasFramePropertiesTrait {
  return (
    typeof val === "object" &&
    !!val &&
    "clipsContent" in val &&
    typeof val.clipsContent === "boolean"
  );
}

export function isLayout(val: unknown): val is HasLayoutTrait {
  return (
    typeof val === "object" &&
    !!val &&
    "absoluteBoundingBox" in val &&
    typeof val.absoluteBoundingBox === "object" &&
    !!val.absoluteBoundingBox &&
    "x" in val.absoluteBoundingBox &&
    "y" in val.absoluteBoundingBox &&
    "width" in val.absoluteBoundingBox &&
    "height" in val.absoluteBoundingBox
  );
}

export function isStrokeWeights(val: unknown): val is StrokeWeights {
  return (
    typeof val === "object" &&
    val !== null &&
    "top" in val &&
    "right" in val &&
    "bottom" in val &&
    "left" in val
  );
}

export function isRectangle<T, K extends string>(
  key: K,
  obj: T,
): obj is T & { [P in K]: Rectangle } {
  const recordObj = obj as Record<K, unknown>;
  return (
    typeof obj === "object" &&
    !!obj &&
    key in recordObj &&
    typeof recordObj[key] === "object" &&
    !!recordObj[key] &&
    "x" in recordObj[key] &&
    "y" in recordObj[key] &&
    "width" in recordObj[key] &&
    "height" in recordObj[key]
  );
}

export function isRectangleCornerRadii(val: unknown): val is number[] {
  return Array.isArray(val) && val.length === 4 && val.every((v) => typeof v === "number");
}

export function isCSSColorValue(val: unknown): val is CSSRGBAColor | CSSHexColor {
  return typeof val === "string" && (val.startsWith("#") || val.startsWith("rgba"));
}

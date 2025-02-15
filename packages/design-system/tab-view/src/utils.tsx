import { Platform } from "react-native";

import Animated, {
  runOnJS,
  scrollTo,
  withTiming,
} from "react-native-reanimated";

export function mScrollTo(ref: any, x: number, y: number, animated: boolean) {
  "worklet";
  if (!ref) return;
  scrollTo(ref, x, y, animated);
}

export const isIOS = Platform.OS === "ios";

export const animateToRefresh = ({
  transRefreshing,
  isRefreshing,
  isRefreshingWithAnimation,
  isToRefresh,
  destPoi,
  onStartRefresh,
}: {
  transRefreshing: Animated.SharedValue<number>;
  isRefreshing: Animated.SharedValue<boolean>;
  isRefreshingWithAnimation: Animated.SharedValue<boolean>;
  isToRefresh: boolean;
  destPoi: number;
  onStartRefresh?: () => void;
}) => {
  "worklet";

  if (isToRefresh === true && isRefreshing.value === true) return;
  if (
    isToRefresh === false &&
    isRefreshing.value === false &&
    transRefreshing.value === destPoi
  )
    return;
  isRefreshing.value = isToRefresh;
  if (isToRefresh && onStartRefresh) {
    runOnJS(onStartRefresh)();
  }

  if (transRefreshing.value === destPoi) {
    isRefreshingWithAnimation.value = isToRefresh;
    return;
  }
  transRefreshing.value = withTiming(destPoi, undefined, () => {
    isRefreshingWithAnimation.value = isToRefresh;
  });
};

/**
 *  @summary Clamps a node with a lower and upper bound.
 *  @example
    clamp(-1, 0, 100); // 0
    clamp(1, 0, 100); // 1
    clamp(101, 0, 100); // 100
  * @worklet
  */
export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

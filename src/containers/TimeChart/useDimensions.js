import {
  useState, useReducer, useEffect, useCallback, useMemo,
} from 'react';
import { Dimensions } from 'react-native';

// Height is computed as a percentage of the width
const HEIGHT_FACTOR_PORTRAIT = 60;
const HEIGHT_FACTOR_LANDSCAPE = 80;

const DEFAULT_MARGIN = {
  left: 50, top: 20, right: 50, bottom: 45,
};

const getFactorByOrientation = () => {
  const { height, width } = Dimensions.get('window');
  return (height > width) ? HEIGHT_FACTOR_PORTRAIT : HEIGHT_FACTOR_LANDSCAPE;
};

export const useHeightPercentage = () => {
  const [heightFactor, setFactor] = useState(getFactorByOrientation());

  useEffect(() => {
    const updateFactor = () => setFactor(getFactorByOrientation());
    Dimensions.addEventListener('change', updateFactor);
    return () => Dimensions.removeEventListener('change', updateFactor);
  }, []);

  return `${heightFactor}%`;
};

const getDefaultDimensions = () => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
  const isPortrait = screenHeight > screenWidth;
  const heightFactor = isPortrait ? HEIGHT_FACTOR_PORTRAIT : HEIGHT_FACTOR_LANDSCAPE;

  return {
    width: screenWidth,
    height: Math.floor((screenWidth * heightFactor) / 100),
  };
};

const getReducerForMargin = (defaultValue) => (state, action) => {
  switch (action.type) {
    case 'reset':
      return defaultValue;
    case 'update':
      return action.value;
      // if (action.value > state) return action.value;
      // break;
    default:
      break;
  }
  return state;
};

// eslint-disable-next-line no-unused-vars
const useChartDimensionsDeprecated = (data) => {
  // DEPRECATED:
  // there are circular dependencies in the margins + onLayout methods
  const [svgDimensions, setDimensions] = useState(null);

  const [marginLeft, changeMarginLeft] = useReducer(
    getReducerForMargin(null),
    null,
  );

  const [marginTop, changeMarginTop] = useReducer(
    getReducerForMargin(null),
    null,
  );

  const [marginRight, changeMarginRight] = useReducer(
    getReducerForMargin(null),
    null,
  );

  const [marginBottom, changeMarginBottom] = useReducer(
    getReducerForMargin(null),
    null,
  );

  const [hasMeasured, setHasMeasure] = useState(false);
  useEffect(() => {
    const allSet = !!svgDimensions
      && !!marginLeft
      && !!marginTop
      && !!marginRight
      && !!marginBottom;
    setHasMeasure(allSet);
  }, [svgDimensions, marginLeft, marginTop, marginRight, marginBottom]);

  useEffect(() => {
    changeMarginLeft({ type: 'reset' });
    changeMarginBottom({ type: 'reset' });
    changeMarginTop({ type: 'reset' });
    changeMarginRight({ type: 'reset' });
    setHasMeasure(false);
  }, [data]);

  // HACK: all onLayout methods may need a hard-coded padding to work properl
  // otherwise, content is hidden in the borders (not sure why)
  const onLayoutSvg = useCallback((evt) => {
    const { height: h, width: w } = evt.nativeEvent.layout;
    setDimensions({ height: h, width: w });
  }, [setDimensions]);

  const onLayoutLeft = useCallback((evt) => {
    const { width: w, x, y } = evt.nativeEvent.layout;
    if (x !== 0 || y !== 0) {
      changeMarginLeft({ type: 'update', value: w + 18 });
    }
  }, [changeMarginLeft]);

  const onLayoutRight = useCallback((evt) => {
    const { width: w } = evt.nativeEvent.layout;
    changeMarginRight({ type: 'update', value: w });
  }, [changeMarginRight]);

  const onLayoutBottom = useCallback((evt) => {
    const { height: h } = evt.nativeEvent.layout;
    changeMarginBottom({ type: 'update', value: h + 18 });
  }, [changeMarginBottom]);

  const onLayoutTop = useCallback((evt) => {
    const { height: h, x, y } = evt.nativeEvent.layout;
    if (x !== 0 || y !== 0) {
      changeMarginTop({ type: 'update', value: h + 10 });
    }
  }, [changeMarginTop]);

  const dimensions = (hasMeasured && svgDimensions) || getDefaultDimensions();
  const margins = hasMeasured ? {
    top: marginTop || DEFAULT_MARGIN.top,
    left: marginLeft || DEFAULT_MARGIN.left,
    bottom: marginBottom || DEFAULT_MARGIN.bottom,
    right: marginRight || DEFAULT_MARGIN.right,
  } : DEFAULT_MARGIN;

  const chartDimensions = useMemo(() => ({
    height: dimensions.height - margins.top - margins.bottom,
    width: dimensions.width - margins.left - margins.right,
  }), [dimensions, margins]);

  return [
    dimensions,
    margins,
    chartDimensions,
    onLayoutSvg,
    onLayoutBottom,
    onLayoutLeft,
    onLayoutTop,
    onLayoutRight,
  ];
};

export const useChartDimensions = () => {
  const [svgDimensions, setDimensions] = useState(null);

  const onLayoutSvg = useCallback((evt) => {
    const { height: h, width: w } = evt.nativeEvent.layout;
    setDimensions({ height: h, width: w });
  }, [setDimensions]);

  const dimensions = svgDimensions || getDefaultDimensions();
  const margins = DEFAULT_MARGIN;

  const chartDimensions = useMemo(() => ({
    height: dimensions.height - margins.top - margins.bottom,
    width: dimensions.width - margins.left - margins.right,
  }), [dimensions]);

  return [
    dimensions,
    margins,
    chartDimensions,
    onLayoutSvg,
  ];
};

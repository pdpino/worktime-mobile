import { timeColors } from '../../shared/styles';

export const legendDefinition = [
  {
    labelKey: 'dashboardLegend.effective',
    color: timeColors.effective,
  },
  {
    labelKey: 'dashboardLegend.paused',
    color: timeColors.paused,
  },
];

export const colorPalette = legendDefinition.map((def) => def.color);

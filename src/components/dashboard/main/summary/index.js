import asCollapsible from '../../../../shared/UI/common/collapsible';
import SummaryCard from './card';
import FixedSummary from './fixed';
import ExpandedSummary from './expanded';

export default asCollapsible(
  SummaryCard,
  FixedSummary,
  ExpandedSummary,
);

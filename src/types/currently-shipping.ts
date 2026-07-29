/**
 * "Currently shipping" — reserved for in-flight work that isn't a finished case
 * study yet. Kept as its own type rather than reusing `Project` because these
 * entries deliberately have no `impact`: the outcome isn't known while the thing
 * is still being built, and a placeholder number here would be a lie.
 */
export interface CurrentlyShippingItem {
  id: string;
  title: string;
  /** Where it is right now, e.g. "In production", "Rolling out". */
  status: string;
  desc: string;
  tags: string[];
}

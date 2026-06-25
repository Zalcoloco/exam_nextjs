import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { asDate } from "@prismicio/client";

/**
 * Props for `OpportunitiesList`.
 */
export type OpportunitiesListProps =
  SliceComponentProps<Content.OpportunitiesListSlice>;

/**
 * Component for "OpportunitiesList" Slices.
 */
const OpportunitiesList: FC<OpportunitiesListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />

      <span>{slice.primary.opportunityCount}</span>

      <PrismicNextLink field={slice.primary.viewAllLink} />

      {slice.primary.opportunities.map((item) => (
        <div key={item.jobTitle}>
          <PrismicRichText field={item.jobTitle} />
          <span>{asDate(item.postingDate)?.toLocaleDateString()}</span>
          <span>{item.technologies}</span>
          <PrismicRichText field={item.description} />
        </div>
      ))}
    </section>
  );
};

export default OpportunitiesList;

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `OpportunitiesSection`.
 */
export type OpportunitiesSectionProps =
  SliceComponentProps<Content.OpportunitiesSectionSlice>;

/**
 * Component for "OpportunitiesSection" Slices.
 */
const OpportunitiesSection: FC<OpportunitiesSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicNextImage field={slice.primary.heroImage} />
      <PrismicRichText field={slice.primary.sectionTitle} />
      <ul>
        {slice.primary.jobCards.map((card, index) => (
          <li key={index}>
            <h3>{card.jobTitle}</h3>
            <p>{card.jobDate}</p>
            <p>{card.technologies}</p>
            <PrismicRichText field={card.jobDescription} />
          </li>
        ))}
      </ul>
      <PrismicNextLink field={slice.primary.ctaButtonLink}>
        {slice.primary.ctaButtonText}
      </PrismicNextLink>
    </section>
  );
};

export default OpportunitiesSection;

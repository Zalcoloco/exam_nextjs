import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `JobBoard`.
 */
export type JobBoardProps = SliceComponentProps<Content.JobBoardSlice>;

/**
 * Component for "JobBoard" Slices.
 */
const JobBoard: FC<JobBoardProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.title} />

      <div>
        {slice.primary.filter_buttons.map((button) => (
          <PrismicNextLink key={button.text} field={button} />
        ))}
      </div>

      <div>
        {slice.primary.job_cards.map((card, index) => (
          <div key={index}>
            <PrismicRichText field={card.job_title} />
            <p>{card.job_reference}</p>
            <PrismicRichText field={card.technologies} />
            <PrismicRichText field={card.job_description} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobBoard;

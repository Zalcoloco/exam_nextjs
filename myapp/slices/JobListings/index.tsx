import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `JobListings`.
 */
export type JobListingsProps = SliceComponentProps<Content.JobListingsSlice>;

/**
 * Component for "JobListings" Slices.
 */
const JobListings: FC<JobListingsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.offerings_title} />
      <div>
        {slice.primary.offerings_items.map((item, index) => (
          <div key={index}>
            <p>{item.job_title}</p>
            <p>{item.job_id}</p>
            <p>{item.technologies}</p>
            <PrismicRichText field={item.description} />
          </div>
        ))}
      </div>
      <PrismicRichText field={slice.primary.history_title} />
      <div>
        {slice.primary.history_items.map((item, index) => (
          <div key={index}>
            <p>{item.job_id}</p>
            <p>{item.job_title}</p>
            <p>{item.technologies}</p>
            <PrismicRichText field={item.description} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobListings;
